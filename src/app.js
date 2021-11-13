let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

window.addEventListener("load", () => {
  //defining canvas size
  settingCanvasSize();
  //vars
  let painting = false;

  function start(e) {
    painting = true;
    draw(e);
  }

  function end() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.closePath();
  }
  //events
  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mousemove", draw);
});

function settingCanvasSize() {
  canvas.height = window.innerHeight - 85;
  canvas.width = window.innerWidth - 30;
}

// btns selectors
let colorBtns = document.querySelectorAll(".colorBtns");
let clearBtn = document.querySelector(".clearCanvas");

//events
colorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.className === "whiteBrush") {
      ctx.strokeStyle = "white";
    } else if (e.target.className === "blackBrush") {
      ctx.strokeStyle = "black";
    } else if (e.target.className === "redBrush") {
      ctx.strokeStyle = "red";
    } else if (e.target.className === "blueBrush") {
      ctx.strokeStyle = "blue";
    } else if (e.target.className === "greenBrush") {
      ctx.strokeStyle = "green";
    } else if (e.target.className === "yellowBrush") {
      ctx.strokeStyle = "yellow";
    } else if (e.target.className === "orangeBrush") {
      ctx.strokeStyle = "orange";
    } else if (e.target.className === "pinkBrush") {
      ctx.strokeStyle = "#ff339a";
    } else if (e.target.className === "purpleBrush") {
      ctx.strokeStyle = "#ff339a";
    }
  });
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// window.addEventListener("resize", settingCanvasSize);
