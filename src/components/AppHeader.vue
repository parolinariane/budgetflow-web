<template>
  <header class="app-header">
    <div class="header-container">

      <div class="brand">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
        <span>BudgetFlow</span>
      </div>

      <nav class="nav-menu">
        <router-link to="/" class="nav-item">
          Home
        </router-link>

        <router-link to="/limite" class="nav-item">
          Limite Mensal
        </router-link>
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
  width: 100%;
  background: #22C55E;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0 2rem;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;

  position: relative;
  display: flex;
  align-items: center;
}

/* BRAND */

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.5px;
}

.logo {
  height: 100px;
  width: 100px;
  object-fit: contain;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.50));
}

/* NAV MENU */

.nav-menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 2.5rem;
}

.nav-item {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  padding: 0.5rem 0;
  transition: 0.2s;
  letter-spacing: -0.2px;
}

/* Hover */
.nav-item:hover {
  color: white;
}

/* Active underline */
.nav-item.router-link-active {
  color: white;
}

.nav-item.router-link-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 2px;
}
</style>