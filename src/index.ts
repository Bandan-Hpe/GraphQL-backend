import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  // create GraphQL Server
  const gqServer = new ApolloServer({
    typeDefs: `
    type Query{
        hello:String
        say(name:String):String
    }
 `,
    resolvers: {
      Query: {
        hello: () => `Hey there i'm from graphql`,
        say:(_,{name}:{name:string})=>`Hi ${name}, How are you ? `
      },
    },
  });
  // start gq server
  app.use(express.json());

  await gqServer.start();
  app.use("/graphql", expressMiddleware(gqServer));

  app.get("/", (req, res) => {
    return res.json({ message: "server is up and running " });
  });

  app.listen(PORT, () => console.log(`server started ${PORT}`));
}
init();
