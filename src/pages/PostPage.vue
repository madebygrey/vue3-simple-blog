<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Search" />
        <div class="app__buttons">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <PostForm @create="createPost" />
        </my-dialog>
        <PostList :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
        <div class="page" v-for="pageNumber in totalPages" :key="pageNumber" :class="{
          'current-page': page === pageNumber
        }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
      </div> -->
    </div>
</template>
  
<script setup>
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

const posts = ref([])
const dialogVisible = ref(false)
const isPostLoading = ref(false)
const selectedSort = ref('')
const searchQuery = ref('')
const sortOptions = ref([
    { value: 'title', name: 'По названию' },
    { value: 'body', name: 'По содержимому' }
])
const page = ref(1)
const limit = ref(10)
const totalPages = ref(0)

function createPost(post) {
    posts.value.push(post);
    dialogVisible.value = false;
}
function removePost(post) {
    posts.value = posts.value.filter(p => p.id !== post.id);
}
function showDialog() {
    dialogVisible.value = true;
}
// function changePage(pageNumber) {
//   page.value = pageNumber;
// }
async function fetchPosts() {
    try {
        isPostLoading.value = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _page: page.value,
                _limit: limit.value
            }
        });
        totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
        posts.value = response.data;
        isPostLoading.value = false;
    } catch {
        alert('Error')
    }
}
async function loadMorePosts() {
    try {
        page.value += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _page: page.value,
                _limit: limit.value
            }
        });
        totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
        posts.value = [...posts.value, ...response.data]
        isPostLoading.value = false;
    } catch {
        alert('Error')
    }
}

const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => {
        return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    })
});

const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
});

// watch(page, () => {
//   fetchPosts();
// });

onMounted(() => {
    fetchPosts();
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