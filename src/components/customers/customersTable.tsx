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
import { CustomerStore } from "../../redux/customers/store";
import DeletionModal from "./deletionModal";

type Props = {
  data: CustomerStore[];
  deleteRq: (idx: number) => void;
};

const CustomersTable = ({ deleteRq, data }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deletedIdx, setDeletedIdx] = useState<number>(0);
  const openDeletionModal = (idx: number) => {
    setOpenDelete(true);
    setDeletedIdx(idx);
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
          {data.map((customer: CustomerStore, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {customer.lastName}
              </TableCell>
              <TableCell>{customer.firstName}</TableCell>
              <TableCell>{customer.phone ?? "-"}</TableCell>
              <TableCell>{customer.email ?? "-"}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.zipCode}</TableCell>
              <TableCell>{customer.streetName}</TableCell>
              <TableCell>{customer.streetNumber}</TableCell>
              <TableCell>
                <Button onClick={() => console.log("edit")}>
                  <EditIcon color="action" />
                </Button>
                <Button onClick={() => openDeletionModal(customer.id)}>
                  <DeleteIcon color="action" />
                </Button>

                <DeletionModal
                  open={openDelete}
                  handleClose={() => setOpenDelete(false)}
                  createRequest={deleteRq}
                  idx={deletedIdx}
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
  { field: "lastName", headerName: "Last name", width: 120 },
  { field: "firstName", headerName: "First name", width: 100 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "email", headerName: "E-mail", width: 150 },
  { field: "city", headerName: "City", width: 100 },
  { field: "zipCode", headerName: "Zip code", width: 100 },
  { field: "streetName", headerName: "Street Name", width: 120 },
  { field: "streetNumber", headerName: "Street Number", width: 80 },
];

export default CustomersTable;
