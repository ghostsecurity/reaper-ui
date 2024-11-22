<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center border-b px-6 py-4">
      <h1 class="text-xl font-bold">Settings</h1>
    </div>
    <div class="flex-1 space-y-8 overflow-auto p-6">
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">OpenAI Configuration</h2>
        <div class="space-y-4">
          <div class="grid gap-2">
            <Label for="apiKey">API Key</Label>
            <div class="relative">
              <Input 
                :type="showApiKey ? 'text' : 'password'"
                id="apiKey"
                v-model="apiKey"
                placeholder="Enter your OpenAI API key"
              />
              <button 
                @click="showApiKey = !showApiKey"
                class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                <Icon 
                  :icon="showApiKey ? 'lucide:eye-off' : 'lucide:eye'"
                  class="size-4"
                />
              </button>
            </div>
          </div>

          <div class="grid gap-2">
            <Label for="model">Model</Label>
            <Select id="model" v-model="selectedModel">
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Models</SelectLabel>
                  <SelectItem value="gpt-4o">GPT-4 Optimized</SelectItem>
                  <SelectItem value="gpt-4o-mini">GPT-4 Optimized Mini</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button 
            @click="saveSettings"
            class="mt-4"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </Button>

          <div v-if="openAIStore.errors" class="mt-2 text-sm text-red-500">
            {{ openAIStore.errors }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useOpenAIStore } from '../stores/openai'

const openAIStore = useOpenAIStore()
const showApiKey = ref(false)
const apiKey = ref('')
const selectedModel = ref('gpt-4o')
const saving = ref(false)

const saveSettings = async () => {
  saving.value = true
  try {
    await openAIStore.updateSettings(apiKey.value, selectedModel.value)
  } catch (error) {
    console.error('Failed to save settings:', error)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  openAIStore.getSettings()
  apiKey.value = openAIStore.apiKey
  selectedModel.value = openAIStore.model
})
</script>
