<template>
  <q-form @submit="submitForm">
    <div class="q-pa-xl">
      <q-input
        class="q-mb-md"
        v-if="tab == 'register'"
        v-model="formData.name"
        color="primary"
        label="Name">
      </q-input>
      <q-input
        class="q-mb-md"
        v-model="formData.email"
        color="primary"
        label="Email"
        type="email">
      </q-input>
      <q-input
        class="q-mb-md"
        v-model="formData.password"
        color="primary"
        label="Password"
        type="password">
      </q-input>
      <div class="row">
        <q-space/>
        <q-btn color="white"
               text-color="black"
               :label="tab"
               type="submit"/>
      </div>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    props: ['tab'],
    data() {
      return {
        formData: [
          {
            id: 1,
            name: '',
            email: '',
            password: ''

          },

        ]
      }
    },
    methods: {
      ...mapActions(['registerUser', 'loginUser']),
      submitForm() {
        if (this.tab == 'login'){
          this.loginUser(this.formData)
        }else {
          this.registerUser(this.formData)
        }
      }
    }
  }
</script>
