window.addEventListener("load", () => {
  let canvas = document.querySelector("#canvas");
  let ctx = canvas.getContext("2d");
  let brushWidth = 10;
  let restoreArray = [];
  let index = -1;

  function settingCanvasSize(e) {
    canvas.width = window.innerWidth - 40;
    if (canvas.width < 650) {
      canvas.height = window.innerHeight - 150;
    } else if (canvas.width < 900 && canvas.width > 650) {
      canvas.height = window.innerHeight - 130;
    } else {
      canvas.height = window.innerHeight - 100;
    }
  }
  //defining canvas size
  settingCanvasSize();

  let painting = false;

  function draw(e) {
    e.preventDefault();
    if (!painting) return;
    ctx.lineWidth = brushWidth;
    ctx.lineCap = "round";
    if (e.type === "mousemove" || e.type === "mousedown") {
      ctx.lineTo(e.clientX, e.clientY);
    } else if (e.type === "touchmove" || e.type === "touchstart") {
      ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
    }
    ctx.stroke();
    ctx.beginPath();
    if (e.type === "mousemove" || e.type === "mousedown") {
      ctx.moveTo(e.clientX, e.clientY);
    } else if (e.type === "touchmove" || e.type === "touchstart") {
      ctx.moveTo(e.touches[0].pageX, e.touches[0].pageY);
    }
    ctx.closePath();
  }


  function start(e) {
    e.preventDefault();
    painting = true;
    ctx.beginPath();
    draw(e);
  }

  function end(e) {
    e.preventDefault();
    ctx.closePath();
    if (painting) {
      restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
      painting = false;
    }
  }
  
  //mouse events
  canvas.addEventListener("mousedown", start, false);
  canvas.addEventListener("touchstart", start, false);
  canvas.addEventListener("mouseup", end, false);
  canvas.addEventListener("mouseout", end, false);
  canvas.addEventListener("touchend", end, false);
  canvas.addEventListener("mousemove", draw, false);
  canvas.addEventListener("touchmove", draw, false);


  //brush properties selectors
  let colorBtns = document.querySelectorAll(".colorBtns button");
  let clearBtn = document.querySelector(".clearCanvas");
  let undoBtn = document.querySelector(".undoBtn");
  let colorPicker = document.querySelector(".color-picker");
  let brushWidthPicker = document.querySelector(".brush-width-range");
  let download = document.querySelector(".download-drawing");
  //brush events
  //brush width pick
  brushWidthPicker.addEventListener("input", (e) => {
    brushWidth = brushWidthPicker.value;
  });
  //brush color pick
  colorPicker.addEventListener("input", (e) => {
    ctx.strokeStyle = colorPicker.value;
  });

  colorBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let pickedColor = window.getComputedStyle(btn).backgroundColor;
      ctx.strokeStyle = pickedColor;
      function rgbToHex(rgb) {
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        rgb = rgb.substr(4).split(")")[0].split(sep);
        let r = (+rgb[0]).toString(16),
          g = (+rgb[1]).toString(16),
          b = (+rgb[2]).toString(16);
        if (r.length == 1) r = "0" + r;
        if (g.length == 1) g = "0" + g;
        if (b.length == 1) b = "0" + b;
        return "#" + r + g + b;
      }
      colorPicker.value = rgbToHex(pickedColor);
      //changing border color of picked color
      colorBtns.forEach((singleBtn) => {
        if (singleBtn === e.target) {
          singleBtn.style.borderColor = "white";
        } else {
          singleBtn.style.borderColor = "black";
        }
      });
    });
  });

  //clear drawing
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    restoreArray = [];
    index = -1;
  }
  clearBtn.addEventListener("click", clearCanvas);

  //undo
  undoBtn.addEventListener("click", () => {
    if (index <= 0) {
      clearCanvas();
    } else {
      index -= 1;
      restoreArray.pop();
      ctx.putImageData(restoreArray[index], 0, 0);
    }
  });

  //download image
  download.addEventListener("click", () => {
    let image = canvas.toDataURL("image/png");
    download.href = image;
  });

  /*window.addEventListener("resize", () => {
    canvas.height = window.innerHeight - 85;
    canvas.width = window.innerWidth - 30;
    ctx.putImageData(restoreArray[index], 0, 0);
  });*/
});
