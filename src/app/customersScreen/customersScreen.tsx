import * as React from "react";
import { Button, Grid } from "@mui/material";
import { StoreContext } from "../../redux/store/StoreProvider";
import {
  deleteCustomer,
  getCustomers,
  postCustomer,
  putCustomer,
} from "../../redux/customers/action";
import { useContext, useMemo, useState } from "react";
import { ClientFormModel } from "../../components/clientTable/types";
import CustomersForm from "../../components/clientTable/clientForm";
import CustomersTable from "../../components/clientTable/clientTable";

function CustomersScreen(): React.ReactElement {
  const { customersState, customersDispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const disabled = !!(localStorage["admin"] === "false");

  const data: ClientFormModel[] = useMemo(
    () => customersState.data,
    [customersState]
  );

  const createRequest = (model: ClientFormModel) => {
    postCustomer(model)(customersDispatch).then(() =>
      getCustomers()(customersDispatch)
    );
  };

  const updateRequest = (model: ClientFormModel) => {
    putCustomer(model)(customersDispatch).then(() =>
      getCustomers()(customersDispatch)
    );
  };

  const deleteRequest = (idx: number) => {
    deleteCustomer(idx)(customersDispatch).then(() =>
      getCustomers()(customersDispatch)
    );
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
        <h3>Customers</h3>
      </Grid>
      <Grid item>
        <CustomersTable
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
            Add customer
          </Button>
        )}
        {/* <Button variant="contained" to="/dashboard" component={Link}>
          Dashboard
        </Button> */}
        <CustomersForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
        />
      </Grid>
    </Grid>
  );
}

export default CustomersScreen;
