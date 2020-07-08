<template>
  <div id="page-container">
    <b-navbar
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h3 class="title page-title">Emoji Builder</h3>
        </b-navbar-item>
      </template>
      <template slot="start">
        <nuxt-link
          class="navbar-item"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to.name"
        >{{ item.title }}</nuxt-link>
      </template>

      <!-- <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </b-navbar-item>
      </template>-->
    </b-navbar>

    <section class="main-content columns">
      <div class="column is-2"></div>
      <div class="container column is-8">
        <nuxt />
      </div>
      <div class="column is-2"></div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Emoji Builder</strong> by
          Patrick.
        </p>
      </div>

      <div class="content has-text-centered">
        <div class="credits center">
          <p>
            Copyright ©2020-{{new Date().getFullYear()}} |
            <n-link to="/privacy">Privacy Policy</n-link>|
            <n-link to="/sitemap">Sitemap</n-link>|
            <n-link to="/about">About</n-link>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "/" }
        },
        {
          title: "How To",
          icon: "home",
          to: { name: "how_to" }
        },
        {
          title: "Previous Creations",
          icon: "home",
          to: { name: "preview" }
        }
      ]
    };
  }
};
</script>

<style lang="scss" >
.page-title {
  color: white;
}
.main-content {
  margin-top: 2rem;
}

#page-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

html,
body,
#__nuxt,
#__layout {
  height: 100%;
  margin: 0;
}

.main-content {
  flex: 1 0;
}

.footer {
  flex: 0 1;
}
</style>
