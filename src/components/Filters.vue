<script>
  import { mapActions, mapState } from 'vuex'
  import Search from './Search.vue';
  import TagContainer from './TagContainer.vue';

  const template = `
    <div class="vimeography-filters-container">  
      <tag-container v-if="this.tagsEnabled"></tag-container>
      <search v-if="this.searchEnabled"></search>
    </div>
  `;

  const Filters = {
    template,
    components: {
      TagContainer,
      Search
    },
    computed: {
      ...mapState({
        searchEnabled: state => state.gallery.settings.search.enabled,
        tagsEnabled: state => state.gallery.settings.tags.enabled,
      }),
    },
  }

  export default Filters;
</script>

<style lang="scss" scoped>
  .vimeography-filters-container {
    display: flex;
    justify-content: flex-end;
  }
</style>
