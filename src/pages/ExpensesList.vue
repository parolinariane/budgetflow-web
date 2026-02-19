<template>
  <div>
    <h1>Despesas</h1>
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
  </div>
</template>

<script>
import expenseService from "../services/expenseServices.js";

export default {
  name: "ExpensesList",
  data() {
    return {
      expenses: [],
    };
  },
    async mounted() {
        try {
            const response = await expenseService.getAll();
            console.log(response.data); 
            this.expenses = response.data;
        } catch (error) {
            console.error("Erro ao buscar despesas:", error);
        }
    }
};
</script>
