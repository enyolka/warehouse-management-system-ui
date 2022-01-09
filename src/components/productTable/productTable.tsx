import { Button, Chip } from "@mui/material";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import ProductForm from "./productForm";
import { ProductFormModel } from "./types";
import styles from "./productTable.module.css";
import { CustomPagination } from "../pagination/customPagination";
import { statuses } from "./productFormFromTemplate";
import { Status } from "../../api/apiModel";

type Props = {
  data: ProductFormModel[];
  deleteRequest: (idx: number) => void;
  updateRequest: (model: ProductFormModel) => void;
};

const ProductTable = ({ data, deleteRequest, updateRequest }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openGeneralDelete, setOpenGeneralDelete] = useState(false);
  const [idx, setIdx] = useState<number>(0);
  const [updatedProduct, setUpdatedProduct] = useState<ProductFormModel>();
  const [checked, setChecked] = useState<number[]>([]);

  const findStatus = (value: Status) => {
    return statuses.find((status) => value === status.value) ?? statuses[0];
  };

  const rows: GridRowsProp = data.map(
    (
      {
        id,
        template,
        name,
        supplier,
        length,
        width,
        height,
        weight,
        price,
        created_by,
        status,
      },
      row_id
    ) => ({
      row_id: row_id,
      id: id,
      template: template.name,
      name: name,
      supplier: supplier.name,
      length: length,
      width: width,
      height: height,
      weight: weight,
      price: price,
      created_by: created_by.username,
    })
  );

  const columnNames: GridColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "length",
      headerName: "Length",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "width",
      headerName: "Width",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "height",
      headerName: "Height",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "weight",
      headerName: "Weight (kg)",
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price ($)",
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_by",
      headerName: "Last modification",
      width: 160,
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortComparator: (v1: any, v2: any, param1: any, param2: any) =>
        data[param1.row_id].status! < data[param2.row_id].status! ? -1 : 1,
      renderCell: (params: any) => {
        const val = findStatus(data[params.row.row_id]?.status ?? "ACCEPTED");
        return <Chip label={val.label} color={val?.color ?? undefined} />;
      },
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div style={{ height: 600, maxWidth: 700, minWidth: "60vw" }}>
      <DataGrid rows={rows} columns={columnNames} />
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
        initialValues={updatedProduct}
      />
    </div>
  );
};

export default ProductTable;
