const urlModel = require('../models/urlModel')
const shortid = require('shortid')
const validURL = require('valid-url')

const createURL = async (req, res) => {
    try {
        const url = req.body.url
        if (!url) { return res.status(400).send({ status: false, message: ' Please provide url.' }) }
        // validate url
        if (!validURL.isUri(url)) {
            return res.status(400).send({ status: false, message: ' Please provide a valid url.' })
        }
        // check if exists in db
        let exUrl = await urlModel.findOne({ longUrl: url });
        if (!exUrl) {
            // create new
            const urlCode = shortid.generate().toLowerCase();
            const shortUrl = `http://localhost:3000/${urlCode}`;
            exUrl = await urlModel.create({ longUrl: url, shortUrl, urlCode })
        }
        return res.status(200).send({
            status: true,
            data: {
                longUrl: exUrl.longUrl,
                shortUrl: exUrl.shortUrl,
                urlCode: exUrl.urlCode,
            }
        })
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

const redirectURL = async (req, res) => {
    try {
        const urlCode = req.params.urlCode
        // check if exists in db
        let exUrl = await urlModel.findOne({ urlCode });
        if (!exUrl) {
            return res.status(400).send({
                status: false,
                message: "UrlCode Not Found"
            })
        }
        return res.redirect(exUrl.longUrl)
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.createURL = createURL
module.exports.redirectURL = redirectURL