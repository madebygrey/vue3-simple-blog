<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input v-focus v-model="title" placeholder="Название" />
        <my-input v-model="body" placeholder="Описание" />
        <my-button style="align-self: flex-end; margin-top: 15px;" @click="createPost">Создать</my-button>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['create']);

const title = ref('');
const body = ref('');
let post = ref({});

function createPost() {
    post = {
        id: Date.now(),
        title: title.value,
        body: body.value
    };

    emit('create', post);
    title.value = '';
    body.value = '';
}

</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>