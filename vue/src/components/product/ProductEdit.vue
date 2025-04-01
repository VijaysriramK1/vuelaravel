<template>
    <Header />
    <div class="container mt-5" style="margin-bottom: 100px;">
     <div class="mx-auto" style="width: 30%;">
       <div class="card">
         <div class="card-body">
             <div>
               <label class="form-label">Product Name</label>
               <input
                 type="text"
                 class="form-control"
                 v-model="form.name"
               />
               <div v-if="errors.name" class="text-danger mt-1">
                  <div v-for="(error, index) in errors.name" :key="index" class="mt-1">{{ error }}</div>
               </div>
           </div>

             <div class="mt-3">
                 <label class="form-label">Years</label>
                 <multiselect v-model="form.years" :options="years" :multiple="true" :close-on-select="false" placeholder="Select years"></multiselect>
                 <div v-if="errors.years" class="text-danger mt-1">
                  <div v-for="(error, index) in errors.years" :key="index" class="mt-1">{{ error }}</div>
               </div>
             </div>

             <div class="mt-3">
               <label class="form-label">Product Image</label>
               <input
                 id="product-image"
                 class="form-control"
                 type="file"
                 accept="image/*"
                 @change="imageUpload"
               />
             </div>

             <div v-if="imagePreview" class="mt-3 position-relative">
               <button type="button" class="btn-close position-absolute top-0 end-0" aria-label="Close" @click="clearImage"></button>
               <img :src="imagePreview" alt="Preview" style="max-width: 100%; height: auto;" />
             </div>

             <div v-if="errors.image" class="text-danger mt-1">
                <div v-for="(error, index) in errors.image" :key="index" class="mt-1">{{ error }}</div>
             </div>

             <div class="mt-3">
               <input
                 class="form-check-input"
                 type="checkbox"
                 v-model="form.status"
               />
               <label class="form-check-label ms-2">
                   {{ form.status ? 'Active' : 'Deactive' }}
               </label>
             </div>
             <div class="d-grid gap-2 mt-3">
               <button class="btn btn-primary" @click="submitForm">Submit</button>
             </div>
         </div>
       </div>
     </div>
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
           form: {
             name: '',
             years: [],
             image: null,
             status: true,
           },
           years: [],
           imagePreview: null,
           errors: {},
       };

   },
   mounted() {
       this.generateYears();
       this.getProduct();
   },
   methods: {
    async getProduct() {
        const productId = this.$route.params.id;
        const response = await this.$axios.get(`get-product/${productId}`);
        this.form.name = response.data.name;
        this.form.years = response.data.years;
        this.form.status = response.data.status;
        this.imagePreview = response.data.image;
    },
    
    generateYears() {
     const currentYear = new Date().getFullYear();
       for (let i = currentYear; i >= currentYear - 20; i--) {
         this.years.push(i);
       }
   },

   imageUpload(event) {
     const file = event.target.files[0];
     this.form.image = file;
     if (file) {
       this.imagePreview = URL.createObjectURL(file);
     } else {
       this.imagePreview = null;
     }
   },

   clearImage() {
     this.imagePreview = null;
     this.form.image = null;
     document.getElementById('product-image').value = '';
   },

   async submitForm() {
     try {
       const formData = new FormData();
       formData.append('id', this.$route.params.id);
       formData.append('name', this.form.name);
       formData.append('status', this.form.status ? 1 : 0);

       this.form.years.forEach((year, index) => {
           formData.append(`years[${index}]`, year);
       });

       if (this.form.image) {
          formData.append('image', this.form.image);
       }

       await this.$axios.post('product-update', formData, {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
       });
       this.$router.push('/list');
     } catch (error) {
       if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors || {};
       }
     }
   },

   },
   
};
</script>

<style scoped>

</style>