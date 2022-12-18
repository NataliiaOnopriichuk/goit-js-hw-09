const ref = {
  btnStart: document.querySelector("button[data-start]"),
  btnStop: document.querySelector("button[data-stop]"),
  body: document.body,
};

ref.btnStart.addEventListener("click", onChangeBgColor);
ref.btnStop.addEventListener("click", onStopChangeBgColor);

const INTERVAL_CHANGE_COLOR = 1000;
let intervalId = null;

function onChangeBgColor(e) {
  ref.body.style.backgroundColor = getRandomHexColor();
  ref.btnStop.removeAttribute("disabled");
  ref.btnStart.setAttribute("disabled", true);
  intervalId = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_CHANGE_COLOR);
}

function onStopChangeBgColor(e) {
  clearInterval(intervalId);
  ref.btnStart.removeAttribute("disabled");
  ref.btnStop.setAttribute("disabled", true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
