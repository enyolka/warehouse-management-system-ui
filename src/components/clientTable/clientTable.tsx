import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import ClientForm from "./clientForm";
import { ClientFormModel } from "./types";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";
import { CustomPagination } from "../pagination/customPagination";

type Props = {
  data: ClientFormModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: ClientFormModel) => void;
  clientType: "supplier" | "customer";
};

const ClientTable = ({
  data,
  deleteRequest,
  updateRequest,
  clientType,
}: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [openGeneralDelete, setOpenGeneralDelete] = useState(false);
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

  const rows: GridRowsProp = data.map(
    (
      { id, name, nip, city, streetName, streetNumber, zipCode, phone, email },
      row_id
    ) => ({
      row_id,
      id,
      name,
      nip,
      city,
      streetName,
      streetNumber,
      zipCode,
      phone,
      email,
    })
  );

  const columnNames: GridColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nip",
      headerName: "NIP",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "zipCode",
      headerName: "Zip code",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "streetName",
      headerName: "Street Name",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "streetNumber",
      headerName: "Street Number",
      width: 120,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "edit",
      headerName: "",
      width: 60,
      renderCell: (params: any) => (
        <Button onClick={() => openUpdateModal(data[params.row.row_id])}>
          <EditIcon />
        </Button>
      ),
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "delete",
    //   headerName: "",
    //   width: 60,
    //   renderCell: (params: any) => (
    //     <Button onClick={() => openDeleteModal(params.id)}>
    //       <DeleteIcon />
    //     </Button>
    //   ),
    //   headerAlign: "center",
    //   align: "center",
    // },
  ];

  return (
    <div style={{ height: 600, maxWidth: 540, minWidth: "62vw" }}>
      <DataGrid
        rows={rows}
        columns={columnNames}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { setOpenGeneralDelete, checked },
        }}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          setChecked(
            rows.filter((row) => selectedIDs.has(row.id)).map((x) => x.id)
          );
        }}
      />
      <DeletionModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        createRequest={deleteRequest}
        idxs={[idx]}
      />
      <DeletionModal
        open={openGeneralDelete}
        handleClose={() => setOpenGeneralDelete(false)}
        createRequest={deleteRequest}
        idxs={checked}
      />
      <ClientForm
        open={openUpdate}
        handleClose={() => setOpenUpdate(false)}
        createRequest={updateRequest}
        initialValues={updatedCustomer}
        clientType={clientType}
        isEdited={true}
      />
    </div>
  );
};

export default ClientTable;
