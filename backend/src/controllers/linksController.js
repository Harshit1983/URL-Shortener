const Url = require('../models/url');

async function getMyLinks(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        const links = await Url.find({
            user: req.user.id
        }).sort({
            date: -1
        });

        return res.status(200).json({
            success: true,
            message: 'Get all links',
            count: links.length,
            data: links
        });

    } catch (error) {
        console.log('Get links error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = {
    getMyLinks
};