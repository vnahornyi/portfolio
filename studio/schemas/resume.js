export default {
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        title: 'Manuscript',
        name: 'manuscript',
        type: 'file'
      },
      {
        title: 'Selected',
        name: 'selected',
        type: 'boolean'
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image'
      },
    },
}
  