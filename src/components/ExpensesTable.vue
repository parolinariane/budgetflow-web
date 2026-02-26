<template>
  <table class="expenses-table">
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
        <td>{{ expense.amount.toFixed(2) }}</td>
        <td>{{ new Date(expense.date).toLocaleDateString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ExpensesTable",
  props: {
    expenses: Array,
  },
};
</script>

<style scoped>
.expenses-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.expenses-table th, .expenses-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
}

.expenses-table tbody tr:hover {
  background-color: #A3E4D7;
}
</style>
