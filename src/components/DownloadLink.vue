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

        // Check for best available UHD download first.
        let uhd = data.video.download.filter( d => d.quality == 'uhd' ).sort( (a, b) => b.width - a.width )

        if ( uhd.length > 0 ) {
          return uhd[0].link;
        }

        // Check for best available HD download next.
        let hd = data.video.download.filter( d => d.quality == 'hd' ).sort( (a, b) => b.width - a.width )

        if ( hd.length > 0 ) {
          return hd[0].link;
        }

        // Third, attempt to return source video file
        let source = data.video.download.find( d => d.quality == 'source' );

        if ( typeof source !== 'undefined' ) {
          return source.link;
        }

        // Last resort, check for best available SD download first.
        let sd = data.video.download.filter( d => d.quality == 'sd' ).sort( (a, b) => b.width - a.width )

        if ( sd.length > 0 ) {
          return sd[0].link;
        }

        // No luck, sorry
        return "#";
      },
    },
  }

  export default DownloadLink;
</script>

<style lang="scss" scoped>
  .vimeography-download {
  }
</style>
