<script>
import { mapActions, mapState, mapGetters } from "vuex";
import VimeoPlayer from "@vimeo/player";

const template = `
    <div class="vimeography-player-container fitvidsignore" itemprop="video" itemscope itemtype="http://schema.org/VideoObject">
      <meta itemprop="name" :content="this.activeVideo.name" />
      <meta itemprop="description" :content="this.activeVideo.description" />
      <meta itemprop="thumbnailUrl" :content="this.activeVideo.thumbnail_large" />
      <meta itemprop="uploadDate" :content="this.activeVideo.created_time" />
      <link itemprop="embedUrl" :href="this.embedUrl" />

      <div class="vimeography-player" ref="player"></div>
    </div>
  `;

const Player = {
  template,
  name: "Player",
  props: ["activeVideo"],
  mounted: function() {
    const playerSettings = this.buildPlayerSettings(this.activeVideo);
    this.player = new VimeoPlayer(this.$refs.player, playerSettings);

    this.player.on("ended", (data) => {
      this.playerEnded(data);

      if (this.playlistEnabled) {
        const endedVideoId = this.activeVideo.id;
        const nextVideoId = this.$store.getters.getAdjacentVideoId(
          endedVideoId
        );

        const query = {
          ...this.$route.query,
          vimeography_gallery: this.galleryId,
          vimeography_video: nextVideoId,
        };

        this.$router.push({ query });
      }
    });

    this.player
      .ready()
      .catch((error) => {
        const message = `Vimeography could not load this video due to its privacy settings. Click OK to learn how to fix this issue.`;
        console.log(error.message);
        if (window.confirm(message)) {
          window.open(
            "https://docs.vimeography.com/article/38-how-do-i-display-my-private-hidden-restricted-videos"
          );
        }
      })
      .then(() => this.playerReady(this.player));
    this.player.on("play", (data) => this.playerPlay(data));
    this.player.on("pause", (data) => this.playerPause(data));
    this.player.on("timeupdate", (data) => this.playerTimeUpdate(data));
    this.player.on("progress", (data) => this.playerProgress(data));
    this.player.on("seeked", (data) => this.playerSeeked(data));
    this.player.on("volumechange", (data) => this.playerVolumeChange(data));
    this.player.on("loaded", (data) => this.playerLoaded(data));
  },
  watch: {
    activeVideo(nextVideo, prevVideo) {
      const playerSettings = this.buildPlayerSettings(nextVideo);
      this.loadVideo(playerSettings);
    },
  },
  computed: {
    ...mapState({
      galleryId: (state) => state.gallery.id,
      playlistEnabled: (state) => state.gallery.settings.playlist.enabled,
      playerSettings: (state) => {
        if (typeof state.gallery.settings.player == "undefined") {
          return {
            responsive: true,
            transparent: true,
            speed: true,
            playsinline: false,
          };
        }

        return state.gallery.settings.player;
      },
    }),
    embedUrl: function() {
      if (
        this.activeVideo &&
        this.activeVideo.embed &&
        this.activeVideo.embed.html
      ) {
        const node = document
          .createRange()
          .createContextualFragment(this.activeVideo.embed.html);
        const embedUrl = node.firstChild.src;
        return embedUrl;
      } else {
        return "";
      }
    }
  },
  methods: {
    ...mapActions([
      "playerReady",
      "playerPlay",
      "playerPause",
      "playerEnded",
      "playerTimeUpdate",
      "playerProgress",
      "playerSeeked",
      "playerVolumeChange",
      "playerLoaded",
    ]),
    buildPlayerSettings(video) {
      const isModal = typeof this.$modal !== "undefined";
      const autoplay = isModal ? true : this.playerSettings.autoplay;

      let options = {
        url: video.player_embed_url,
        autoplay,
        autopause: true,
        transparent: this.playerSettings.transparent,
        responsive: this.playerSettings.responsive,
        speed: this.playerSettings.speed,
        playsinline: this.playerSettings.playsinline,
      };

      return options;
    },
    loadVideo(playerSettings) {
      this.player.unload().then(() => {
        this.player
          .loadVideo(playerSettings)
          .then((id) => {
            // the video successfully loaded

            if (playerSettings.responsive) {
              /**
               * Determine the player aspect ratio and adjust the wrapper accordingly.
               *
               * @param  {[type]} dimensions [description]
               * @return {[type]}            [description]
               */
              Promise.all([
                this.player.getVideoWidth(),
                this.player.getVideoHeight(),
              ]).then((dimensions) => {
                const width = dimensions[0];
                const height = dimensions[1];
                const ratio = (height / width) * 100;

                this.$refs.player.firstChild.style.padding = `${ratio}% 0 0 0`;
              });
            }

            if (this.playlistEnabled) {
              setTimeout(() => {
                this.player.play();
              }, 500);
            }
          })
          .catch((error) => {
            console.dir(error);
            switch (error.name) {
              case "TypeError":
                // the id was not a number
                break;

              case "PasswordError":
                // the video is password-protected and the viewer needs to enter the
                // password first
                break;

              case "PrivacyError":
                // the video is password-protected or private
                break;

              default:
                // some other error occurred
                break;
            }
          });
      });
    },
  },
};

export default Player;
</script>

<style lang="scss" scoped>
.vimeography-player-container {
  margin-bottom: 1rem;
}

.vimeography-player {
  position: relative;

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    border: 1px solid #ccc;
    border-top-color: #07d;
    animation: spinner 0.6s linear infinite;
  }

  > div {
    transition: padding 100ms ease-in;
  }

  >>> iframe {
    position: relative;
  }

  >>> .fluid-width-video-wrapper iframe {
    position: absolute;
  }
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
