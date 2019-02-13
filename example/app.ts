import 'reflect-metadata'
import * as Koa from 'koa'
import { join } from 'path'
import { loadControllers } from '../index'

const bootstrap = () => {
  const app = new Koa()
  const router = loadControllers(join(__dirname, './controller/'))
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3000)
  console.log("Koa application is up and running on port 3000")
}

bootstrap()