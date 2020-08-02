<style lang="scss">
  @import 'src/sass/variables.scss';
</style>

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item to="/users" link>
          <v-list-item-action>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>User Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/settings" link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="router-link-default" to="/">
          nDO : n-dependent Dynamic Objects
        </router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
        style="align-items: start"
      >
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <span>nDO &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
