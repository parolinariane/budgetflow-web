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

    <!-- Seção de contas -->
    <div class="section-header">
      <h3>Minhas despesas</h3>

      <div class="filter">
        <input
          type="month"
          v-model="selectedMonth"
          @change="fetchByMonth"
        />

        <button
          class="btn-secondary"
          @click="$router.push('/limite')"
        >
          Definir Limite
        </button>

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
    <FloatingButton 
      :disabled="isLimitExceeded"
      @click="openAddExpense" 
    />
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
      monthlyExpense: 0,
      monthlyLimit: 15000,
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
      if (this.isLimitExceeded) {
        alert("Você ultrapassou o limite mensal.");
        return;
      }

      alert("Abrir modal para criar despesa");
    }
  },
};
</script>

<style scoped>
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
