<script>
  import { mapState, mapActions } from 'vuex'

  import Player from '../Player.vue';
  import DownloadLink from '../DownloadLink.vue'

  const template = `
    <div class="vimeography-plain-old-player">
      <div class="vimeography-controls" @click="$modal.hide(modalId)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="16" y1="4" x2="4" y2="16"></line><line x1="4" y1="4" x2="16" y2="16"></line></svg>
      </div>

      <player :activeVideo="activeVideo"></player>

      <download-link :video="activeVideo"></download-link>
    </div>
  `;

  const PlainOldPlayer = {
    name: 'plain-old-player',
    props: [
      'activeVideo',
      'modalId'
    ],
    template,
    components: {
      Player,
      DownloadLink
    }
  }

  export default PlainOldPlayer;
</script>

<style lang="scss" scoped>
  .vimeography-plain-old-player {
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

  /deep/ .vimeography-download {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: -2rem;

    a {
      background: #222225;
      padding: 0.35rem 1rem;
      border-radius: 1rem;
      color: #2e99ea;
      box-shadow: none;
      font-size: 0.9rem;
    }
  }
</style>
