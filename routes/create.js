const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../models/Url');

router.post('/:shortCode/*', async (req, res) => {
    const { shortCode, '0': longUrl } = req.params;
    if(longUrl && shortCode) {
        try {
            let url = await Url.findOne({ longUrl });

            if(url) {
                res.status(200).send('Exists');
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