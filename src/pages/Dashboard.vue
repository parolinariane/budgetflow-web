<template>
  <div class="dashboard-container">

    <!-- Row de cards resumo -->
    <div class="cards-row">
      <CardSummary 
        title="Total Gasto no Mês" 
        :amount="monthlyExpense" 
        type="expense" 
      />

      <CardSummary 
        title="Limite Mensal" 
        :amount="monthlyLimit" 
        type="limit" 
      />

      <CardSummary 
        title="Restante do Limite" 
        :amount="remainingLimit"
        :type="remainingLimit >= 0 ? 'income' : 'expense'"
      />
    </div>
    <div class="limit-widget">
      <div class="limit-header">
        <div>
          <h4>Uso do Orçamento</h4>
          <p>
            {{ usedPercentage.toFixed(0) }}% utilizado
          </p>
        </div>

        <div class="percentage-circle"
            :class="progressStatus">
          {{ usedPercentage.toFixed(0) }}%
        </div>
      </div>

      <div class="progress-bar-modern">
        <div
          class="progress-fill-modern"
          :class="progressStatus"
          :style="{ width: usedPercentage + '%' }"
        ></div>
      </div>

    </div>

    <CardMonthlyLimit
      :selectedMonth="selectedMonth"
      @limit-updated="loadDashboardData"
    />

    <!-- Seção de contas -->
<div class="expenses-section">

  <div class="expenses-header">
    <h3>Minhas despesas</h3>

    <div class="filter-card">
      <div class="filter-group">
        <label>Mês</label>
        <input
          type="month"
          v-model="selectedMonth"
          @change="fetchByMonth"
          class="input-month"
        />
      </div>

      <button
        class="btn-outline"
        @click="$router.push('/limite')"
      >
        Definir Limite
      </button>

      <button
        @click="fetchAll"
        class="btn-solid"
      >
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
      <FloatingButton 
        :disabled="isLimitExceeded"
        @click="openAddExpense" 
      />
    </div>
  </div>
</template>

<script>
import CardSummary from "../components/CardSummary.vue";
import FloatingButton from "../components/FloatingButton.vue";
import ExpenseCard from "../components/ExpenseCard.vue";
import CardMonthlyLimit from "../components/CardMonthlyLimit.vue";

import expenseService from "../services/expenseServices";
import monthlyLimitService from "@/services/monthlyLimitService";
import summaryService from "../services/summaryServices";

export default {
  name: "Dashboard",
  components: { CardSummary, FloatingButton, ExpenseCard, CardMonthlyLimit },

  data() {
    return {
      expenses: [],
      selectedMonth: new Date().toISOString().slice(0, 7),
      monthlyExpense: 0,
      monthlyLimit: 0,
      loading: false
    };
  },

  computed: {
    remainingLimit() {
      return this.monthlyLimit - this.monthlyExpense;
    },

    usedPercentage() {
      if (!this.monthlyLimit) return 0;
      return Math.min(
        (this.monthlyExpense / this.monthlyLimit) * 100,
        100
      );
    },

    isLimitExceeded() {
      return this.monthlyExpense > this.monthlyLimit;
    },

    progressStatus() {
      if (this.usedPercentage >= 100) return "danger";
      if (this.usedPercentage > 75) return "warning";
      return "success";
    }
  },

  async mounted() {
    await this.loadDashboardData();
  },

  methods: {
    async loadDashboardData() {
      if (!this.selectedMonth) return;

      const [year, month] = this.selectedMonth.split("-");
      this.loading = true;

      try {
        const [expensesRes, summaryRes, limitRes] = await Promise.all([
          expenseService.getByMonth(month, year),
          summaryService.getMonthlySummary(year, month),
          monthlyLimitService.get(year, month)
        ]);

        this.expenses = expensesRes.data || [];

        // Ajuste conforme seu JSON do backend
        this.monthlyExpense = summaryRes.data?.totalExpenses || 0;

        this.monthlyLimit = limitRes.data?.limitAmount || 0;

      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        this.monthlyExpense = 0;
        this.monthlyLimit = 0;
      } finally {
        this.loading = false;
      }
    },

    async fetchByMonth() {
      await this.loadDashboardData();
    },

    async fetchAll() {
      try {
        const response = await expenseService.getAll();
        this.expenses = response.data;
        this.monthlyExpense = 0;
        this.monthlyLimit = 0;
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    },

    openAddExpense() {
      if (this.isLimitExceeded) {
        alert("Você ultrapassou o limite mensal.");
        return;
      }

      alert("Abrir modal para criar despesa");
    }
  }
};
</script>

<style scoped>
.btn-solid {
  background: #27AE60;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.btn-solid:hover {
  background: #1e8449;
  transform: translateY(-1px);
}

.btn-outline {
  background: white;
  color: #27AE60;
  border: 1px solid #27AE60;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.btn-outline:hover {
  background: #E8F8F1;
  transform: translateY(-1px);
}

.expenses-section {
  margin-top: 2rem;
}

.expenses-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.expenses-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.filter-card {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  background: white;
  padding: 1rem 1.2rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.3rem;
}

.input-month {
  border: 1px solid #E5E7EB;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: 0.2s;
}

.input-month:focus {
  outline: none;
  border-color: #27AE60;
  box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.15);
}

.limit-widget {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.limit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.limit-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.limit-header p {
  margin: 0.3rem 0 0 0;
  font-size: 0.85rem;
  color: #6B7280;
}

.percentage-circle {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  background-color: #E5E7EB;
  transition: 0.3s;
}

.progress-bar-modern {
  margin-top: 1.2rem;
  height: 12px;
  background-color: #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

.progress-fill-modern {
  height: 100%;
  border-radius: 8px;
  transition: width 0.4s ease;
}

/* STATUS COLORS */

.success {
  background-color: #27AE60;
  color: white;
}

.warning {
  background-color: #F39C12;
  color: white;
}

.danger {
  background-color: #E74C3C;
  color: white;
}

.progress-fill-modern.success {
  background: linear-gradient(90deg, #27AE60, #2ECC71);
}

.progress-fill-modern.warning {
  background: linear-gradient(90deg, #F39C12, #F1C40F);
}

.progress-fill-modern.danger {
  background: linear-gradient(90deg, #E74C3C, #C0392B);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 1rem 0;
}

.section-header h3 {
  margin: 0;
}

.btn-secondary {
  background-color: white;
  color: #27AE60;
  border: 1px solid #27AE60;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-secondary:hover {
  background-color: #E8F8F1;
}

.filter {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.expenses-list {
  background: white;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 3rem;
}

.dashboard-container {
  max-width: 1200px;
  margin: 2rem auto;
  font-family: 'Roboto', sans-serif;
  color: #2C3E50;
  background-color: #f1f1f1;
  padding: 1rem;
  border-radius: 2%;
  margin-top: 95px;
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
