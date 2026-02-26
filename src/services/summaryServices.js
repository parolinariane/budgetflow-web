import api from "./api";

const summaryService = {
  getMonthlySummary(year, month) {
    return api.get(`/Summary/${year}/${month}`);
  }
};

export default summaryService;