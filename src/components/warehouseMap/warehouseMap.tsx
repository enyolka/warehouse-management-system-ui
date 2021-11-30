import * as React from "react";
import { useEffect, useRef } from "react";

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

function WarehouseMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = make2DArray(10, 10);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx == null) throw new Error("Could not get context");
    ctx.beginPath();
    ctx.strokeRect(0, 0, 400, 400);
    ctx.fill();
    for (let i = 0; i <= 20; i = i + 2) {
      for (let j = 0; j <= 20; j = j + 2) {
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.fillRect(20 * j + 10, 20 * i + 10, 20, 20);
        ctx.fill();
      }
    }
  }, []);

  return <canvas ref={canvasRef} height={400} width={400} />;
}

export { WarehouseMap };
