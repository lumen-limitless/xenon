import { defineField, defineType } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
    // Add more fields as needed
  ],
});
