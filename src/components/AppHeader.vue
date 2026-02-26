<template>
  <header class="app-header">
    <div class="header-content">
      <div class="brand" @click="$router.push('/')">
        <div class="logo-wrapper">
          <img src="../assets/logo.png" alt="Logo BudgetFlow" />
        </div>
        <div class="brand-text">
          <span class="app-name">BudgetFlow</span>
          <span class="tagline">Controle financeiro inteligente</span>
        </div>
      </div>

      <nav class="nav-actions">
        <button
          class="nav-btn"
          :class="{ active: $route.path === '/' }"
          @click="$router.push('/')"
        >
          Dashboard
        </button>

        <button
          class="nav-btn"
          :class="{ active: $route.path === '/limite' }"
          @click="$router.push('/limite')"
        >
          Limite Mensal
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;

  backdrop-filter: blur(12px);
  background: linear-gradient(
    90deg,
    rgba(39, 174, 96, 0.08),
    rgba(255, 255, 255, 0.95)
  );

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* BRAND */

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.logo-wrapper {
  height: 45px;
  width: 45px;
  background: linear-gradient(135deg, #27AE60, #2ECC71);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 15px rgba(39, 174, 96, 0.3);
}

.logo-wrapper img {
  height: 28px;
  width: 28px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.app-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1f2937;
}

.tagline {
  font-size: 0.75rem;
  color: #6b7280;
}

/* NAV */

.nav-actions {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background-color: rgba(39, 174, 96, 0.1);
  color: #27AE60;
}

.nav-btn.active {
  background-color: #27AE60;
  color: white;
  box-shadow: 0 4px 10px rgba(39, 174, 96, 0.3);
}
</style>