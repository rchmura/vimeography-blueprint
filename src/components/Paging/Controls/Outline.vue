<script>
  import Spinner from 'vue-simple-spinner'
  import { mapState, mapActions } from 'vuex'

  const template = `
    <div v-if="shouldShowPagingControls">
      <spinner size="small" v-show="this.loading"></spinner>
      <div class="vimeography-paging">
        <div class="vimeography-paging-icon" v-bind:class="{ 'vimeography-paging-disabled': !paging.first }" v-on:click="paginate( paging.first )">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rewind"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
        </div>
        <div class="vimeography-paging-icon" v-bind:class="{ 'vimeography-paging-disabled': !paging.previous }" v-on:click="paginate( paging.previous )">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="20 3 6 13 20 21 20 3"></polygon></svg>
        </div>
        <div class="vimeography-paging-text">
          Page {{paging.page}} of {{paging.last}}
        </div>
        <div class="vimeography-paging-icon" v-bind:class="{ 'vimeography-paging-disabled': !paging.next }" v-on:click="paginate( paging.next )">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
        <div class="vimeography-paging-icon" v-bind:class="{ 'vimeography-paging-disabled': !paging.last }" v-on:click="paginate( paging.last )">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-fast-forward"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
        </div>
      </div>
    </div>
  `;

  const Outline = {
    name: 'paging-controls',
    template,
    components: {
      Spinner
    },
    methods: {
      ...mapActions([
        'loadVideo',
        'paginate'
      ]),
    },
    watch: {
      '$route' (to, from) {
        const videoId = to.query.vimeography_video;
        const gallery = to.query.vimeography_gallery;
      }
    },
    computed: {
      ...mapState({
        activeVideo: state => state.videos.items[state.videos.active],
        galleryId: state => state.gallery.id,
        pro: state => state.gallery.pro,
        loading: state => state.videos.loading
      }),
      shouldShowPagingControls() {
        return this.pro && this.paging.last > 1;
      },
      paging() {
        return this.$store.getters.paging
      }
    },
  }

  export default Outline;
</script>

<style lang="scss" scoped>
  .vimeography-paging {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;

    .vimeography-paging-icon {
      cursor: pointer;
      height: 24px;
      flex: 0 1 30px;

      svg {
        display: block;
        stroke: #555;

        &:hover {
          stroke: #444;
          stroke-width: 2px;
        }
      }
    }

    .vimeography-paging-text {
      padding: 0 0.7rem;
      font-size: 1rem;
      font-weight: 400;
    }
  }
</style>
