const axios = require('axios');
const { convert } = require('html-to-text');
const logger = require('./logger');


module.exports = async function search(text) {
    try {
        const results = await axios.get("https://ru.wikipedia.org/w/api.php", {
            params: {
                action: 'query',
                list: 'search',
                srsearch: text,
                format: 'json',
                srlimit: 5
            }
        })
        return results.data.query.search.map(result => ({
            title: result.title,
            subtitle: convert(result.snippet, {
                wordwrap: null,
            }),
            link: `https://ru.wikipedia.org/wiki/${result.title.replaceAll(' ', '_')}`
        }));
    } catch (err) {
        logger.error(err);
    }
}
