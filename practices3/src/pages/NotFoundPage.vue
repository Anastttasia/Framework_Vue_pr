<template>
  <div class="fullscreen flex flex-center bg-grey-1">
    <div class="text-center">
      <div class="text-h1 text-weight-bold text-grey-5" style="font-size: 120px">
        404
      </div>

      <div class="text-h5 text-grey-7 q-mb-md">
        Страница не найдена
      </div>

      <div class="text-body1 text-grey-6 q-mb-lg">
        Кажется, такой страницы не существует
      </div>

      <q-btn
        label="На главную"
        color="primary"
        icon="home"
        unelevated
        size="lg"
        to="/"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>