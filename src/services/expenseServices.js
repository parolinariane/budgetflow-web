import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5175/api", // <--- coloque a porta correta da sua API
});

const expenseService = {
  getAll() {
    return api.get("/expenses");
  },

  getByMonth(mes, ano) {
    return api.get(`/expenses/por-mes?mes=${mes}&ano=${ano}`);
  },

  getMonthlyTotal(mes, ano) {
    return api.get(`/expenses/total-mensal?mes=${mes}&ano=${ano}`);
  },

  create(data) {
    return api.post("/expenses", data);
  },

  update(id, data) {
    return api.put(`/expenses/${id}`, data);
  },

  delete(id) {
    return api.delete(`/expenses/${id}`);
  }
};

export default expenseService;
