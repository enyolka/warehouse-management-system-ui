import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import { ProductTemplateFormModel } from "./types";
import ProductForm from "./productTemplateForm";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";
import { CustomPagination } from "../pagination/customPagination";

type Props = {
  data: ProductTemplateFormModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: ProductTemplateFormModel) => void;
};

const ProductTemplateTable = ({
  data,
  deleteRequest,
  updateRequest,
}: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openGeneralDelete, setOpenGeneralDelete] = useState(false);
  const [idx, setIdx] = useState<number>(0);
  const [checked, setChecked] = useState<number[]>([]);
  const [updatedTemplate, setUpdatedTemplate] =
    useState<ProductTemplateFormModel>();
  const disabled = !!(localStorage["admin"] === "false");

  const openDeleteModal = (idx: number) => {
    setOpenDelete(true);
    setIdx(idx);
  };

  const openUpdateModal = (model: ProductTemplateFormModel) => {
    setOpenUpdate(true);
    setUpdatedTemplate(model);
  };

  const rows: GridRowsProp = data.map(
    (
      { id, name, supplier, length, width, height, weight, price, unit },
      row_id
    ) => ({
      row_id: row_id,
      id: id,
      name: name,
      supplier: supplier.name,
      length: length,
      width: width,
      height: height,
      weight: weight,
      price: price,
      unit: unit,
    })
  );

  const columnNames: GridColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "length",
      headerName: "Length",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "width",
      headerName: "Width",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "height",
      headerName: "Height",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "edit",
      headerName: "",
      width: 90,
      renderCell: (params: any) => (
        <Button
          onClick={() => openUpdateModal(data[params.row.row_id])}
          disabled={disabled}
        >
          <EditIcon />
        </Button>
      ),
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "delete",
    //   headerName: "",
    //   width: 90,
    //   renderCell: (params: any) => (
    //     <Button
    //       onClick={() => openDeleteModal(params.row.row_id)}
    //       disabled={disabled}
    //     >
    //       <DeleteIcon />
    //     </Button>
    //   ),
    //   headerAlign: "center",
    //   align: "center",
    // },
  ];

  return (
    <div style={{ height: 600, maxWidth: 800, minWidth: "65vw" }}>
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
        open={openGeneralDelete}
        handleClose={() => setOpenGeneralDelete(false)}
        createRequest={deleteRequest}
        idxs={checked}
      />
      <DeletionModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        createRequest={deleteRequest}
        idxs={[idx]}
      />
      <ProductForm
        open={openUpdate}
        handleClose={() => setOpenUpdate(false)}
        createRequest={updateRequest}
        initialValues={updatedTemplate}
      />
    </div>
  );
};

export default ProductTemplateTable;
