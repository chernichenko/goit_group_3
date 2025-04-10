import axios from "axios";

export default class Client {
  /**
   * @param {Object} options - Configuration options for the client.
   * @param {string} options.baseURL - The base URL for the API.
   */
  constructor({ baseURL = "https://your-energy.b.goit.study/api" }) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetches a list of filters from the API.
   *
   * @param {Object} params - Parameters for the request.
   * @param {string} params.filter - The filter to apply.
   * @param {number} [params.page=1] - The page number for pagination.
   * @param {number} [params.limit=10] - The number of items per page.
   * @returns {Promise<Object>} The response data from the API.
   */
  async listFilters({ filter, page = 1, limit = 10 }) {
    const response = await this.instance.get("/filters", {
      params: {
        filter,
        page,
        limit,
      },
    });
    return response.data;
  }

  /**
   * Fetches a list of exercises from the API.
   *
   * @param {Object} params - Parameters for the request.
   * @param {string} [params.bodypart] - The body part to filter by.
   * @param {string} [params.muscles] - The muscles to filter by.
   * @param {string} [params.equipment] - The equipment to filter by.
   * @param {string} [params.keyword] - A keyword to search for.
   * @param {number} [params.page=1] - The page number for pagination.
   * @param {number} [params.limit=10] - The number of items per page.
   */
  async listExercies({
    bodypart = undefined,
    muscles = undefined,
    equipment = undefined,
    keyword = undefined,
    page = 1,
    limit = 10,
  }) {
    const response = await this.instance.get("/exercises", {
      params: {
        bodypart,
        muscles,
        equipment,
        keyword,
        page,
        limit,
      },
    });
    return response.data;
  }

  /**
   * @param {string} id - The ID of the exercise to fetch.
   */
  async getExrciseById(id) {
    const response = await this.instance.get(`/exercises/${id}`);
    return response.data;
  }

  /**
   * @param {string} id - The ID of the exercise to fetch.
   * @param {number} rate - The rating to set.
   * @param {string} email - The email of the user giving the rating.
   * @param {string} review - The review text.
   */
  async addExerciseRating(id, rate, email, review) {
    const response = await this.instance.patch(`/exercises/${id}/rating`, {
      rate,
      email,
      review,
    });
    return response.data;
  }

  async getQuote() {
    const response = await this.instance.get("/quote");
    return response.data;
  }

  async getQuoteOfTheDay() {
    const currentDateString = new Date().toISOString().split("T")[0];
    const savedQuote = localStorage.getItem("quoteOfTheDay");
    if (savedQuote) {
      const savedQuoteData = JSON.parse(savedQuote);
      if (savedQuoteData.date === currentDateString) {
        return { ...savedQuoteData.quote, cached: true };
      }
    }
    const response = await this.getQuote();
    const quoteObjectString = JSON.stringify({
      date: currentDateString,
      quote: response,
    });
    localStorage.setItem("quoteOfTheDay", quoteObjectString);
    return response;
  }
}
