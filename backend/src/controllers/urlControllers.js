const validUrl = require('valid-url');
const Url = require('../models/url');

async function shortenUrl(req, res) {

    try {

        // Get longUrl from request body
        const { longUrl } = req.body;

        console.log('Received long URL:', longUrl);

        // Check URL exists
        if (!longUrl) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a URL'
            });
        }

        // Validate URL
        if (!validUrl.isUri(longUrl)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid URL format provided'
            });
        }

        // Check if URL already exists
        let url = await Url.findOne({
            longUrl: longUrl
        });

        if (url) {
            return res.status(200).json({
                success: true,
                message: 'URL already shortened',
                data: url
            });
        }

        // Generate short code
        const { nanoid } = await import('nanoid');

        const urlCode = nanoid(7);

        // Create short URL
        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

        // Create URL object
        const newUrlData = {
            longUrl: longUrl,
            shortUrl: shortUrl,
            urlCode: urlCode
        };

        // Add user if logged in
        if (req.user) {
            newUrlData.user = req.user.id;
        }

        // Save to MongoDB
        url = await Url.create(newUrlData);

        // Send response
        return res.status(201).json({
            success: true,
            message: 'URL shortened successfully',
            data: url
        });

    } catch (error) {

        console.log('Database error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}


async function redirectToUrl(req, res) {

    const { code } = req.params;

    try {

        const url = await Url.findOne({
            urlCode: code
        });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: 'No URL found'
            });
        }

        // Increase click count
        url.clicks = url.clicks + 1;

        await url.save();

        // Redirect to original URL
        return res.redirect(301, url.longUrl);

    } catch (error) {

        console.log('Server error on redirect:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}


module.exports = {
    shortenUrl,
    redirectToUrl
};