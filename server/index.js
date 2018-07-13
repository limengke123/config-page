const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const apiController = require('./controller')
const app = new Koa()
const apiRouter = new Router({
    prefix: '/api'
})

app.use(bodyParser())

apiController.init(apiRouter)
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.listen(8989, () => {
    console.log(`started on port ${8989}`)
})



