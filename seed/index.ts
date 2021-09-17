import { KeystoneContext } from '@keystone-next/keystone/types';
import { TextResource } from '../types';
import { resources } from './data';

export async function insertSeedData(context: KeystoneContext) {
  console.log(`Inserting seed data`);

  const createResource = async (data: TextResource) => {
    let resource = null;
    try {
      resource = await context.lists.Resource.findOne({
        where: { key: data.key },
        query: 'id',
      });
    } catch (e) {}
    if (!resource) {
      resource = await context.lists.Resource.createOne({
        data: data,
        query: 'id',
      });
    }
    return resource;
  };

  for (const resource of resources) {
    console.log(`Adding resource: ${resource.key}`);
    await createResource(resource);
  }

  console.log(`Seed data inserted`);
  process.exit();
}
