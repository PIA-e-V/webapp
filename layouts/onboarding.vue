<template>
  <div id="onboarding">
    <img src="/logo.png" alt="Logo">

    <Nuxt />
  </div>
</template>

<style lang="postcss" scoped>
#onboarding {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background: #343E94;
}

#onboarding img:first-child {
  width: min(90%, 300px);

  @apply block mx-auto pt-5
}
</style>
