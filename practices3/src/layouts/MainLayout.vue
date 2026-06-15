<template>
  <q-layout view="hHh Lpr lFf">

    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="uiStore.toggleDrawer()"
        />

        <q-toolbar-title class="text-weight-bold">
          To Do App
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          :icon="uiStore.isDarkMode ? 'light_mode' : 'dark_mode'"
          @click="uiStore.toggleTheme()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerModel"
      show-if-above
      bordered
      side="left"
    >
      <q-list>
        <q-item-label header>
          Навигация
        </q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Задачи</q-item-label>
          </q-item-section>
        </q-item>


        <q-separator />

        <q-item-label header>
          Пользователь
        </q-item-label>

        <q-item v-if="!userStore.isAuthenticated" clickable v-ripple @click="mockLogin">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Войти</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-else clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ userStore.username }}</q-item-label>
            <q-item-label caption>
              {{ userStore.userSettings.language === 'ru' ? 'Русский' : 'English' }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat dense round icon="logout" @click.stop="userStore.logout()" />
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useUiStore } from '../stores/uiStore'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const uiStore = useUiStore()
    const userStore = useUserStore()
    const $q = useQuasar()

    watch(() => uiStore.theme, (val) => {
      $q.dark.set(val === 'dark')
    }, { immediate: true })

    const drawerModel = computed({
      get: () => uiStore.drawerOpen,
      set: (val: boolean) => uiStore.setDrawer(val)
    })

    const mockLogin = async () => {
      const success = await userStore.login('admin', 'admin')
      if (success) {
        uiStore.addNotification('Вход выполнен успешно', 'positive')
      } else {
        uiStore.addNotification('Ошибка входа', 'negative')
      }
    }

    return {
      uiStore,
      userStore,
      drawerModel,
      mockLogin
    }
  }
})
</script>