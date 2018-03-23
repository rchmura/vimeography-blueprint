const Thumbnail = {
  computed: {
    thumbnailUrl: (data) => {
      const selections = data.video.pictures.sizes.filter(img => img.width <= 640)
      const sorted = selections.sort( (a, b) => a.width - b.width )
      return sorted[sorted.length - 1].link
    },
  }
}

export default Thumbnail;
