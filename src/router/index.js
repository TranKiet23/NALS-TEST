import ListBlogs from '../views/ListBlogs.vue';
import ViewDetailBlogs from '../views/ViewDetailBlogs.vue'
import AddBlogs from '../views/AddBlogs.vue'


import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'blog',
    component: ListBlogs,
  },
  {
    path: '/new',
    name: 'AddBlogs',
    component: AddBlogs,
  
  },
  {
    path: '/:id/update',
    name: 'Update Blog',
    component: ViewDetailBlogs,
    meta: {
      breadcrumb: 'Update User',
      action: 'Update'
    }
  },
  {
    path: '/:id',
    component: ViewDetailBlogs,
    name: 'View Blog',
    meta: {
      breadcrumb: 'View Blog',
      action: 'View'
    }
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes
  });
  

export default router
