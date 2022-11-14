<template>
    <div class="post">
        <div>
            <div><strong>ID:</strong> {{ post.id }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
            <my-button @click="$emit('remove', post)" style="margin-left: 15px">Удалить</my-button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    post: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>