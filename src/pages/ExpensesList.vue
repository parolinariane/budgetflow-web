<template>
  <div>
    <h1>Despesas</h1>

    <label for="month">Filtrar por mês:</label>
    <input type="month" id="month" v-model="selectedMonth" @change="fetchByMonth" />

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id">
          <td>{{ expense.id }}</td>
          <td>{{ expense.title }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ new Date(expense.date).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>

    <h3>Total do mês: {{ monthlyTotal }}</h3>
  </div>
</template>


<script>
import expenseService from "../services/expenseServices.js";

export default {
  name: "ExpensesList",
  data() {
    return {
      expenses: [],
      selectedMonth: null,
      monthlyTotal: 0,
    };
  },
  async mounted() {
    await this.fetchAll();
  },
  methods: {
    async fetchAll() {
      try {
        const response = await expenseService.getAll();
        this.expenses = response.data;
        this.calculateTotal();
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    },
    async fetchByMonth() {
      if (!this.selectedMonth) return;

      const [year, month] = this.selectedMonth.split("-");
      try {
        const response = await expenseService.getByMonth(month, year);
        this.expenses = response.data;

        const totalResp = await expenseService.getMonthlyTotal(month, year);
        this.monthlyTotal = totalResp.data.total; // assumindo que a API retorna { total: 123.45 }
      } catch (error) {
        console.error("Erro ao filtrar despesas:", error);
      }
    },
    calculateTotal() {
      this.monthlyTotal = this.expenses.reduce((sum, e) => sum + e.amount, 0);
    },
  },
};
</script>

