const axios = require('axios');

const createProxyMiddleware = (serviceUrl) => {
    return async (req, res) => {
        try {
            const url = `${serviceUrl}${req.originalUrl}`;

            const response = await axios({
                method: req.method,
                url: url,
                data: req.body,
                headers: {
                    ...req.headers,
                    host: new URL(serviceUrl).host
                }
            });

            res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(503).json({
                    error: 'Service unavailable',
                    message: error.message
                });
            }
        }
    };
};

module.exports = createProxyMiddleware;
