export default {
  /**
   * get Meta Tags for title and description if available,
   * otherwise build title like  "GRAND GARAGE - SUBTITLE" and description like "GRAND GARAGE - TEASER"
   * @param blok Workshop
   */
  getMetaTagsForWorkshop (blok) {
    console.log(blok)
    let metaTitle = ''
    let metaDescription = ''
    if (!(blok.metadata.title === '')) {
      console.log('title found')
      metaTitle = blok.metadata.title
    } else {
      console.log('title not found')
      // subtitle should be available, since it is a required field in storyblok
      if (blok.subtitle !== '') {
        console.log('title not found')
        metaTitle = 'GRAND GARAGE - ' + blok.subtitle
      } else {
        metaDescription = 'GRAND GARAGE'
      }
    }
    if (!(blok.metadata.description === '')) {
      metaDescription = blok.metadata.description
    } else {
      // teaser should be available, since it is a required field in storyblok
      if (blok?.teaser !== '') {
        metaDescription = blok.teaser
      } else {
        metaDescription = 'GRAND GARAGE - Workshop'
      }
    }
    return {
      title: metaTitle,
      meta: [
        { hid: 'description', name: 'description', content: metaDescription }
      ]

    }
  }
}
