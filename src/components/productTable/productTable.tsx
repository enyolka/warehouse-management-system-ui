import { Button, Chip } from "@mui/material";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from "react";
import DeletionModal from "../deletionModal/deletionModal";
import ProductForm, { statuses } from "./productForm";
import { ProductFormModel } from "./types";
import styles from "./productTable.module.css";
import { Status } from "../../api/apiModel";
import { CustomPagination } from "../pagination/customPagination";

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

  const openDeleteModal = (idx: number) => {
    setOpenDelete(true);
    setIdx(idx);
  };

  const findStatus = (value: Status) => {
    return statuses.find((status) => value === status.value) ?? statuses[0];
  };

  // const openUpdateModal = (model: ProductFormModel) => {
  //   setOpenUpdate(true);
  //   setUpdatedProduct(model);
  // };

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
      created_by: created_by.username,
    })
  );

  const columnNames: GridColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 160,
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
      headerName: "Weight",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_by",
      headerName: "Last modification",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortComparator: (v1: any, v2: any, param1: any, param2: any) =>
        data[param1.row_id].status! < data[param2.row_id].status! ? -1 : 1,
      renderCell: (params: any) => {
        const val = findStatus(data[params.row.row_id]?.status ?? "ACCEPTED");
        return (
          <Chip
            label={val.label}
            color={
              val?.value === "IN_STOCK"
                ? "success"
                : val?.value === "SHIPPED"
                ? "secondary"
                : "primary"
            }
          />
        );
      },
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "edit",
    //   headerName: "",
    //   width: 60,
    //   renderCell: (params: any) => (
    //     <Button onClick={() => openUpdateModal(data[params.row.row_id])}>
    //       <EditIcon />
    //     </Button>
    //   ),
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "delete",
      headerName: "",
      width: 60,
      renderCell: (params: any) => (
        <Button onClick={() => openDeleteModal(params.id)}>
          <DeleteIcon />
        </Button>
      ),
      headerAlign: "center",
      align: "center",
    },
  ];

  console.log(data);
  return (
    <div style={{ height: 600, maxWidth: 700, minWidth: "70vw" }}>
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
        // getRowId={(row) => row.row_id}
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
        initialValues={updatedProduct}
      />
    </div>
    // <TableContainer component={Paper}>
    //   <Table size="medium" aria-label="Client table">
    //     <TableHead>
    //       <TableRow>
    //         {columnNames.map(({ field, headerName, isSorted }) => (
    //           <TableCell key={field} onClick={() => setSortedColum(headerName)}>
    //             {headerName}
    //           </TableCell>
    //         ))}
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data.map((product: ProductFormModel, id: number) => (
    //         <TableRow
    //           key={id}
    //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //           className={classNames({
    //             [styles.shipped]: product.status === "SHIPPED",
    //           })}
    //         >
    //           {/* <TableCell>{product.template?.name ?? ""}</TableCell> */}
    //           <TableCell>{product.name}</TableCell>
    //           <TableCell>{product.supplier?.name ?? ""}</TableCell>
    //           <TableCell>{product.length ? product.length : "-"}</TableCell>
    //           <TableCell>{product.width ? product.width : "-"}</TableCell>
    //           <TableCell>{product.height ? product.height : "-"}</TableCell>
    //           <TableCell>{product.weight ? product.weight : "-"}</TableCell>
    //           <TableCell>{product.created_by.username ?? "-"}</TableCell>
    //           <TableCell>{product.status ?? "-"}</TableCell>
    //           <TableCell>
    //             <Button onClick={() => openUpdateModal(product)}>
    //               <EditIcon color="action" />
    //             </Button>
    //             <Button onClick={() => openDeleteModal(product.id)}>
    //               <DeleteIcon color="action" />
    //             </Button>

    //             <DeletionModal
    //               open={openDelete}
    //               handleClose={() => setOpenDelete(false)}
    //               createRequest={deleteRequest}
    //               idxs={[idx]}
    //             />
    //             <ProductForm
    //               open={openUpdate}
    //               handleClose={() => setOpenUpdate(false)}
    //               createRequest={updateRequest}
    //               initialValues={updatedProduct}
    //             />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default ProductTable;
