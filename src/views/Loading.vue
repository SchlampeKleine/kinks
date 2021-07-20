<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    query: {
      type: String,

    },
  },
  setup(props) {
    const route = useRoute();

    console.log(props.query);

    console.log(route.hash);

    const store = useStore();

    return {
      hash: route.hash,
      loadKinks: (kinkString) => store.CurKinks.loadFromString(kinkString),
    };
  },
  data() {
    return {
      post: null,
      error: null,
    };
  },
  methods: {
    getPost() {
      return {
        post: 'POST',
      };
    },

    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // replace `getPost` with your data fetching util / API wrapper
      this.loadKinks(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    this.loadKinks(to.params.id, (err, post) => {
      next((vm) => vm.setData(err, post));
    });
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  async beforeRouteUpdate(to, from) {
    this.post = null;
    try {
      this.post = await this.loadKinks(to.params.id);
    } catch (error) {
      this.error = error.toString();
    }
  },
};

</script>
