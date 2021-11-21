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
import { ProductTemplateModel } from "../../api/apiModel";
import { ProductTemplateFormModel } from "./types";
import ProductForm from "./productTemplateForm";

type Props = {
  data: ProductTemplateFormModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: ProductTemplateFormModel) => void;
};

const ProductTemplateTable = ({
  data,
  deleteRequest,
  updateRequest,
}: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [idx, setIdx] = useState<number>(0);
  const [updatedTemplate, setUpdatedTemplate] =
    useState<ProductTemplateFormModel>();

  const openDeleteModal = (idx: number) => {
    setOpenDelete(true);
    setIdx(idx);
  };

  const openUpdateModal = (model: ProductTemplateFormModel) => {
    setOpenUpdate(true);
    setUpdatedTemplate(model);
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
          {data.map((template: ProductTemplateFormModel, id: number) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.supplier?.name ?? ""}</TableCell>
              <TableCell>{template.length ? template.length : "-"}</TableCell>
              <TableCell>{template.width ? template.width : "-"}</TableCell>
              <TableCell>{template.height ? template.height : "-"}</TableCell>
              <TableCell>{template.weight ? template.weight : "-"}</TableCell>
              <TableCell>
                <Button onClick={() => openUpdateModal(template)}>
                  <EditIcon color="action" />
                </Button>
                <Button onClick={() => openDeleteModal(template.id)}>
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
                  initialValues={updatedTemplate}
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
  { field: "name", headerName: "Name", width: 150 },
  { field: "supplier", headerName: "Supplier", width: 120 },
  { field: "length", headerName: "Length", width: 80 },
  { field: "width", headerName: "Width", width: 80 },
  { field: "height", headerName: "Height", width: 80 },
  { field: "weight", headerName: "Weight", width: 80 },
];

export default ProductTemplateTable;
