import * as dotenv from "dotenv";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { readFileSync } from "fs";
import "reflect-metadata";
import { ListInventoryResolver, UpdateInventoryResolver } from "./resolvers";
import { connectToDatabase } from "./utils/database";

dotenv.config({ path: "./dev.env" });

const app = express();
const PORT = process.env.PORT || 3000;

const querySchema = readFileSync("./src/schemes/Query.graphql", "utf-8");
const inventorySchema = readFileSync(
  "./src/schemes/Inventory.graphql",
  "utf-8"
);
const mutationSchema = readFileSync("./src/schemes/Mutation.graphql", "utf-8");
const orderSchema = readFileSync("./src/schemes/Order.graphql", "utf-8");

const schema = buildSchema(`
  ${querySchema}
  ${inventorySchema}
  ${mutationSchema}
  ${orderSchema}
`);

connectToDatabase()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Error connecting to the database:", error));

const resolvers = {
  listInventory: async (args: any) => {
    const listInventoryResolver = new ListInventoryResolver();
    return await listInventoryResolver.listInventory(
      args.category,
      args.subCategory,
      args.inStock,
      args.offset,
      args.size,
      args.sortBy,
      args.sortOrder
    );
  },
  updateInventory: async (args: any) => {
    const updateInventoryResolver = new UpdateInventoryResolver();
    return await updateInventoryResolver.updateInventory(
      args.productId,
      args.name,
      args.quantity,
      args.category,
      args.subCategory
    );
  },
};

app.use(
  "/inventory",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/inventory`);
});
