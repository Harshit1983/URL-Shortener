const Url = require('../models/url');

async function getMyLinks(req, res) {
    try {
        const links = await Url.find({
            user: req.user.id
        }).sort({
            date: -1
        });

        return res.status(200).json({
            success: true,
            links: links
        });

    } catch (error) {
        console.error('Get my links error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch links'
        });
    }
}

module.exports = {
    getMyLinks
};