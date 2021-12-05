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

function WarehouseMap({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const position = useMousePosition();

  const grid = make2DArray(10, 10);
  const aisleNum = 4;
  const rackNum = data.storageplace_set.slice(0, -1).length / 9;
  const storages = data.storageplace_set.slice(0, -1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx == null) throw new Error("Could not get context");
    ctx.beginPath();
    ctx.strokeRect(0, 0, 600, 600);
    ctx.fill();

    if (storages.length > 0) {
      for (let i = 0; i <= aisleNum; i++) {
        for (let j = 0; j < 4; j++) {
          const a = storages[10 * i + j].logisticunit?.products;
          ctx.beginPath();
          ctx.fillStyle = a && a.length > 0 ? "yellow" : "gray";
          ctx.fillRect(51 * j + 15, 30 * i * 2 + 15, 50, 30);
          ctx.fillText("abc", position.x + 10, position.y + 10);
          ctx.fill();
        }
      }
    }
  }, []);

  return <canvas ref={canvasRef} height={600} width={600} />;
}

export { WarehouseMap };
