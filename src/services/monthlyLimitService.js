import api from "./api";

const monthlyLimitService = {
  async get(year, month) {
    return await api.get(`/MonthlyLimit/${year}/${month}`);
  },

  async set(year, month, amount) {
    return await api.post("/MonthlyLimit", {
      year: Number(year),
      month: Number(month),
      limitAmount: Number(amount)
    });
  }
};

export default monthlyLimitService;