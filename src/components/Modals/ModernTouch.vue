<script>
  import { mapState, mapActions } from 'vuex'

  import Player from '../Player.vue';
  import DownloadLink from '../DownloadLink.vue'

  const template = `
    <div class="vimeography-modal-modern-touch">
      <div class="vimeography-header">
        <h2 class="vimeography-title">{{activeVideo.name}}</h2>

        <div class="vimeography-controls">
          <router-link class="vimeography-next" :to="nextVideoUrl" exact exact-active-class="vimeography-next-active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
          </router-link>

          <a href="#" @click="$modal.hide(modalId)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </a>
        </div>
      </div>

      <player :activeVideo="activeVideo"></player>

      <div class="vimeography-description" v-html="activeVideo.description">
      </div>

      <download-link :video="activeVideo"></download-link>

      <span class="vimeography-plays" v-if="activeVideo.stats.plays">({{activeVideo.stats.plays}} views) </span>
      <span class="vimeography-tags" v-if="this.tags.length > 0">Filed under {{this.tags}}</span>
    </div>
  `;

  const ModernTouch = {
    name: 'modern-touch',
    props: [
      'activeVideo',
      'modalId',
      'nextVideoUrl'
    ],
    template,
    components: {
      Player,
      DownloadLink
    },
    computed: {
      tags() {
        return this.activeVideo.tags.map(tag => tag.name).join(', ')
      }
    }
  }

  export default ModernTouch;
</script>

<style lang="scss" scoped>
  .vimeography-modal-modern-touch {
    background-color: white;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
    padding: 30px;
    transition: top 0.2s ease;
    max-width: 800px;
    margin: 0 auto;
  }

  .vimeography-header {
    display: flex;
  }

  .vimeography-controls {
    display: flex;

    div {
      cursor: pointer;
    }

    .vimeography-next {
      height: 24px;
      outline: none;
      box-shadow: none;
    }

    svg {
      display: block;
      stroke: #9897a0;

      &:hover {
        stroke: #454548;
      }
    }
  }

  .vimeography-title {
    flex: 1;
    margin: 0 0 20px;
    padding: 0;
    color: #333333;
    font-size: 22px;
    font-weight: normal;
    line-height: 1.5em;
  }

  .vimeography-description {
    margin: 10px 0 30px 0;
    padding: 0;
    color: #555555;
    font-size: 15px;
    font-weight: normal;
    line-height: 1.5em;
  }

  .vimeography-plays,
  .vimeography-tags {
    padding: 0;
    color: #999;
    font-size: 11px;
    font-weight: normal;
    line-height: 1.5em;
    display: inline-block;
    margin: 0;
  }

  @media screen and (min-width: 550px) {
    .vimeography-modal-modern-touch {
      padding: 50px;
    }
  }
</style>
