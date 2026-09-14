const Url = require('../models/url')


async function getMylinks(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' })
        }
        const links = await Url.find({ user: req.user.id }).sort({ date: -1 });

        res.status(200).json({ success: true, message: 'get all links', count: links.length, data: links })


    }
    catch (error) {
        console.log('', error);
        return res.status(500).json({ success: false, message: 'internal server error' })
    }


}

module.exports = {getMylinks}