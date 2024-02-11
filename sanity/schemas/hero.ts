import { SchemaTypeDefinition } from 'sanity';

export const hero: SchemaTypeDefinition = {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // Add more fields as needed
  ],
};
