export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'uk',
          type: 'string',
          title: 'Ukrainian Title'
        },
        {
          name: 'en',
          type: 'string',
          title: 'English title'
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'uk',
          type: 'text',
          title: 'Ukrainian'
        },
        {
          name: 'en',
          type: 'text',
          title: 'English'
        }
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
  ],
  preview: {
    select: {
      title: 'title.en'
    },
  },
}
