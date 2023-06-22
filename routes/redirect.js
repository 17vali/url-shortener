const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

router.get('/:shortCode', async (req, res) => {
    try {
        const { shortCode } = req.params;
        let url = await Url.findOne({ shortCode });

        if(url) {
            if(req.cookies.hasOwnProperty(shortCode)) {
                res.cookie(shortCode, true, {
                    maxAge: 1000 * 60 * 60 * 24,
                });

                url.visits += 1;
            } else {
                res.cookie(shortCode, true, {
                    maxAge: 1000 * 60 * 60 * 24,
                });

                url.visits += 1;
                url.unique += 1;
            }
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