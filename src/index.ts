import * as Router from '@trapts/router'
import * as dir from 'dir_filenames'
import * as Koa from 'koa'

type Middleware = (ctx: Koa.Context, next?: any) => any | Promise<any>

const router = new Router({
  prefix: '/v1'
})

type Prefix = (
  path: string
) => (target: any, _key?: string | symbol, _descriptor?: any) => void

type Route = (
  path: string,
  method: Method,
  ...middleware: Array<Middleware>
) => (target: any, _key?: string | symbol, descriptor?: any) => void

export enum Method {
  HEAD,
  OPTIONS,
  GET,
  PUT,
  PATCH,
  POST,
  DELETE,
  ALL
}

export const prefix: Prefix = (path: string = '') => {
  return (target: any, _key?: string | symbol, _descriptor?: any): void => {
    prefixUpdateRoute(target, path)
  }
}

export const route: Route = (
  path: string,
  method: Method,
  ...middleware: Array<Middleware>
) => {
  return (target: any, _key?: string | symbol, descriptor?: any): void => {
    routeUpdate(target, method, path, descriptor, ...middleware)
  }
}

const prefixUpdateRoute = (target: any, path: string): void => {
  if (!target.prototype.router) {
    target.prototype.router = new Router()
  }
  router.use(path, target.prototype.router.routes())
  router.use(path, target.prototype.router.allowedMethods())
}

const routeUpdate = (
  target: any,
  method: Method,
  path: string,
  descriptor?: any,
  ...middleware: Array<Middleware>
) => {
  if (!target.router) {
    target.router = new Router()
  }
  switch (method) {
    case Method.HEAD:
      target.router.head(path, ...middleware, descriptor.value)
      break
    case Method.OPTIONS:
      target.router.options(path, ...middleware, descriptor.value)
      break
    case Method.GET:
      target.router.get(path, ...middleware, descriptor.value)
      break
    case Method.PATCH:
      target.router.patch(path, ...middleware, descriptor.value)
      break
    case Method.PUT:
      target.router.put(path, ...middleware, descriptor.value)
      break
    case Method.POST:
      target.router.post(path, ...middleware, descriptor.value)
      break
    case Method.DELETE:
      target.router.del(path, ...middleware, descriptor.value)
      break
    case Method.ALL:
      target.router.all(path, ...middleware, descriptor.value)
      break
    default:
      throw new Error('@route decorator "method" is not valid')
  }
}

export const loadControllers = (filePath: string) => {
  const files: string[] = dir(filePath)
  files.map(file => {
    require(file)
  })
  return router
}
