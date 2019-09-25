const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config')

const Url = require('../models/Url');

router.post('/shorten' , async (req,res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
    
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid Base Url');
    }

    // Create url code
    const urlCode = shortId.generate();

    // Check long url
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if(url) {
                res.json(url);
            }else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                
                res.json(url);
            }

        } catch (err) {
            console.log(err);
            res.status(500).json('server error');
        }
    } else {
        res.status(401).json('Invalid Long Url');
    }

})


module.exports = router;