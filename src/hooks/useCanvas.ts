import { useEffect, useState } from "react";

export const useCanvas = () => {
  const [smileAngle, setSmileAngle] = useState(Math.PI / 4);
  const [smileDistance, setSmileDistance] = useState(100);
  const [eyeRadius, setEyeRadius] = useState(30);
  useEffect(() => {
    var c = document.getElementById("myCanvas") as HTMLCanvasElement;
    var ctx = c.getContext("2d");

    if (ctx !== null) {
      ctx.clearRect(0, 0, 500, 500);
      ctx.beginPath();
      ctx.arc(250, 250, 200, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff492";
      ctx.fill();
      ctx.closePath();
      ctx.moveTo(139, 147);
      ctx.fillStyle = "#644141";
      ctx.beginPath();
      ctx.ellipse(165, 182, eyeRadius, eyeRadius, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.ellipse(335, 182, eyeRadius, eyeRadius, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(
        250,
        280,
        smileDistance,
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
  return {
    smileAngle,
    smileDistance,
    eyeRadius,
    setSmileAngle,
    setSmileDistance,
    setEyeRadius,
  };
};
