import { SchemaTypeDefinition } from 'sanity';

export const banner: SchemaTypeDefinition = {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    // Add more fields as needed
  ],
};
