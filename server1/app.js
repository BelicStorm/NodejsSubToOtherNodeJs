import express from "express";

import { typeDefs } from "./services/typedefs.js";
import { resolvers } from "./services/resolvers.js";
import { ApolloServer } from 'apollo-server-express'
import helmet from "helmet"
import cors from "cors"
import http from "http"


const init = async () => {

  
  const app = express();
  const httpServer = http.createServer(app);
  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
  app.use(cors())
  app.use(express.json({limit: '1000mb'}));
  app.use(express.urlencoded({extended: true, limit:'1000mb'}))
  
  let server = null;
  async function startServer() {
      server = new ApolloServer({ typeDefs, resolvers });
      await server.start();
      server.applyMiddleware({ app });
      server.installSubscriptionHandlers(httpServer);
      
  }
  await startServer();
  
  // ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`)
  })
}
init()



