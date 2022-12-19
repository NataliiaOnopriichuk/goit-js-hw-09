import { Notify } from "../../node_modules/notiflix/build/notiflix-notify-aio";

const formEl = document.querySelector(".form");

formEl.addEventListener("input", onValueForm);
formEl.addEventListener("submit", onFormSubmit);
let formData = {};

function onValueForm(e) {
  formData[e.target.name] = +e.target.value;
}

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = formData;
  let newDelay = delay;
  for (let i = 0; i < amount; i++) {
    newDelay += step;
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
