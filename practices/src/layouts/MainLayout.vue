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
          <q-breadcrumbs class="text-white" active-color="white">
            <q-breadcrumbs-el
              v-for="(crumb, index) in breadcrumbs"
              :key="index"
              :label="crumb.label"
              :icon="crumb.icon"
              :to="crumb.to"
              :class="{ 'text-white': true, 'text-weight-bold': index === breadcrumbs.length - 1 }"
            />
          </q-breadcrumbs>
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

        <template v-if="userStore.isAuthenticated">
          <q-item clickable v-ripple to="/settings" exact>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Настройки</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
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
              <q-btn flat dense round icon="logout" @click.stop="handleLogout" />
            </q-item-section>
          </q-item>
        </template>

        <q-item v-else clickable v-ripple to="/login">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Войти</q-item-label>
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
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUiStore } from '../stores/uiStore'
import { useUserStore } from '../stores/userStore'

interface Breadcrumb {
  label: string
  icon?: string
  to?: string
}

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const uiStore = useUiStore()
    const userStore = useUserStore()
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()

    watch(() => uiStore.theme, (val) => {
      $q.dark.set(val === 'dark')
    }, { immediate: true })

    const drawerModel = computed({
      get: () => uiStore.drawerOpen,
      set: (val: boolean) => uiStore.setDrawer(val)
    })

    const breadcrumbMap: Record<string, Breadcrumb> = {
      index: { label: 'Мои задачи', icon: 'list', to: '/' },
      create: { label: 'Добавить задачу', icon: 'add_circle_outline' },
      settings: { label: 'Настройки', icon: 'settings' }
    }

    const breadcrumbs = computed<Breadcrumb[]>(() => {
      const name = route.name as string
      const current = breadcrumbMap[name]
      if (!current) return [{ label: 'Мои задачи', to: '/' }]
      return name === 'index'
        ? [current]
        : [breadcrumbMap.index, current]
    })

    const handleLogout = () => {
      userStore.logout()
      router.push('/login')
    }

    return {
      uiStore,
      userStore,
      drawerModel,
      breadcrumbs,
      handleLogout
    }
  }
})
</script>