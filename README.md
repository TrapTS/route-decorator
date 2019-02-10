# route-decorator
Trap route decorator.

# example

* controller

  ```javascript
  import { prefix, route, Method, Context } from '@trapts/route-decorator'
  
  @prefix('/hello')
  export class Hello {
    @route('/', Method.GET)
    async index(ctx: Context): Promise<void> {
      ctx.body = 'Hello World'
    }
  }
  ``` 

* server

  ```javascript
  import 'reflect-metadata'
  import * as Koa from 'koa'
  import { join } from 'path'
  import { loadControllers } from '@trapts/route-decorator'

  const bootstrap => () => {
    const app = new Koa()
    const router = loadControllers(join(__dirname, './controller/'))
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000)
    console.log("Koa application is up and running on port 3000")
  }

  bootstrap()
  ```