<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <img src="../assets/logo.png" alt="Logo BudgetFlow" class="logo" />
      <h1>BudgetFlow</h1>
    </header>

    <!-- Row de cards resumo -->
    <div class="cards-row">
      <CardSummary title="Receita Mensal" :amount="monthlyIncome" type="income" />
      <CardSummary title="Despesa Mensal" :amount="monthlyExpense" type="expense" />
      <CardSummary title="Saldo Geral" :amount="monthlyIncome - monthlyExpense" />
    </div>

    <!-- Seção de contas -->
    <!-- Título + filtro -->
    <div class="section-header">
    <h3>Minhas despesas</h3>

    <div class="filter">
        <input
        type="month"
        v-model="selectedMonth"
        @change="fetchByMonth"
        />
        <button @click="fetchAll" class="btn-primary">
        Todas
        </button>
    </div>
    </div>

    <!-- Lista de despesas -->
    <div class="expenses-list">
    <ExpenseCard
        v-for="expense in expenses"
        :key="expense.id"
        :expense="expense"
    />
    </div>

    <!-- Botão flutuante -->
    <FloatingButton @click="openAddExpense" />
  </div>
</template>

<script>
import CardSummary from "../components/CardSummary.vue";
import FloatingButton from "../components/FloatingButton.vue";
import expenseService from "../services/expenseServices.js";
import ExpenseCard from "../components/ExpenseCard.vue";


export default {
  name: "Dashboard",
  components: { CardSummary, FloatingButton, ExpenseCard },
  data() {
    return {
      expenses: [],
      accounts: [
        { id: 1, name: "Conta Santander", description: "Conta conectada", balance: 1486.45, color: "#E74C3C", initials: "S" },
        { id: 2, name: "Conta Caixa Econômica", description: "Conta manual", balance: 5468.99, color: "#3498DB", initials: "C" },
        { id: 3, name: "Conta Inter", description: "Conta manual", balance: 3645.0, color: "#F39C12", initials: "I" },
        { id: 4, name: "Conta Nubank", description: "Conta conectada", balance: 4345.17, color: "#8E44AD", initials: "N" },
      ],
      selectedMonth: null,
      monthlyIncome: 20000, // exemplo estático
      monthlyExpense: 12802.36, // exemplo estático
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
        this.monthlyExpense = totalResp.data.total;
      } catch (error) {
        console.error("Erro ao filtrar despesas:", error);
      }
    },
    openAddExpense() {
      alert("Abrir modal para criar despesa");
    },
  },
};
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 1rem 0;
}

.section-header h3 {
  margin: 0;
}

.filter {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.expenses-list {
  margin-bottom: 3rem;
}

.dashboard-container {
  max-width: 1200px;
  margin: 2rem auto;
  font-family: 'Roboto', sans-serif;
  color: #2C3E50;
  background-color: #F7F9F9;
  padding: 1rem;
}

.dashboard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: #27AE60;
  font-size: 2.5rem;
  margin: 0;
}

.logo {
  height: 50px;
  width: 50px;
  object-fit: contain;
}

.cards-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.accounts-list {
  margin-bottom: 2rem;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: #27AE60;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-primary:hover {
  background-color: #1e8449;
}
</style>
