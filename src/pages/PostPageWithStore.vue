<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model="store.searchQuery" placeholder="Поиск" />
        <div class="app__buttons">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="store.selectedSort" :options="store.sortOptions"></my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <PostForm @create="createPost" />
        </my-dialog>
        <PostList :posts="store.sortedAndSearchedPosts" @remove="removePost" v-if="!store.isPostLoading" />
        <div v-else>Идет загрузка...</div>
        <div v-intersection="store.loadMorePosts" class="observer"></div>
    </div>
</template>
  
<script setup>
import { ref, watch, computed } from 'vue';
import { onMounted } from 'vue';
import { usePostsStore } from '../store/posts';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

const store = usePostsStore();

const dialogVisible = ref(false);

function createPost(post) {
    store.posts.push(post);
    dialogVisible.value = false;
}
function removePost(post) {
    store.posts = store.posts.filter(p => p.id !== post.id);
}
function showDialog() {
    dialogVisible.value = true;
}

onMounted(() => {
    store.fetchPosts();
})


</script>
  
<style scoped>
.app__buttons {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}

.page__wrapper {
    display: flex;
    margin: 20px;
}

.page {
    border: 1px solid #000;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}

.observer {
    height: 30px;
    background: teal;
}
</style>