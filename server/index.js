const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const apiController = require('./controller')
const app = new Koa()

// 设置静态资源路径
const staticPath = '../images'

app.use(serve(
    path.resolve( __dirname, staticPath)
))

const apiRouter = new Router({
    prefix: '/api'
})

app.use(bodyParser())

apiController.init(apiRouter)
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.listen(8989, () => {
    console.log(`started on port ${8989}`)
})



