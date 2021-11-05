import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import {
  deleteCustomer,
  getCustomers,
  postCustomer,
} from "../../redux/customers/action";
import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { CustomerStore } from "../../redux/customers/store";
import { CustomerFormModel } from "./types";
import CustomersForm from "./customersForm";
import CustomersTable from "./customersTable";

type Props = {};

function CustomersPage({}: Props): React.ReactElement {
  const { customersState, customersDispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getCustomers()(customersDispatch);
  }, []);

  const data: CustomerStore[] = useMemo(
    () => customersState.data,
    [customersState]
  );

  const createCustomer = (model: CustomerFormModel) => {
    postCustomer(model)(customersDispatch);
    getCustomers()(customersDispatch);
    console.log(customersState.data);
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
        <CustomersTable deleteRq={deleteRequest} data={data} />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ marginRight: 10 }}
        >
          Add customer
        </Button>
        <Button variant="contained" to="/dashboard" component={Link}>
          Dashboard
        </Button>
        <CustomersForm
          open={open}
          handleClose={handleClose}
          createRequest={createCustomer}
        />
      </Grid>
    </Grid>
  );
}

export default CustomersPage;
