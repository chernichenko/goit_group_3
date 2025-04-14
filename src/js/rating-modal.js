import Api from "./api.js";
import iziToast from "izitoast";

const api = new Api({});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.rating-form');
  const modal = document.getElementById('rating-backdrop');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const rate = Number(form.querySelector('input[name="rating"]:checked')?.value);
    const email = formData.get('email');
    const review = formData.get('comment');
    const exerciseId = modal.dataset.exerciseId;

    if (!rate || !email || !review) {
      iziToast.warning({
        message: "Please fill in all fields and select a rating",
        position: "topRight",
      });
      return;
    }

    try {
      await api.addExerciseRating(exerciseId, rate, email, review);

      modal.classList.add('is-hidden');

      iziToast.success({
        message: "Rating submitted successfully!",
        position: "topRight",
      });

      form.reset();
      document.getElementById('rating-value').textContent = '0.0';
    } catch (error) {
      iziToast.error({
        message: error.response?.data?.message || "Something went wrong. Please try again.",
        position: "topRight",
      });
    }
  });
});
