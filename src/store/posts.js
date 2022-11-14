import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const usePostsStore = defineStore('posts', () => {
  const store = usePostsStore();
  const posts = ref([])
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

  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => {
      return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    })
  });

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  });

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

  return { store, posts, isPostLoading, selectedSort, searchQuery, sortOptions, page, limit, totalPages, sortedPosts, sortedAndSearchedPosts, fetchPosts, loadMorePosts }
})