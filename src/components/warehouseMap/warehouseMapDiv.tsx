import { Button, Grid, Paper, Tooltip } from "@mui/material";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { LogisticUnitModel, StorageModel } from "../../api/apiModel";
import { StoreContext } from "../../redux/store/StoreProvider";
import { ClientFormModel } from "../clientTable/types";

type Props = {
  data: StorageModel[];
  type: number;
};

function WarehouseMapDiv({ data, type }: Props) {
  const { customersState } = useContext(StoreContext);
  const storages =
    data.find(({ storage_type }) => storage_type === type)?.storageplace_set ??
    [];
  let rackNum = 0;
  let isEmpty = 0;
  let tooltip: any[] = [];

  return (
    <Paper>
      <Grid
        container
        direction="row"
        rowSpacing={4}
        columnSpacing={0.5}
        sx={{
          width: "480px",
          height: "fit-content",
          margin: "1em",
          padding: "2em",
        }}
      >
        {storages.map((item, idx) => {
          if (item.x === rackNum && item.y === 0 && item.z === 0) {
            isEmpty = 0;
            tooltip = [];
          }
          isEmpty =
            item.logisticunit?.products && item.logisticunit.products.length > 0
              ? ++isEmpty
              : isEmpty;

          tooltip.push(
            <p>
              {item.y}.{item.z}: {item.logisticunit?.products[0].name ?? "-"}{" "}
              {item.logisticunit?.products[0].customer
                ? customersState.data.find(
                    ({ id }: ClientFormModel) =>
                      id === item.logisticunit?.products[0]?.customer
                  ).name
                : ""}
            </p>
          );

          return item.x === rackNum && item.y === 2 && item.z === 2
            ? ++rackNum && (
                <Grid item key={storages[idx].id}>
                  <Tooltip title={<div>{tooltip}</div>} placement="right-start">
                    <Button
                      variant="contained"
                      color={
                        isEmpty > 0
                          ? isEmpty === 9
                            ? "error"
                            : "primary"
                          : "secondary"
                      }
                    >
                      {isEmpty} / 9
                    </Button>
                  </Tooltip>
                </Grid>
              )
            : null;
        })}
      </Grid>
    </Paper>
  );
}

export { WarehouseMapDiv };
