import api from "./api";

const expenseService = {
  getAll() {
    return api.get("/expenses");
  },

  getByMonth(mes, ano) {
    return api.get(`/expenses/por-mes?mes=${mes}&ano=${ano}`);
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