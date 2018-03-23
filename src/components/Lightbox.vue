<script>
  import { mapState, mapActions } from 'vuex'

  import {
    ModernTouch,
    PlainOldPlayer
  } from './Modals';

  const template = `
    <div class="vimeography-lightbox">
      <modal
        :name="this.modalId"
        width="50%"
        height="auto"
        :scrollable="true"
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

  const Lightbox = {
    name: 'lightbox',
    props: ['layout'],
    template,
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
