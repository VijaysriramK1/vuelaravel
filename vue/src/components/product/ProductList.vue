<template>
<Header />
  
    <div class="container mt-5" style="margin-bottom: 100px;">
       <div class="d-flex justify-content-end">
         <button class="btn btn-primary" @click="goToProductCreate">Create</button>
       </div>
    <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
            <td>{{ product.name }}</td>
            <td><img :src="product.image" alt="Product" style="max-width: 100px; height: auto;" /></td>
            <td><span class="badge" :class="product.status ? 'bg-success' : 'bg-danger'">{{ product.status ? 'Active' : 'Deactive' }}</span></td>
            <td>
            <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary" @click="editProduct(product.id)">Edit</button>
            <button class="btn btn-danger ms-md-2" @click="deleteProduct(product.id)">Delete</button>
            </div>
            </td>
          </tr>
    </tbody>
  </table>
 </div>
  <Footer />
</template>

<script>
import Header from '../template/Header.vue';
import Footer from '../template/Footer.vue';

export default {
    components: {
      Header,
      Footer,
    },
    data() {
        return {
            products: [], 
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const response = await this.$axios.get('get-product-list');
            this.products = response.data.data;
        },

        goToProductCreate() {
            this.$router.push('/create');
        },

        editProduct(productId) {
            this.$router.push(`/edit/${productId}`);
        },

        async deleteProduct(productId) {
             await this.$axios.delete(`product-delete/${productId}`);
             this.fetchProducts();
        },

    },
};

</script>

<style scoped>

</style>