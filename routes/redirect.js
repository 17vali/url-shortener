const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

router.get('/:shortCode', async (req, res) => {
    try {
        let url = await Url.findOne({ shortCode: req.params.shortCode });

        if(url) {
            url.visits += 1;
            await url.save();
            return res.redirect(302, `https://${url.longUrl}`);
        } else {
            return res.status(404);
        }
    } catch (err) {
        console.error(err);
        res.status(500);
    }
});

module.exports = router;