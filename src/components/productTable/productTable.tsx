import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import ProductForm from "./productForm";
import { ProductFormModel } from "./types";
import styles from "./productTable.module.css";
import classNames from "classnames";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

type FilterProps = {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
};

// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }: FilterProps) {
//   const count = preGlobalFilteredRows.length
//   const [value, setValue] = useState(globalFilter)
//   const onChange = useAsyncDebounce(value => {
//     setGlobalFilter(value || undefined)
//   }, 200)

//   return (
//     <span>
//       Search:{' '}
//       <TextField
//         value={value || ""}
//         onChange={e => {
//           setValue(e.target.value);
//           onChange(e.target.value);
//         }}
//         placeholder={`${count} records...`}
//         style={{
//           fontSize: '1.1rem',
//           border: '0',
//         }}
//       />
//     </span>
//   )
// }

// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter },
// }) {
//   const count = preFilteredRows.length

//   return (
//     <input
//       value={filterValue || ''}
//       onChange={e => {
//         setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   )
// }

type Props = {
  data: ProductFormModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: ProductFormModel) => void;
};

const ProductTable = ({ data, deleteRequest, updateRequest }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [sortedColumn, setSortedColum] = useState<string>("");
  const [idx, setIdx] = useState<number>(0);
  const [updatedProduct, setUpdatedProduct] = useState<ProductFormModel>();

  const openDeleteModal = (idx: number) => {
    setOpenDelete(true);
    setIdx(idx);
  };

  const openUpdateModal = (model: ProductFormModel) => {
    setOpenUpdate(true);
    setUpdatedProduct(model);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="medium" aria-label="Client table">
        <TableHead>
          <TableRow>
            {columnNames.map(({ field, headerName, isSorted }) => (
              <TableCell key={field} onClick={() => setSortedColum(headerName)}>
                {headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product: ProductFormModel, id: number) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={classNames({
                [styles.shipped]: product.status === "SHIPPED",
              })}
            >
              <TableCell>{product.template?.name ?? ""}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.supplier?.name ?? ""}</TableCell>
              <TableCell>{product.length ? product.length : "-"}</TableCell>
              <TableCell>{product.width ? product.width : "-"}</TableCell>
              <TableCell>{product.height ? product.height : "-"}</TableCell>
              <TableCell>{product.weight ? product.weight : "-"}</TableCell>
              <TableCell>{product.created_by.username ?? "-"}</TableCell>
              <TableCell>{product.status ?? "-"}</TableCell>
              <TableCell>
                <Button onClick={() => openUpdateModal(product)}>
                  <EditIcon color="action" />
                </Button>
                <Button onClick={() => openDeleteModal(product.id)}>
                  <DeleteIcon color="action" />
                </Button>

                <DeletionModal
                  open={openDelete}
                  handleClose={() => setOpenDelete(false)}
                  createRequest={deleteRequest}
                  idx={idx}
                />
                <ProductForm
                  open={openUpdate}
                  handleClose={() => setOpenUpdate(false)}
                  createRequest={updateRequest}
                  initialValues={updatedProduct}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const columnNames = [
  { field: "template", headerName: "Template", width: 120, isSorted: false },
  { field: "name", headerName: "Name", width: 150, isSorted: false },
  { field: "supplier", headerName: "Supplier", width: 120, isSorted: false },
  { field: "length", headerName: "Length", width: 70, isSorted: false },
  { field: "width", headerName: "Width", width: 70, isSorted: false },
  { field: "height", headerName: "Height", width: 70, isSorted: false },
  { field: "weight", headerName: "Weight", width: 70, isSorted: false },
  {
    field: "created_by",
    headerName: "Accepting person",
    width: 100,
    isSorted: false,
  },
  { field: "status", headerName: "Status", width: 100, isSorted: false },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default ProductTable;
