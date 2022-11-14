import { createRouter, createWebHistory } from 'vue-router';

import Main from '@/pages/Main.vue';
import PostPage from '@/pages/PostPage.vue';
import About from '@/pages/About.vue';
import PostSinglePage from '@/pages/PostSinglePage.vue';
import PostPageWithStore from '@/pages/PostPageWithStore.vue';

const routes = [
    { path: '/', component: Main },
    { path: '/posts', component: PostPage },
    { path: '/about', component: About },
    { path: '/posts/:id', component: PostSinglePage },
    { path: '/store', component: PostPageWithStore }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;