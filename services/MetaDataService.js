export { getMetaTagsForWorkshop, getMetaTagsForMachine, getMetaTagsForBlog }
/**
   * get Meta Tags for title and description for Workshop if available,
   * otherwise build title like  "GRAND GARAGE - SUBTITLE" and description like "GRAND GARAGE - TEASER"
   * @param workshop Workshop
   */
function getMetaTagsForWorkshop (workshop) {
  let metaTitle = ''
  let metaDescription = ''
  if (!(workshop.metadata.title === '')) {
    metaTitle = workshop.metadata.title
  } else {
    // subtitle should be available, since it is a required field in storyblok
    if (workshop.subtitle !== '') {
      metaTitle = 'GRAND GARAGE - ' + workshop.subtitle
    } else {
      metaDescription = 'GRAND GARAGE'
    }
  }
  if (!(workshop.metadata.description === '')) {
    metaDescription = workshop.metadata.description
  } else {
    // teaser should be available, since it is a required field in storyblok
    if (workshop?.teaser !== '') {
      metaDescription = workshop.teaser
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
  if (!(machine.metadata.title === '')) {
    metaTitle = machine.metadata.title
  } else {
    if (machine.title !== '') {
      metaTitle = 'GRAND GARAGE - ' + machine.title
    } else {
      metaDescription = 'GRAND GARAGE'
    }
  }
  if (!(machine.metadata.description === '')) {
    metaDescription = machine.metadata.description
  } else {
    if (machine?.title !== '') {
      metaDescription = machine.title
    } else {
      metaDescription = 'Machine'
    }
  }
  return {
    title: metaTitle,
    meta: [
      { hid: 'description', name: 'description', content: metaDescription }
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
