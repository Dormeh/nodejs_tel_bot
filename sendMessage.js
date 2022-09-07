const axios = require('axios');
const config = require('./config');
const logger = require('./logger');


module.exports = async  function sendMessage(chatId, text) {
    try {
      await axios.post(`https://api.telegram.org/bot${config.bot_token}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true //отключить превью
      });
    } catch (err) {
        logger.error(err);
    }

}
