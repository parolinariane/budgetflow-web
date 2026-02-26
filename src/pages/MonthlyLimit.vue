<template>
  <div class="limit-container">
    <h2>Definir Limite Mensal</h2>

    <div class="form-group">
      <label>Mês</label>
      <input type="month" v-model="selectedMonth" @change="loadLimit" />
    </div>

    <div class="form-group">
      <label>Valor do Limite</label>
      <input
        type="number"
        v-model="limitAmount"
        placeholder="Digite o valor"
      />
    </div>

    <button class="btn-primary" @click="saveLimit">
      Salvar Limite
    </button>

    <p v-if="successMessage" class="success">
      {{ successMessage }}
    </p>
  </div>
</template>

<script>
import monthlyLimitService from "../services/monthlyLimitService";

export default {
  name: "MonthlyLimit",
  data() {
    return {
      selectedMonth: "",
      limitAmount: "",
      successMessage: ""
    };
  },
  mounted() {
    // já abre no mês atual
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    this.selectedMonth = `${year}-${month}`;
    this.loadLimit();
  },
  methods: {
    async loadLimit() {
      if (!this.selectedMonth) return;

      const [year, month] = this.selectedMonth.split("-");

      try {
        const response = await monthlyLimitService.get(year, month);
        this.limitAmount = response.data.limitAmount;
      } catch (error) {
        this.limitAmount = "";
      }
    },

    async saveLimit() {
      if (!this.selectedMonth || !this.limitAmount) return;

      const [year, month] = this.selectedMonth.split("-");

      try {
        await monthlyLimitService.set(year, month, this.limitAmount);
        this.successMessage = "Limite salvo com sucesso!";
        setTimeout(() => (this.successMessage = ""), 3000);
      } catch (error) {
        console.error("Erro ao salvar limite:", error);
      }
    }
  }
};
</script>

<style scoped>
.limit-container {
  max-width: 500px;
  margin: 3rem auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

h2 {
  color: #27AE60;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

input {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.success {
  margin-top: 1rem;
  color: #27AE60;
  font-weight: bold;
}

.btn-primary {
  background-color: #27AE60;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>