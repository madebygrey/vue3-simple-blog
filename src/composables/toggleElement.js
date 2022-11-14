import { ref, onMounted, onUnmounted } from 'vue'

export function toggleElement() {
  defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show'])

  function hideDialog() {
    emit('update:show', false)
  }
  onMounted(() => {
    console.log(123);
  })
}