<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            v-if="$route.fullPath.includes('/users')"
            v-go-back="'/'"
            icon="arrow_back"
            flat
            dense
            label="back"
          />
        </div>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
      <q-btn
        v-if="!tasks.userDetails.userId"
        to="/auth"
        class="absolute-right"
        icon="account_circle"
        flat
        dense
        label="Connexion"
      />
      <q-btn
        v-else
        @click="logoutUser"
        class="absolute-right"
        icon="account_circle"
        flat
        dense
        label="Déconnexion"
      />

    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  //  import {openURL} from 'quasar'
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState(['tasks']),
      title() {
        let currentPath = this.$route.fullPath;
        if (currentPath == '/') return 'Todo';
        else if (currentPath == '/auth') return 'Authentification';
        else if (currentPath == '/users') return 'Users'
      },
    },
    methods: {
      ...mapActions(['logoutUser'])
    }

//    method: {
//      openURL
//    }
  }
</script>
