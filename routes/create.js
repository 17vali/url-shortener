const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../models/Url');

router.post('/:shortCode/:longUrl', async (req, res) => {
    const { shortCode, longUrl } = req.params;
    console.log(shortCode, longUrl);
    if(longUrl && shortCode) {
        try {
            let url = await Url.findOne({ longUrl });

            if(url) {

            } else {
                url = new Url({
                    shortCode,
                    longUrl,
                    visits: 0,
                    unique: 0
                });

                await url.save();

                res.sendStatus(201);
            }
        } catch (err) {
            console.error(err);
            res.status(500);
        }    
    } else {
        res.status(401);
    }
    
})

module.exports = router;