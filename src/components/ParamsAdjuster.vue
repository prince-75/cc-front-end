<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- 模型规模调整 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <h2 class="text-xl font-semibold mb-6 text-primary flex items-center">
          <scale-icon class="h-6 w-6 mr-2 text-primary" />
          模型规模
        </h2>
        <div class="space-y-4">
          <n-form-item label="张量并行(TP)" path="model_tp">
            <n-input-number
              v-model:value="modelParams.model_tp"
              :min="1"
              class="w-full"
              placeholder="请输入TP值"
            />
          </n-form-item>
          <n-form-item label="数据并行(DP)" path="model_dp">
            <n-input-number
              v-model:value="modelParams.model_dp"
              :min="1"
              class="w-full"
              placeholder="请输入DP值"
            />
          </n-form-item>
          <n-form-item label="流水线并行(PP)" path="model_pp">
            <n-input-number
              v-model:value="modelParams.model_pp"
              :min="1"
              class="w-full"
              placeholder="请输入PP值"
            />
          </n-form-item>
        </div>
      </div>

      <!-- 训练集群规模 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <h2 class="text-xl font-semibold mb-6 text-primary flex items-center">
          <server-icon class="h-6 w-6 mr-2 text-primary" />
          集群规模
        </h2>
        <div class="space-y-4">
          <n-form-item label="GPU数量" path="cluster_gpu_count">
            <n-input-number
              v-model:value="clusterParams.cluster_gpu_count"
              :min="1"
              class="w-full"
              placeholder="请输入GPU数量"
            />
          </n-form-item>
          <n-form-item label="单卡显存(GB)" path="cluster_gpu_memory">
            <n-input-number
              v-model:value="clusterParams.cluster_gpu_memory"
              :min="1"
              class="w-full"
              placeholder="请输入显存大小"
            />
          </n-form-item>
          <n-form-item label="总内存(GB)" path="cluster_total_memory">
            <n-input-number
              v-model:value="clusterParams.cluster_total_memory"
              :min="1"
              class="w-full"
              placeholder="请输入总内存"
            />
          </n-form-item>
          <n-form-item label="计算力(TFLOPS)" path="cluster_compute_power">
            <n-input-number
              v-model:value="clusterParams.cluster_compute_power"
              :min="1"
              class="w-full"
              placeholder="请输入计算力"
            />
          </n-form-item>
        </div>
      </div>

      <!-- 模型信息 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <h2 class="text-xl font-semibold mb-6 text-primary flex items-center">
          <cpu-chip-icon class="h-6 w-6 mr-2 text-primary" />
          模型信息
        </h2>
        <div class="space-y-4">
          <n-form-item label="模型名称" path="model_name">
            <n-input
              v-model:value="modelInfo.model_name"
              class="w-full"
              placeholder="请输入模型名称"
            />
          </n-form-item>
          <n-form-item label="版本号" path="model_version">
            <n-input
              v-model:value="modelInfo.model_version"
              class="w-full"
              placeholder="请输入版本号"
            />
          </n-form-item>
          <n-form-item label="参数量" path="model_parameters">
            <n-input-number
              v-model:value="modelInfo.model_parameters"
              :min="1"
              class="w-full"
              placeholder="请输入参数量"
            />
          </n-form-item>
          <n-form-item label="训练轮数" path="training_epochs">
            <n-input-number
              v-model:value="modelInfo.training_epochs"
              :min="1"
              class="w-full"
              placeholder="请输入训练轮数"
            />
          </n-form-item>
          <n-form-item label="批量大小" path="batch_size">
            <n-input-number
              v-model:value="modelInfo.batch_size"
              :min="1"
              class="w-full"
              placeholder="请输入批量大小"
            />
          </n-form-item>
          <n-form-item label="学习率" path="learning_rate">
            <n-input-number
              v-model:value="modelInfo.learning_rate"
              :min="0"
              :precision="6"
              class="w-full"
              placeholder="请输入学习率"
            />
          </n-form-item>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="mt-8 flex justify-center">
      <n-button
        type="primary"
        size="large"
        :loading="isSubmitting"
        @click="handleSubmit"
        class="px-8 py-2 text-lg transform transition-all duration-300 hover:scale-105"
      >
        提交参数
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  ScaleIcon, 
  ServerIcon, 
  CpuChipIcon 
} from '@heroicons/vue/24/outline'
import { 
  useMessage, 
  NButton, 
  NFormItem, 
  NInput, 
  NInputNumber 
} from 'naive-ui'

const message = useMessage()

const modelParams = reactive({
  model_tp: 2,
  model_dp: 4,
  model_pp: 3
})

const clusterParams = reactive({
  cluster_gpu_count: 8,
  cluster_gpu_memory: 2,
  cluster_total_memory: 512,
  cluster_compute_power: 100
})

const modelInfo = reactive({
  model_name: 'GPT3.0',
  model_version: '1.0.0',
  model_parameters: 175000,
  training_epochs: 5,
  batch_size: 32,
  learning_rate: 0.001
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!modelInfo.model_name || !modelInfo.model_version) {
    message.error('请填写模型名称和版本号')
    return
  }

  isSubmitting.value = true
  try {
    // 这里添加提交逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    message.success('参数提交成功')
    console.log('提交的参数：', {
      modelParams,
      clusterParams,
      modelInfo
    })
  } catch (error) {
    message.error('提交失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.n-input-number {
  width: 100%;
}

.n-form-item {
  margin-bottom: 1rem;
}
</style> 