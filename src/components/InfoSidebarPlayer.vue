<script>
import Player from './Player.vue';

const defaultTemplate = `
  <div class="vimeography-info-sidebar-player-container">
    <player :activeVideo="activeVideo"></player>

    <div class="vimeography-info">
      <div class="vimeography-scroller">
        <h2 class="vimeography-title">{{activeVideo.name}}</h2>
        <div class="vimeography-description" v-html="activeVideo.description"></div>
      </div>
    </div>
  </div>
`;

const userTemplate = document.querySelector('#vimeography-hero-info-player');

const InfoSidebarPlayer = {
  props: ['activeVideo'],
  name: "InfoSidebarPlayer",
  template: userTemplate ? userTemplate.innerText : defaultTemplate,
  components: {
    Player
  }
}

export default InfoSidebarPlayer;
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Muli:400,600');

  .vimeography-info-sidebar-player-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 20px;
    position: relative;
  }

  .vimeography-info {
    margin-bottom: 1rem;
    position: relative;
    width: 100%;
    height: auto;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 25px;
      background: linear-gradient(rgba(255, 255, 255, 0.001), #fff); /* transparent keyword is broken in Safari */
    }
  }

  .vimeography-scroller {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    width: 100%;
  }

  .vimeography-title {
    color: #222;
    font-family: "Muli", sans-serif;
    font-size: 1.4rem;
    line-height: 1.4rem;
    overflow: hidden;
    font-weight: 600;
    margin: 0 0 1rem;
    padding: 0;
    display: block;
  }

  .vimeography-description {
    font-size: 1rem;
    line-height: 1.4rem;
    padding-bottom: 1rem;
  }
</style>
