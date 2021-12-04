import { Button, Grid } from "@mui/material";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { LogisticUnitModel, StorageModel } from "../../api/apiModel";

// type Cell = {
//   is_storage: boolean;
// }'

const make2DArray = (cols: number, rows: number) => {
  const arr = new Array(cols);
  arr.forEach((col) => (col = new Array(rows)));
};

function Cell() {
  const is_storage = true;
}

const useMousePosition = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const updatePosition = (event: any) => {
    const { pageX, pageY, clientX, clientY } = event;

    setPosition({
      x: clientX,
      y: clientY,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition, false);
    document.addEventListener("mouseenter", updatePosition, false);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  return position;
};

type Props = {
  data: StorageModel;
};

function WarehouseMapDiv({ data }: Props) {
  const storages = data.storageplace_set;

  // useEffect(() =>
  // , []);
  // console.log(storages);

  let rackNum = 0;
  let isEmpty = 0;

  return (
    <>
      <Grid
        container
        direction="row"
        rowSpacing={4}
        columnSpacing={0.5}
        sx={{ width: "460px", height: "200px" }}
      >
        {storages.map((item, idx) => {
          if (item.x === rackNum && item.y === 0 && item.z === 0) {
            isEmpty = 0;
          }
          isEmpty =
            item.logisticunit?.products && item.logisticunit.products.length > 0
              ? ++isEmpty
              : isEmpty;
          console.log({ item, isEmpty });

          return item.x === rackNum && item.y === 2 && item.z === 2
            ? ++rackNum && (
                <Grid item key={storages[idx].id}>
                  {console.log(isEmpty)}
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
                </Grid>
              )
            : null;
        })}
      </Grid>
    </>
  );
}

export { WarehouseMapDiv };
