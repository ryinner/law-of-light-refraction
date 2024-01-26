const canvas = document.querySelector('canvas');

if (!canvas) {
  throw new Error('Canvas not found');
}

const lightInput = document.getElementById('light');
const topInput = document.getElementById('environ-top');
const bottomInput = document.getElementById('environ-bottom');

const ctx = canvas.getContext('2d');

// base light

drawRefraction({
  angle: 45,
  environ: {
    top: 1,
    bottom: 1.33
  }
});

document.forms.input.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value: angle } = lightInput;
  const { value: top } = topInput;
  const { value: bottom } = bottomInput;

  drawRefraction({
    angle,
    environ: {
      top,
      bottom
    },
  });
});

document.querySelectorAll('.angle-button').forEach(b => {
  b.addEventListener('click', () => {
    lightInput.value = b.dataset.angle;
  });
});

document.querySelectorAll('.environ-top-button').forEach(b => {
  b.addEventListener('click', () => {
    topInput.value = b.dataset.value;
  });
});

document.querySelectorAll('.environ-bottom-button').forEach(b => {
  b.addEventListener('click', () => {
    bottomInput.value = b.dataset.value;
  });
});


function drawRefraction ({ angle, environ }) {
  drawBase();
  drawLight({
    angle: 270 - Number(angle),
    color: 'yellow'
  });

  drawLight({
    angle: 270 + Number(angle),
    color: 'red'
  });

  const sinB = environ.top * Math.sin(Number(angle) * Math.PI / 180) / environ.bottom;
  const angleRefraction = Math.asin(sinB) * 180 / Math.PI;

  drawLight({
    angle: Number(angleRefraction),
    color: 'blue'
  });
}

function drawLight ({
  angle: initialAngle,
  color
}) {
  const angle = initialAngle * Math.PI / 180;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(200, 200);
  ctx.lineTo(200 + Math.cos(angle) * 1000, 200 + Math.sin(angle) * 1000);
  ctx.stroke();
  ctx.closePath();
}

function drawBase () {
  // Холст
  ctx.fillRect(0, 0, 400, 400);
  ctx.fillStyle = "#000";

  // Y
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 400);
  ctx.stroke();

  // X

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.moveTo(0, 200);
  ctx.lineTo(400, 200);
  ctx.stroke();
}