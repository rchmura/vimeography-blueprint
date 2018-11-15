<script>
const template = `
  <router-link :to="query">
    <span class="vimeography-tag-name">{{name}}</span>
  </router-link>
`;

const Tag = {
  props: ['name', 'canonical', 'total'],
  template,
  computed: {
    query() {
      const q = {
        ...this.$route.query,
        vimeography_gallery: this.$store.state.gallery.id,
        vimeography_tag: this.canonical
      };

      delete q.vimeography_video;

      return '?' + Object.keys(q).map(k => k + '=' + encodeURIComponent(q[k])).join('&')
    },
  },
}

export default Tag;
</script>

<style lang="scss" scoped>
  a {
    background-color: #fff;
    border-radius: 30px;
    display: inline-block;
    font-weight: bold;
    text-decoration: none;
    border: 1px solid #eee;
    outline: none;
    color: #333;
    font-size: 12px;
    padding: 5px 12px;
    margin: 0 5px 10px 0;
  }

  .router-link-exact-active {
    background: #e9ecef;
  }
</style>
