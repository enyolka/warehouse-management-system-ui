import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import {
  deleteSupplier,
  getSuppliers,
  postSupplier,
  putSupplier,
} from "../../redux/suppliers/action";
import { useContext, useMemo, useState } from "react";
import { ClientFormModel } from "../../components/clientTable/types";
import ClientForm from "../../components/clientTable/clientForm";
import ClientTable from "../../components/clientTable/clientTable";

type Props = {};

function SuppliersScreen({}: Props): React.ReactElement {
  const { suppliersState, suppliersDispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const disabled = !!(localStorage["admin"] === "false");

  const data: ClientFormModel[] = useMemo(
    () => suppliersState.data,
    [suppliersState]
  );

  const createRequest = (model: ClientFormModel) => {
    postSupplier(model)(suppliersDispatch);
  };

  const updateRequest = (model: ClientFormModel) => {
    putSupplier(model)(suppliersDispatch);
  };

  const deleteRequest = (idx: number) => {
    deleteSupplier(idx)(suppliersDispatch);
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
        <h3>Suppliers</h3>
      </Grid>
      <Grid item>
        <ClientTable
          deleteRequest={deleteRequest}
          updateRequest={updateRequest}
          data={data}
        />
      </Grid>

      <Grid item>
        {!disabled && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            style={{ marginRight: 10 }}
          >
            Add supplier
          </Button>
        )}
        {/* <Button variant="contained" to="/dashboard" component={Link}>
          Dashboard
        </Button> */}
        <ClientForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
        />
      </Grid>
    </Grid>
  );
}

export default SuppliersScreen;
