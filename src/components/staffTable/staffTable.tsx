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
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import ClientForm, { StaffForm } from "./staffForm";
import { UserModel } from "../../api/apiModel";
import { UserCreateModel } from "./types";

type Props = {
  data: UserModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: UserCreateModel) => void;
};

const StaffTable = ({ data, deleteRequest, updateRequest }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [idx, setIdx] = useState<number>(0);
  const [updatedUser, setUpdatedUser] = useState<UserCreateModel>();

  // const openDeleteModal = (idx: number) => {
  //   setOpenDelete(true);
  //   setIdx(idx);
  // };

  // const openUpdateModal = (model: UserCreateModel) => {
  //   setOpenUpdate(true);
  //   setUpdatedUser(model);
  // };

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
          {data.map((user: UserModel, id: number) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell>{user.email ?? "-"}</TableCell>
              <TableCell>
                {user.is_staff ? <AdminPanelSettingsIcon /> : <GroupsIcon />}
                {/* <Button onClick={() => openUpdateModal(user)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => openDeleteModal(user.id)}>
                  <DeleteIcon />
                </Button> */}
                {/* 
                <DeletionModal
                  open={openDelete}
                  handleClose={() => setOpenDelete(false)}
                  createRequest={deleteRequest}
                  idxs={[idx]}
                />
                <StaffForm
                  open={openUpdate}
                  handleClose={() => setOpenUpdate(false)}
                  createRequest={updateRequest}
                  initialValues={updatedUser}
                /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const columnNames = [
  { field: "username", headerName: "Userame", width: 120 },
  { field: "email", headerName: "E-mail", width: 150 },
  { field: "is_staff", headerName: "Staff", width: 80 },
];

export default StaffTable;
