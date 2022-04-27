export { getMetaTagsForWorkshop, getMetaTagsForMachine, getMetaTagsForBlog, getMetaTagsForPress }
/**
   * get Meta Tags for title and description for Workshop if available,
   * otherwise build title like  "GRAND GARAGE - SUBTITLE" and description like "GRAND GARAGE - TEASER"
   * @param workshop Workshop
   */
function getMetaTagsForWorkshop (workshop) {
  let metaTitle = ''
  let metaDescription = ''
  const image = 'https:' + workshop.image
  if (typeof (workshop.metadata) === 'undefined') {
    metaTitle = 'GRAND GARAGE - ' + workshop.subtitle
  } else {
    if (!(workshop.metadata.title === '')) {
      metaTitle = 'GRAND GARAGE - ' + workshop.metadata.title
    } else {
      // subtitle should be available, since it is a required field in storyblok
      if (workshop.title !== '') {
        metaTitle = 'GRAND GARAGE - ' + workshop.title
      } else {
        metaTitle = 'GRAND GARAGE'
      }
    }
    if (!(workshop.metadata.description === '')) {
      metaDescription = workshop.metadata.description
    } else {
      // subtitle should be available, since it is a required field in storyblok
      if (workshop.teaser !== '') {
        metaDescription = workshop.teaser
      } else {
        metaDescription = 'GRAND GARAGE - Workshop'
      }
    }
  }
  return {
    title: metaTitle,
    meta: [
      { hid: 'description', name: 'description', content: metaDescription },
      { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'og:description', name: 'og:description', content: metaDescription },
      { hid: 'og:title', property: 'og:title', content: metaTitle }
    ]
  }
}

/**
 * get Meta Tags for title and description for Machine if available,
 * otherwise build
 * title like  GRAND GARAGE - Machine Title &
 * description like Machine Title
 * (Fallback to 'Machine' if no title is available)
 * @param machine Machine
 */
function getMetaTagsForMachine (machine) {
  let metaTitle = ''
  let metaDescription = ''
  const image = 'https:' + machine.image
  if (typeof (machine.metadata) === 'undefined') {
    metaTitle = 'GRAND GARAGE - ' + machine.title
  } else {
    if (!(machine.metadata.title === '')) {
      metaTitle = 'GRAND GARAGE - ' + machine.metadata.title
    } else {
      if (machine.title !== '') {
        metaTitle = 'GRAND GARAGE - ' + machine.title
      } else {
        metaTitle = 'GRAND GARAGE'
      }
    }
    if (!(machine.metadata.description === '')) {
      metaDescription = machine.metadata.description
    } else {
      if (machine.teaser !== '') {
        metaDescription = machine.teaser
      } else {
        metaDescription = 'GRAND GARAGE - Maschine'
      }
    }
  }
  return {
    title: metaTitle,
    meta: [
      { hid: 'description', name: 'description', content: metaDescription },
      { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'og:description', name: 'og:description', content: metaDescription },
      { hid: 'og:title', property: 'og:title', content: metaTitle }
    ]
  }
}

function getMetaTagsForBlog (item) {
  const image = 'https:' + item.content.image
  const ogTitle = 'GRAND GARAGE - ' + item.name
  const ogDescription = item.content.text
  return {
    title: ogTitle,
    meta: [
      { hid: 'description', name: 'description', content: ogDescription },
      { hid: 'og:description', name: 'og:description', content: ogDescription },
      { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'og:title', property: 'og:title', content: ogTitle }
    ]
  }
}

function getMetaTagsForPress (story) {
  const image = 'https:' + story.content.Image
  const ogTitle = 'GRAND GARAGE - ' + story.content.Title
  const ogDescription = story.content.Teaser
  return {
    title: ogTitle,
    meta: [
      { hid: 'description', name: 'description', content: ogDescription },
      { hid: 'og:description', name: 'og:description', content: ogDescription },
      { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'og:title', property: 'og:title', content: ogTitle }
    ]
  }
}
