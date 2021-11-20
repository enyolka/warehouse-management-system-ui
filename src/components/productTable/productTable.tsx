import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import ProductForm from "./productForm";
import { ProductFormModel } from "./types";

type Props = {
  data: ProductFormModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: ProductFormModel) => void;
};

const ProductTable = ({ data, deleteRequest, updateRequest }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
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
            {columnNames.map(({ field, headerName }) => (
              <TableCell key={field}>{headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product: ProductFormModel, id: number) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.template?.name ?? ""}
              </TableCell>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell>{product.supplier?.name ?? ""}</TableCell>
              <TableCell>{product.length ?? "-"}</TableCell>
              <TableCell>{product.width ?? "-"}</TableCell>
              <TableCell>{product.height ?? "-"}</TableCell>
              <TableCell>{product.weight ?? "-"}</TableCell>
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
  { field: "template", headerName: "Template", width: 120 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "supplier", headerName: "Supplier", width: 120 },
  { field: "length", headerName: "Length", width: 80 },
  { field: "width", headerName: "Width", width: 80 },
  { field: "height", headerName: "Height", width: 80 },
  { field: "weight", headerName: "Weight", width: 80 },
];

export default ProductTable;
