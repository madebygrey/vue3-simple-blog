<template>
    <select v-model="modelValue" @change="changeOption">
        <option disabled value="">Выберете из списка</option>
        <option 
        v-for="option of options" 
        :key="option.value"
        :value="option.value"
        >{{option.value}}</option>
    </select>
</template>

<script>
export default {
  name: 'my-select'
}
</script>
<script setup>
    defineProps({
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    });
    const emit = defineEmits(['update:modelValue']);

    function changeOption(event) {
        emit('update:modelValue', event.target.value);
    }
</script>

<style scoped>

</style>