import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
import ProductCreate from '../components/product/ProductCreate.vue'
import ProductList from '../components/product/ProductList.vue'
import ProductEdit from '../components/product/ProductEdit.vue'


  const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'Login', component: Login },
        { path: '/list', name: 'ProductList', component: ProductList },
        { path: '/create', name: 'ProductCreate', component: ProductCreate },
        { path: '/edit/:id', name: 'ProductEdit', component: ProductEdit },
    ]
  });


  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('user_auth_token');
    
    if (!token && to.name !== 'Login') {
      return next({ name: 'Login' });
    }
  
    next();
  });

export default router