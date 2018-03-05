<script>
  import { mapState, mapActions } from 'vuex'

  import { Player } from './Player.vue';

  const template = `
    <div class="vimeography-lightbox">
      <modal
        :name="this.modalId"
        width="50%"
        height="auto"
        :scrollable="true"
        classes="vimeography-modal"
      >
        <div class="vimeography-controls" @click="$modal.hide(modalId)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="16" y1="4" x2="4" y2="16"></line><line x1="4" y1="4" x2="16" y2="16"></line></svg>
        </div>

        <player :activeVideo="this.activeVideo"></player>

        <div class="vimeography-downloads" v-if="this.allowDownloads">
          <a :href="this.downloadLink" :title="'Download' + this.activeVideo.name">Download this video</a>
        </div>
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

        if (videoId && gallery && parseInt(gallery) === this.galleryId) {
          this.$modal.show(this.modalId);
          this.loadVideo(videoId)
        }
      }
    },
    mounted: function() {
      const videoId = this.$route.query.vimeography_video;
      const gallery = this.$route.query.vimeography_gallery;

      if (videoId && gallery && parseInt(gallery) === this.galleryId) {
        this.$modal.show(this.modalId);
        this.loadVideo(videoId)
      }
    },
    computed: {
      ...mapState({
        activeVideo: state => state.videos.items[state.videos.active],
        activeTheme: state => state.gallery.theme,
        galleryId: state => state.gallery.id,
        pro: state => state.gallery.pro,
        allowDownloads: state => state.gallery.settings.downloads.enabled
      }),
      modalId() {
        return 'vimeography-' + this.activeTheme + '-' + this.galleryId
      },
      downloadLink() {
        return this.activeVideo.download.filter( d => d.quality == "hd" )[0].link || '#'
      },
      tags() {
        return this.activeVideo.tags.map(tag => tag.name).join(', ')
      }
    },
    components: {
      Player
    }
  }

  export default Lightbox;
</script>

<style lang="scss" scoped>
  .vimeography-modal {
    background-color: white;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
    transition: top 0.2s ease;
    overflow: visible;
  }

  /deep/ .vimeography-player-container {
    margin: 0;
  }

  .vimeography-controls {
    position: absolute;
    top: -16px;
    right: -16px;
    cursor: pointer;
    background-color: #333;
    z-index: 1;
    border-radius: 50%;
    padding: 3px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    border: 2px solid #fff;

    &:hover {
      background-color: #444;
    }

    svg {
      display: block;
      stroke: #fff;
    }
  }
</style>
