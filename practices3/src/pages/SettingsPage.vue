<template>
  <q-page class="q-pa-md">
    <div class="text-h4 text-weight-bold q-mb-md">Настройки</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Профиль</div>

        <q-item>
          <q-item-section avatar>
            <q-icon name="account_circle" size="48px" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ userStore.username || 'Гость' }}</q-item-label>
            <q-item-label caption>{{ userStore.currentUser?.email }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Настройки приложения</div>

        <q-select
          v-model="languageModel"
          :options="languageOptions"
          label="Язык"
          outlined
          class="q-mb-md"
          emit-value
          map-options
        />

        <q-input
          v-model.number="itemsPerPageModel"
          label="Задач на странице"
          type="number"
          outlined
          :min="5"
          :max="50"
          class="q-mb-md"
        />

        <q-toggle
          v-model="showCompletedModel"
          label="Показывать выполненные задачи"
          left-label
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Сбросить"
          color="secondary"
          flat
          @click="resetSettings"
        />
        <q-btn
          label="Сохранить"
          color="primary"
          unelevated
          @click="saveSettings"
        />
      </q-card-actions>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">Статистика</div>

        <q-item>
          <q-item-section>
            <q-item-label>Всего задач</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-weight-bold">{{ todoCounts.total }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Активных</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-weight-bold text-primary">{{ todoCounts.active }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Выполненных</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-weight-bold text-positive">{{ todoCounts.done }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useTodoStore } from '../stores/todoStore'
import { useUiStore } from '../stores/uiStore'

const router = useRouter()
const userStore = useUserStore()
const todoStore = useTodoStore()
const uiStore = useUiStore()

const languageOptions = [
  { label: 'Русский', value: 'ru' },
  { label: 'English', value: 'en' }
]

const languageModel = ref(userStore.userSettings.language)
const itemsPerPageModel = ref(userStore.userSettings.itemsPerPage)
const showCompletedModel = ref(userStore.userSettings.showCompleted)
const todoCounts = computed(() => todoStore.todoCounts)

watch(() => userStore.userSettings, (settings) => {
  languageModel.value = settings.language
  itemsPerPageModel.value = settings.itemsPerPage
  showCompletedModel.value = settings.showCompleted
}, { immediate: true })

function saveSettings(): void {
  userStore.updateSettings({
    language: languageModel.value,
    itemsPerPage: itemsPerPageModel.value,
    showCompleted: showCompletedModel.value
  })
  uiStore.addNotification('Настройки сохранены', 'positive')
}

function resetSettings(): void {
  userStore.resetSettings()
  uiStore.addNotification('Настройки сброшены', 'warning')
}
</script>