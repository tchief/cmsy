import { config } from "@keystone-next/keystone";
import { createAuth } from "@keystone-next/auth";
import { lists } from "./schema";
import { insertSeedData } from "./seed";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || `postgres://postgres:example@localhost/cmsy`,
      shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL || `postgres://postgres:example@localhost/cmsy`,
      useMigrations: true,
      async onConnect(context) {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        }
      },
    },
    server: { port: parseInt(process.env.PORT) || 3000 },
    lists,
  })
);
