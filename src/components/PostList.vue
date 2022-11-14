<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <TransitionGroup name="post-list">
            <post-item v-for="post of posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
        </TransitionGroup>
    </div>
    <h2 style="color: red" v-else>Список постов пуст</h2>
</template>

<script setup>
import PostItem from '@/components/PostItem.vue';

defineProps({
    posts: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
.post-list-move,
/* apply transition to moving elements */
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.post-list-leave-active {
    position: absolute;
}
</style>