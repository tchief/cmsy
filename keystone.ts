import { config } from '@keystone-next/keystone';
import { lists } from './schema';
import { insertSeedData } from './seed'

export default config({
  db: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL || `postgres://postgres:${process.env.USER}@localhost/cmsy`,
    useMigrations: true,
    async onConnect(context) {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(context);
      }
    },
  },
  server: { port: parseInt(process.env.PORT) || 3000 },
  lists,
});
