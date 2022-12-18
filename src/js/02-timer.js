import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "../../node_modules/notiflix/build/notiflix-notify-aio";

const ref = {
  btnStart: document.querySelector("[data-start]"),
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]"),
};
let intervalId = null;
let startTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let startTime = selectedDates[0].getTime();
    if (startTime < Date.now()) {
      Notify.failure("Please choose a date in the future");
      return;
    } else {
      ref.btnStart.removeAttribute("disabled");
    }
    ref.btnStart.addEventListener("click", () => {
      onUpdateTime(startTime);
      intervalId = setInterval(() => {
        onUpdateTime(startTime);
      }, 1000);
    });
  },
};

flatpickr("#datetime-picker", options);

ref.btnStart.setAttribute("disabled", true);

function onUpdateTime(startTime) {
  const currentTime = Date.now();
  let result = startTime - currentTime;
  const { days, hours, minutes, seconds } = convertMs(result);
  ref.daysEl.textContent = addLeadingZero(days);
  ref.hoursEl.textContent = addLeadingZero(hours);
  ref.minutesEl.textContent = addLeadingZero(minutes);
  ref.secondsEl.textContent = addLeadingZero(seconds);
  if (result < 1000) {
    clearInterval(intervalId);
    return;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
