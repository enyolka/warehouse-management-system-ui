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
import ClientForm from "./clientForm";
import { ClientFormModel } from "./types";

type Props = {
  data: ClientFormModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: ClientFormModel) => void;
};

const ClientTable = ({ data, deleteRequest, updateRequest }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [idx, setIdx] = useState<number>(0);
  const [updatedCustomer, setUpdatedCustomer] = useState<ClientFormModel>();

  const openDeleteModal = (idx: number) => {
    setOpenDelete(true);
    setIdx(idx);
  };

  const openUpdateModal = (model: ClientFormModel) => {
    setOpenUpdate(true);
    setUpdatedCustomer(model);
  };

  return (
    <TableContainer component={Paper} sx={{ minWidth: 1020, maxWidth: 1200 }}>
      <Table
        sx={{ minWidth: 1020, maxWidth: 1200 }}
        size="medium"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            {columnNames.map(({ field, headerName }) => (
              <TableCell key={field}>{headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((customer: ClientFormModel, id: number) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {customer.name}
              </TableCell>
              <TableCell>{customer.phone ?? "-"}</TableCell>
              <TableCell>{customer.email ?? "-"}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.zipCode}</TableCell>
              <TableCell>{customer.streetName}</TableCell>
              <TableCell>{customer.streetNumber}</TableCell>
              <TableCell>
                <Button onClick={() => openUpdateModal(customer)}>
                  <EditIcon color="action" />
                </Button>
                <Button onClick={() => openDeleteModal(customer.id)}>
                  <DeleteIcon color="action" />
                </Button>

                <DeletionModal
                  open={openDelete}
                  handleClose={() => setOpenDelete(false)}
                  createRequest={deleteRequest}
                  idx={idx}
                />
                <ClientForm
                  open={openUpdate}
                  handleClose={() => setOpenUpdate(false)}
                  createRequest={updateRequest}
                  initialValues={updatedCustomer}
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
  { field: "name", headerName: "Name", width: 120 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "email", headerName: "E-mail", width: 150 },
  { field: "city", headerName: "City", width: 100 },
  { field: "zipCode", headerName: "Zip code", width: 100 },
  { field: "streetName", headerName: "Street Name", width: 120 },
  { field: "streetNumber", headerName: "Street Number", width: 80 },
];

export default ClientTable;
