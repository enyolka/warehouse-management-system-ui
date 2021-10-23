import * as React from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { getCustomers } from "../../redux/customers/action";
import { useEffect, useMemo, useState } from "react";
import { Paper } from "@material-ui/core";
import { CustomerStore } from "../../redux/customers/store";

// const MuiInputBase = createStyles({
//   styleOverrides: {
//     root: {
//       borderColor: "yellow",
//     },
//   },
// });

type Props = {};

function CustomersPage({}: Props): React.ReactElement {
  const { customersState, customersDispatch } = React.useContext(StoreContext);
  const [customersSet, setCustomersSet] = useState([]);
  const history = useHistory();

  const columnNames = [
    { field: "lastName", headerName: "Last name", width: 120 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "city", headerName: "City", width: 100 },
    { field: "streetName", headerName: "Street Name", width: 120 },
    { field: "streetNumber", headerName: "Street Number", width: 80 },
    { field: "zipCode", headerName: "Zip code", width: 100 },
  ];

  useEffect(() => {
    getCustomers()(customersDispatch);
    setCustomersSet(customersState.data);
  }, [customersState]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing="2"
    >
      <p>Customers</p>
      <Button variant="contained" to="/dashboard" component={Link}>
        Dashboard
      </Button>
      <TableContainer component={Paper} sx={{ minWidth: 720, maxWidth: 1200 }}>
        <Table
          sx={{ minWidth: 720, maxWidth: 1200 }}
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
            {customersSet.map((customer: CustomerStore, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {customer.lastName}
                </TableCell>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>{customer.streetName}</TableCell>
                <TableCell>{customer.streetNumber}</TableCell>
                <TableCell>{customer.zipCode}</TableCell>
                <TableCell>{customer.phone ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CustomersPage;
