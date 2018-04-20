<script>
  require('es6-object-assign/auto'); // for IE11 when use vue-js-modal

  import { mapState, mapActions } from 'vuex'

  import {
    ModernTouch,
    PlainOldPlayer
  } from './Modals';

  const defaultTemplate = `
    <div class="vimeography-lightbox">
      <modal
        :name="this.modalId"
        :max-width="800"
        :scrollable="true"
        :adaptive="true"
        :reset="true"
        width="90%"
        height="auto"
        classes="vimeography-modal"
      >
        <component
          :is="layout"
          :modalId="this.modalId"
          :activeVideo="this.activeVideo"
          :nextVideoUrl="this.nextVideoUrl">
        </component>
      </modal>
    </div>
  `;

  const userTemplate = document.querySelector('#vimeography-component-lightbox');

  const Lightbox = {
    name: 'lightbox',
    props: ['layout'],
    template: userTemplate ? userTemplate.innerText : defaultTemplate,
    methods: {
      ...mapActions([
        'loadVideo',
      ]),
    },
    watch: {
      '$route' (to, from) {
        const videoId = to.query.vimeography_video;
        const gallery = to.query.vimeography_gallery;

        if (videoId && gallery && gallery == this.galleryId) {
          this.$modal.show(this.modalId);
          this.loadVideo(videoId)
        }
      }
    },
    mounted: function() {
      const videoId = this.$route.query.vimeography_video;
      const gallery = this.$route.query.vimeography_gallery;

      if (videoId && gallery && gallery == this.galleryId) {
        this.$modal.show(this.modalId);
        this.loadVideo(videoId)
      }
    },
    computed: {
      ...mapState({
        activeVideo: state => state.videos.items[state.videos.active],
        activeTheme: state => state.gallery.theme,
        galleryId: state => state.gallery.id,
      }),
      nextVideoUrl() {
        const nextVideoId = this.$store.getters.getAdjacentVideoId(this.activeVideo.id);

        const q = {
          ...this.$route.query,
          vimeography_gallery: this.galleryId,
          vimeography_video: nextVideoId
        };

        return '?' + Object.keys(q).map(k => k + '=' + encodeURIComponent(q[k])).join('&')
      },
      modalId() {
        return 'vimeography-' + this.activeTheme + '-' + this.galleryId
      },
      tags() {
        return this.activeVideo.tags.map(tag => tag.name).join(', ')
      }
    },
    components: {
      ModernTouch,
      PlainOldPlayer
    }
  }

  export default Lightbox;
</script>

<style lang="scss" scoped>
  /**
   * Note:
   *
   * If there is ever a modal that needs this to be
   * defined as overflow: hidden, you can change the modal
   * :classes property to be a dynamic class name based on the
   * layout passed in props and define multiple modal classes
   * below instead of just this one.
   */

  /deep/ .vimeography-modal {
    overflow: visible;
  }
</style>
