const colorPicker = document.querySelector("#color-picker");
const canvas = document.querySelector("#myCanvas");
const clearBtn = document.querySelector("#clearbtn");
const saveBtn = document.querySelector("#savebtn");
const retBtn = document.querySelector("#retbtn");
const fontSize = document.querySelector("#fontSize");
const canvaColorPicker = document.querySelector("#canvacolor");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

canvaColorPicker.addEventListener("change", (e) => {
  canvas.style.backgroundColor = e.target.value;
});

fontSize.addEventListener("change", (e) => {
  const fontSizeValue = e.target.value;
  ctx.lineWidth = fontSizeValue / 10;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseout", () => {
  isDrawing = false;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas_image.png";
  link.click();
});

retBtn.addEventListener("click", () => {
  const savedImage = localStorage.getItem("savedCanvasImage");
  if (savedImage) {
    const img = document.createElement("img");
    img.src = savedImage;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  } else {
    alert("No saved signature found.");
  }
});
