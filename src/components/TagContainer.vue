<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Tag from './Tag.vue';

const template = `
  <div class="vimeography-tag-container">
    <tag v-for="tag in tags" :key="tag.name" :name="tag.name" :canonical="tag.canonical" :total="tag.total"></tag>
  </div>
`;

const TagContainer = {
  template,
  computed: mapState({
    tags: state => state.gallery.tags,
    galleryId: state => state.gallery.id,
    tagsEnabled: state => state.gallery.settings.tags.enabled
  }),
  components: {
    Tag,
  },
  methods: {
    ...mapActions([
      'performSearch'
    ]),
    ...mapGetters([
      'getVideosByTag'
    ]),
    clearRoute (event) {
      this.$router.push(window.location.pathname);
    },
  },
  watch: {
    '$route' (to, from) {
      const tag = to.query.vimeography_tag;
      const gallery = to.query.vimeography_gallery;

      if (tag && gallery && gallery == this.galleryId) {
        this.performSearch(tag);
      }
    }
  },
  mounted: function() {
    const tag = this.$route.query.vimeography_tag;
    const gallery = this.$route.query.vimeography_gallery;

    if (tag && gallery && gallery == this.galleryId) {
      this.performSearch(tag);
    }
  }
}

export default TagContainer;
</script>

<style lang="scss" scoped>
  .container {
    flex: 1;
  }
</style>