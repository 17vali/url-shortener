const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../models/Url');

router.patch('/:shortCode/*', async (req, res) => {
    const { shortCode, '0': longUrl } = req.params;
    if(longUrl && shortCode) {
        try {
            let url = await Url.findOne({ shortCode });

            if(!url) {
                res.status(400);
            } else {
                url.longUrl = longUrl;

                await url.save();

                res.sendStatus(200);
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