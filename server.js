const Koa = require('koa');
const pug = require('pug');
const path = require('path');
const Router = require('koa-router');
const sendMessage = require('./sendMessage');
const search = require('./wikipedia');
const config = require('./config');
const logger = require('./logger');


const app = new Koa();
const router = new Router();

app.use(require('koa-bodyparser')());

app.use((ctx, next) => {
    ctx.logger = logger;
})

router.post(config.bot_token, async (ctx, next) => {

    try {
        const {message: {text, chat: {id: chatId}}} = ctx.request.body;

        const results = await search (text);

        const msg = pug.renderFile (path.join (__dirname, 'message.pug'), {
            results,
        })
        await sendMessage (chatId, msg);

    } catch (err) {
        logger.error(err)
    }

    ctx.body = 'ok';
})

app.use(router.routes());

app.listen(config.port);

