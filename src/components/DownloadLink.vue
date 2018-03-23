<script>
  import { mapState } from 'vuex'
  import get from 'lodash/get';

  const template = `
    <div class="vimeography-download" v-if="shouldShowDownloadLink">
      <a :href="link" :title="'Download ' + video.name">Download Video</a>
    </div>
  `;

  const DownloadLink = {
    template,
    props: ['video'],
    computed: {
      ...mapState({
        allowDownloads: state => get(state, 'gallery.settings.downloads.enabled')
      }),
      shouldShowDownloadLink(data) {
        return this.allowDownloads && data.video.download
      },
      link(data) {
        let bestAvailable;

        bestAvailable = data.video.download.find( d => d.quality == 'hd' )

        if ( bestAvailable == undefined ) {
          bestAvailable = data.video.download.find( d => d.quality == 'source' )
        }

        return bestAvailable.link
      },
    },
  }

  export default DownloadLink;
</script>

<style lang="scss" scoped>
  .vimeography-download {
  }
</style>
