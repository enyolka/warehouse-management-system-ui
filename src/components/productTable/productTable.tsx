import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import ProductForm, { statuses } from "./productForm";
import { ProductFormModel } from "./types";
import styles from "./productTable.module.css";
import { Status } from "../../api/apiModel";

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

  const findStatus = (value: Status | undefined) => {
    return statuses.find((status) => value === status.value) ?? statuses[0];
  };

  const openUpdateModal = (model: ProductFormModel) => {
    setOpenUpdate(true);
    setUpdatedProduct(model);
  };
  const rows: GridRowsProp = data.map(
    (
      {
        template,
        name,
        supplier,
        length,
        width,
        height,
        weight,
        created_by,
        status,
      },
      id
    ) => ({
      id: id,
      template: template.name,
      name: name,
      supplier: supplier.name,
      length: length,
      width: width,
      height: height,
      weight: weight,
      created_by: created_by.username,
    })
  );

  const columnNames = [
    // { field: "template", headerName: "Template", width: 120},
    { field: "name", headerName: "Name", width: 180 },
    { field: "supplier", headerName: "Supplier", width: 160 },
    { field: "length", headerName: "Length", width: 90 },
    { field: "width", headerName: "Width", width: 90 },
    { field: "height", headerName: "Height", width: 90 },
    { field: "weight", headerName: "Weight", width: 90 },
    {
      field: "created_by",
      headerName: "Accepting person",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortComparator: (v1: any, v2: any, param1: any, param2: any) =>
        data[param1.id].status! < data[param2.id].status! ? -1 : 1,
      renderCell: (params: any) => {
        const val = findStatus(data[params.id].status);
        return (
          <Chip
            label={val.label}
            color={
              val?.value === "IN_STOCK"
                ? "success"
                : val?.value === "SHIPPED"
                ? "secondary"
                : "primary"
            }
          />
        );
      },
    },
    {
      field: "edit",
      headerName: "",
      width: 60,
      renderCell: (params: any) => (
        <Button onClick={() => openUpdateModal(data[params.id])}>
          <EditIcon color="action" />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 60,
      renderCell: (params: any) => (
        <Button onClick={() => openDeleteModal(data[params.id].id)}>
          <DeleteIcon color="action" />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 700, maxWidth: 700, minWidth: "67vw" }}>
      <DataGrid rows={rows} columns={columnNames} checkboxSelection />
      <DeletionModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        createRequest={deleteRequest}
        idxs={[idx]}
      />
      <ProductForm
        open={openUpdate}
        handleClose={() => setOpenUpdate(false)}
        createRequest={updateRequest}
        initialValues={updatedProduct}
      />
    </div>
    // <TableContainer component={Paper}>
    //   <Table size="medium" aria-label="Client table">
    //     <TableHead>
    //       <TableRow>
    //         {columnNames.map(({ field, headerName, isSorted }) => (
    //           <TableCell key={field} onClick={() => setSortedColum(headerName)}>
    //             {headerName}
    //           </TableCell>
    //         ))}
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data.map((product: ProductFormModel, id: number) => (
    //         <TableRow
    //           key={id}
    //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //           className={classNames({
    //             [styles.shipped]: product.status === "SHIPPED",
    //           })}
    //         >
    //           {/* <TableCell>{product.template?.name ?? ""}</TableCell> */}
    //           <TableCell>{product.name}</TableCell>
    //           <TableCell>{product.supplier?.name ?? ""}</TableCell>
    //           <TableCell>{product.length ? product.length : "-"}</TableCell>
    //           <TableCell>{product.width ? product.width : "-"}</TableCell>
    //           <TableCell>{product.height ? product.height : "-"}</TableCell>
    //           <TableCell>{product.weight ? product.weight : "-"}</TableCell>
    //           <TableCell>{product.created_by.username ?? "-"}</TableCell>
    //           <TableCell>{product.status ?? "-"}</TableCell>
    //           <TableCell>
    //             <Button onClick={() => openUpdateModal(product)}>
    //               <EditIcon color="action" />
    //             </Button>
    //             <Button onClick={() => openDeleteModal(product.id)}>
    //               <DeleteIcon color="action" />
    //             </Button>

    //             <DeletionModal
    //               open={openDelete}
    //               handleClose={() => setOpenDelete(false)}
    //               createRequest={deleteRequest}
    //               idxs={[idx]}
    //             />
    //             <ProductForm
    //               open={openUpdate}
    //               handleClose={() => setOpenUpdate(false)}
    //               createRequest={updateRequest}
    //               initialValues={updatedProduct}
    //             />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default ProductTable;
