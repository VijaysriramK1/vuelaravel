<template>
       <div class="container mt-5">
        <div class="mx-auto" style="width: 30%;">
          <div class="card">
            <div class="card-body">
              <div v-if="globalError" class="alert alert-danger mt-2 mb-2">{{ globalError }}</div>
                <div>
                  <label class="form-label">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.email"
                  />
                  <div v-if="errors.email" class="text-danger mt-1">
                     <div v-for="(error, index) in errors.email" :key="index" class="mt-1">{{ error }}</div>
                  </div>
              </div>

              <div class="mt-3">
                  <label class="form-label">Password</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.password"
                  />
                  <div v-if="errors.password" class="text-danger mt-1">
                     <div v-for="(error, index) in errors.password" :key="index" class="mt-1">{{ error }}</div>
                  </div>
              </div>

                <div class="d-grid gap-2 mt-3">
                  <button class="btn btn-primary" @click="submitForm">Submit</button>
                </div>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
      data() { 
          return {
              form: {
                email: '',
                password: '',
              },
              errors: {},
              globalError: '',
          };
  
      },
      mounted() {},
      methods: {
        async submitForm() {
        try {
          const response = await this.$axios.post('login', this.form);
          localStorage.setItem('user_auth_token', response.data.token);
          this.$router.push('/list');
        } catch (error) {
          if (error.response.status === 422) {
             this.globalError = '';
             this.errors = error.response.data.errors || {};
          } else if (error.response.status === 403 || error.response.status === 404) {
            this.errors = {};
            this.globalError = error.response.data.message || '';
          } else {}
        }
      },
  
      },
      
  };
  </script>
  
  <style scoped>
  
  </style>