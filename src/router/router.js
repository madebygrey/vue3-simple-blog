import { createRouter, createWebHistory } from 'vue-router';

import Main from '@/pages/Main.vue';
import PostPage from '@/pages/PostPage.vue';
import About from '@/pages/About.vue';
import PostSinglePage from '@/pages/PostSinglePage.vue';
import PostPageWithStore from '@/pages/PostPageWithStore.vue';

const routes = [
    { path: '/vue3-simple-blog/', component: Main },
    { path: '/vue3-simple-blog/posts', component: PostPage },
    { path: '/vue3-simple-blog/about', component: About },
    { path: '/vue3-simple-blog/posts/:id', component: PostSinglePage },
    { path: '/vue3-simple-blog/store', component: PostPageWithStore }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;