import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;

const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
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
