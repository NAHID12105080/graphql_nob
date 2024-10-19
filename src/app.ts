import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
import { connectDB } from "./database/database.js";
import { schema } from "./graphql/schema.js";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGO_URI!;
connectDB(mongoURI);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      hello: () => "Hello, world!",
    },
  },
});

startStandaloneServer(server, { listen: { port } })
  .then(() => {
    console.log("Apollo Server is running on http://localhost:4444");
  })
  .catch((error) => {
    console.error("Error starting Apollo Server:", error);
  });
