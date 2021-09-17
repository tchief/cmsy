import { list } from '@keystone-next/keystone';
import { select, checkbox, relationship, text, integer, timestamp } from '@keystone-next/keystone/fields';

export const lists = {
  Post: list({
    fields: {
      title: text({ isRequired: true, isFilterable: true }),
      status: select({
        dataType: 'enum',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ],
      }),
      content: text({ isRequired: true, isFilterable: true }),
      publishDate: timestamp(),
      author: relationship({ ref: 'Author.posts', many: false }),
    },
  }),
  Author: list({
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
  Resource: list({
    fields: {
      key: text({ isRequired: true, isIndexed: 'unique' }),
      value: text({ isRequired: true }),
      isMultiline: checkbox(),
      maxLength: integer({ isRequired: false }),
      pages: relationship({ ref: "Page.resources", many: false }),
    },
    defaultIsFilterable: true
  }),
  Page: list({
    fields: {
      name: text({ isRequired: true }),
      url: text({ isRequired: true, isIndexed: 'unique'  }),
      description: text({ isRequired: false }),
      resources: relationship({ ref: "Resource.pages", many: true }),
    },
    defaultIsFilterable: true
  }),
};
