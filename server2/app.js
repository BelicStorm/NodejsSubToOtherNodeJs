import express from "express";
import testRouter from "./services/router"
import helmet from "helmet"
import cors from "cors"



/* import Utils from "./utils/utils"; */



const init = async () => {
  const app = express();
  
  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
  app.use(cors())
  app.use(express.json())
/*   app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  })); */
  const router = express.Router()
  router.use("/api",testRouter)
  app.use(router)
  

  // ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
  app.listen(5000, () => {
    console.log(`🚀 Server ready at http://localhost:5000`)
  })
}
init()
