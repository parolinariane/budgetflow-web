<template>
  <div class="limit-card">
    <div class="card-header">
      <h4>Limite Mensal</h4>
      <span class="month-label">
        {{ formattedMonth }}
      </span>
    </div>

    <div class="limit-content">
      <input
        type="number"
        v-model.number="limitAmount"
        placeholder="Definir valor do limite"
        class="limit-input"
      />

      <button
        class="btn-save"
        @click="saveLimit"
        :disabled="loading"
      >
        {{ loading ? "Salvando..." : "Salvar" }}
      </button>
    </div>

    <p v-if="successMessage" class="success">
      {{ successMessage }}
    </p>
  </div>
</template>

<script>
import monthlyLimitService from "../services/monthlyLimitService";

export default {
  name: "CardMonthlyLimit",

  props: {
    selectedMonth: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      limitAmount: 0,
      successMessage: "",
      loading: false
    };
  },

  computed: {
    formattedMonth() {
      const [year, month] = this.selectedMonth.split("-");
      return `${month}/${year}`;
    }
  },

  watch: {
    selectedMonth: {
      immediate: true,
      handler() {
        this.loadLimit();
      }
    }
  },

  methods: {
    async loadLimit() {
      if (!this.selectedMonth) return;

      const [year, month] = this.selectedMonth.split("-");

      try {
        const response = await monthlyLimitService.get(year, month);
        this.limitAmount = response.data?.limitAmount || 0;
      } catch {
        this.limitAmount = 0;
      }
    },

    async saveLimit() {
      const [year, month] = this.selectedMonth.split("-");
      this.loading = true;

      try {
        await monthlyLimitService.set(year, month, this.limitAmount);
        this.successMessage = "Limite salvo!";
        setTimeout(() => (this.successMessage = ""), 2000);

        this.$emit("limit-updated");
      } catch (error) {
        console.error("Erro ao salvar limite:", error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.limit-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h4 {
  margin: 0;
  font-weight: 600;
}

.month-label {
  font-size: 0.85rem;
  color: #6B7280;
}

.limit-content {
  display: flex;
  gap: 0.8rem;
}

.limit-input {
  flex: 1;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
}

.limit-input:focus {
  outline: none;
  border-color: #22C55E;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
}

.btn-save {
  background: #22C55E;
  color: white;
  border: none;
  padding: 0 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-save:hover {
  background: #16A34A;
}

.success {
  margin-top: 0.8rem;
  color: #22C55E;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>