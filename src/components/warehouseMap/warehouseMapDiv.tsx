import { Grid } from "@mui/material";
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
  const rackNum = data.storageplace_set.slice(0, -1).length / 9;
  const storages = data.storageplace_set.slice(0, -1);

  // useEffect(() =>
  // , []);

  return (
    <>
      <Grid container direction="column">
        {storages.map((item, idx) =>
          idx % 9 === 0 ? (
            <Grid item key={storages[idx].id}>
              <div>{storages[idx].id}</div>
            </Grid>
          ) : null
        )}
      </Grid>
    </>
  );
}

export { WarehouseMapDiv };
