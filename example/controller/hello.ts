import { Context } from 'koa'
import { prefix, route, Method } from '@trapts/route-decorator'

@prefix('/hello')
export class Hello {
  @route('/', Method.GET)
  async index(ctx: Context): Promise<void> {
    ctx.body = 'Hello World'
  }
}
