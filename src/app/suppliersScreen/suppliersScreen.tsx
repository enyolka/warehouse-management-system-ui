import * as React from "react";
import { Button, Grid } from "@mui/material";
import { StoreContext } from "../../redux/store/StoreProvider";
import {
  deleteSupplier,
  postSupplier,
  putSupplier,
} from "../../redux/suppliers/action";
import { useContext, useMemo, useState } from "react";
import { ClientFormModel } from "../../components/clientTable/types";
import ClientForm from "../../components/clientTable/clientForm";
import ClientTable from "../../components/clientTable/clientTable";

function SuppliersScreen(): React.ReactElement {
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
          clientType="supplier"
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
        <ClientForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
          clientType="supplier"
        />
      </Grid>
    </Grid>
  );
}

export default SuppliersScreen;
