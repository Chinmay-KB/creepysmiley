import React, { FC, useEffect, useState } from "react";
import { getAggregateData } from "../db/db";

interface CreepyCanvasProps {
  size: number;
}

export const CreepyCanvas: FC<CreepyCanvasProps> = (props) => {
  const [smileAngle, setSmileAngle] = useState(Math.PI / 4);
  const [smileDistance, setSmileDistance] = useState(0.2 * props.size);
  const [eyeRadius, setEyeRadius] = useState((30 / 500) * props.size);
  useEffect(() => {
    getAggregateData().then((data) => {
      setSmileAngle(data.smileAngle);
      setSmileDistance(data.smileDistance);
      setEyeRadius(data.eyeRadius);
    });
  }, []);
  useEffect(() => {
    var c = document.getElementById("myCanvas") as HTMLCanvasElement;
    var ctx = c.getContext("2d");

    if (ctx !== null) {
      ctx.clearRect(0, 0, props.size, props.size);
      ctx.beginPath();
      ctx.arc(
        (props.size * 250) / 500,
        (props.size * 250) / 500,
        (props.size * 200) / 500,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "#fff492";
      ctx.fill();
      ctx.closePath();
      ctx.moveTo((props.size * 139) / 500, (props.size * 147) / 500);
      ctx.fillStyle = "#644141";
      ctx.beginPath();
      ctx.ellipse(
        (props.size * 165) / 500,
        (props.size * 182) / 500,
        (props.size * eyeRadius) / 500,
        (props.size * eyeRadius) / 500,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.ellipse(
        (props.size * 335) / 500,
        (props.size * 182) / 500,
        (props.size * eyeRadius) / 500,
        (props.size * eyeRadius) / 500,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(
        (props.size * 250) / 500,
        (props.size * 280) / 500,
        (props.size * smileDistance) / 500,
        Math.PI / 2 - smileAngle / 2,
        Math.PI / 2 + smileAngle / 2
      );
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#644141";
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.closePath();
    }
  }, [smileAngle, smileDistance, eyeRadius]);
  return (
    <canvas
      className="smiley-canvas"
      id="myCanvas"
      width={props.size.toString() + "px"}
      height={props.size.toString() + "px"}
      style={{
        backgroundColor: "white",
        borderRadius: "1rem",
        width: "500px",
        height: "500px",
        margin: "auto",
      }}
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
  );
};
