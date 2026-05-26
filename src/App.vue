<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
}

body {
  font-family: 'ABeeZee', 'Abel', sans-serif;
  background: #FAFAFA;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>