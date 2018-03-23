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
        return data.video.download.filter( d => d.quality == "hd" )[0].link || null
      },
    },
  }

  export default DownloadLink;
</script>

<style lang="scss" scoped>
  .vimeography-download {
  }
</style>
