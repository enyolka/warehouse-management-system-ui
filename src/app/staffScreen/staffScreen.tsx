import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserModel } from "../../api/apiModel";
import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from "../../redux/users/action";
import { UserCreateModel } from "../../components/staffTable/types";
import StaffTable from "../../components/staffTable/staffTable";
import StaffForm from "../../components/staffTable/staffForm";

type Props = {};

function StaffScreen({}: Props): React.ReactElement {
  const { userState, userDispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(false);

  const data: UserModel[] = useMemo(() => userState.data, [userState]);
  console.log(data);

  const createRequest = (model: UserCreateModel) => {
    postUser(model)(userDispatch).then(() => getUsers()(userDispatch));
  };

  const updateRequest = (model: UserCreateModel) => {
    putUser(model)(userDispatch).then(() => getUsers()(userDispatch));
  };

  const deleteRequest = (idx: number) => {
    deleteUser(idx)(userDispatch).then(() => getUsers()(userDispatch));
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <h3>Staff</h3>
      </Grid>
      <Grid item>
        <StaffTable
          deleteRequest={deleteRequest}
          updateRequest={updateRequest}
          data={data}
        />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          style={{ marginRight: 10 }}
        >
          Add user
        </Button>

        <StaffForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
        />
      </Grid>
    </Grid>
  );
}

export default StaffScreen;
