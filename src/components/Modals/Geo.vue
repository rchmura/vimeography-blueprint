<script>
import { mapState, mapActions } from "vuex";

import Player from "../Player.vue";
import DownloadLink from "../DownloadLink.vue";

const template = `
    <div class="vimeography-modal-geo">
      <div class="vimeography-sidebar">
        <h2 class="vimeography-title">{{activeVideo.name}}</h2>

        <div class="vimeography-info">
          <div class="vimeography-scroller">
            <div class="vimeography-description" v-html="activeVideo.description"></div>
          </div>
        </div>

        <download-link :video="activeVideo"></download-link>

        <span class="vimeography-tags" v-if="this.tags.length > 0">Filed under {{this.tags}}</span>
      </div>

      <div class="vimeography-stage">

        <div class="vimeography-controls">
          <router-link class="vimeography-next" :to="nextVideoUrl" exact exact-active-class="vimeography-next-active">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
          </router-link>

          <a href="#" class="vimeography-close" @click="$modal.hide(modalId)">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </a>
        </div>

        <player :activeVideo="activeVideo"></player>
      </div>
    </div>
  `;

const Geo = {
  name: "geo",
  props: ["activeVideo", "modalId", "nextVideoUrl"],
  template,
  components: {
    Player,
    DownloadLink
  },
  computed: {
    tags() {
      return this.activeVideo.tags.map(tag => tag.name).join(", ");
    }
  }
};

export default Geo;
</script>

<style lang="scss" scoped>
.vimeography-modal-geo {
  padding: 30px;
  transition: top 0.2s ease;

  display: grid;
  grid-template-columns: 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  border: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background: #0f0f10;
  padding: 0;
}

.vimeography-controls {
  display: flex;
  position: absolute;
  z-index: 10000;
  top: 35px;
  right: 35px;

  .vimeography-next,
  .vimeography-close {
    height: 40px;
    outline: none;
    box-shadow: none;
  }

  svg {
    display: block;
    stroke: #f9f9f9;

    &:hover {
      stroke: #fcfcfc;
    }
  }
}

.vimeography-sidebar {
  display: none;
  padding: 60px 25px;
  background-color: #1c1f23;
  text-align: left;
}

.vimeography-title {
  margin: 0 0 20px;
  padding: 0;
  color: #c8cace;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.5em;
  letter-spacing: 0.4px;
}

.vimeography-info {
  position: relative;

  width: 100%;
  height: auto;
  overflow: hidden;
  margin-bottom: 1rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25px;
    background: linear-gradient(
      rgba(255, 255, 255, 0.001),
      #1c1f23
    ); /* transparent keyword is broken in Safari */
  }
}

.vimeography-scroller {
  overflow-y: scroll;
  width: 100%;
  height: 35vh;
  padding: 0 0 15px;
  line-height: 1.2rem;
}

.vimeography-description {
  margin: 0 10px 30px 0;
  padding: 0;
  color: #e6e6e6;
  font-size: 15px;
  font-weight: normal;
  line-height: 1.5em;
}

.vimeography-tags {
  padding: 0;
  color: #999;
  font-size: 11px;
  font-weight: normal;
  line-height: 1.5em;
  display: inline-block;
  margin: 0;
}

.vimeography-stage {
  display: flex;
  align-items: center;
  justify-content: center;
}

/deep/ .vimeography-player-container {
  width: 100%;
  margin-bottom: 0 !important;
}

@media screen and (min-width: 1024px) {
  .vimeography-sidebar {
    display: block;
  }

  .vimeography-modal-geo {
    grid-template-columns: 25% 75%;
  }
}

@media screen and (min-width: 1440px) {
  .vimeography-modal-geo {
    grid-template-columns: 16% 84%;
  }
}
</style>
