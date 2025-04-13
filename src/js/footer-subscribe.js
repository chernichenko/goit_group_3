import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Client from "./api";

const form = document.querySelector(".subscribe-form");
const emailInput = form.elements.email;

let formData = { email: "" };
const STORAGE_KEY = "subscribe-form-state";

const client = new Client({});

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    formData = JSON.parse(savedData);
    emailInput.value = formData.email || "";
  }
};

loadFromLocalStorage();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!emailInput.validity.valid) {
    iziToast.error({
      title: "Error",
      message: "Please enter a valid email",
      position: "topRight",
      timeout: 3000,
      backgroundColor: "#EF4040",
      messageColor: "#fff",
    });
    return;
  }

  formData.email = emailInput.value.trim();

  try {
    const response = await client.subscriptionRequest(formData);

    if (response.error) {
      if (response.status === 409) {
        iziToast.warning({
          title: "Warning",
          message: "This email is already subscribed.",
          position: "topRight",
          timeout: 3000,
          messageColor: "#fff",
        });
      } else {
        iziToast.error({
          title: "Error",
          message: "Subscription failed. Please try again later.",
          position: "topRight",
          timeout: 3000,
          backgroundColor: "#EF4040",
          messageColor: "#fff",
        });
      }
    } else {
      iziToast.success({
        title: "",
        message: "Subscription successful!",
        position: "topRight",
        timeout: 3000,
        backgroundColor: "#64B880",
        messageColor: "#fff",
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      iziToast.warning({
        title: "Warning",
        message: "This email is already subscribed.",
        position: "topRight",
        timeout: 3000,
        messageColor: "#fff",
      });
    } else {
      iziToast.error({
        title: "Error",
        message: "Subscription failed. Please try again later.",
        position: "topRight",
        timeout: 3000,
        backgroundColor: "#EF4040",
        messageColor: "#fff",
      });
    }
  }

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});
