<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: 'my-input'
}
</script>
<script setup>
defineProps({
    modelValue: [String, Number]
});

const emit = defineEmits(['update:modelValue']);

function updateInput(e) {
    emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
.input {
    border: 1px solid teal;
    padding: 10px 15px;
    margin: 0;
    margin-top: 15px;
    width: -webkit-fill-available;
}
</style>