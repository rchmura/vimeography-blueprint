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

        if ( data.video.download == undefined ) {
          return '#'
        }

        // Check for best available HD download first.
        let hd = data.video.download.filter( d => d.quality == 'hd' ).sort( (a, b) => b.width - a.width )

        if ( hd.length > 0 ) {
          return hd[0].link
        }

        // Otherwise, return source video file
        return data.video.download.find( d => d.quality == 'source' ).link
      },
    },
  }

  export default DownloadLink;
</script>

<style lang="scss" scoped>
  .vimeography-download {
  }
</style>
