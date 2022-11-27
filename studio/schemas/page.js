export default {
    name: 'page',
    title: 'Page',
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
            name: 'body',
            title: 'Body',
            type: 'object',
            fields: [
            {
                name: 'en',
                title: 'English',
                type: 'blockContent'
            },
            {
                name: 'uk',
                title: 'Ukrainian',
                type: 'blockContent'
            }
            ]
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                maxLength: 96,
            },
        },
    ]
  }
  