import { list } from '@keystone-next/keystone';
import { checkbox, relationship, text, integer, password } from '@keystone-next/keystone/fields';

export const lists = {
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
  User: list({
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isIndexed: 'unique', isFilterable: true }),
      password: password({ isRequired: true }),
    },
  }),
};
