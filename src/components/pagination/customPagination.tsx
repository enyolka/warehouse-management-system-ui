import { Button, Pagination } from "@mui/material";
import { useGridApiContext, useGridState } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export function CustomPagination({ setOpenGeneralDelete, checked }: any) {
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);

  return (
    <>
      {checked.length > 0 && (
        <Button onClick={() => setOpenGeneralDelete(true)}>
          <DeleteIcon /> Delete checked items
        </Button>
      )}
      <Pagination
        style={{ display: "flex" }}
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event: any, value: any) => apiRef.current.setPage(value - 1)}
      />
    </>
  );
}
