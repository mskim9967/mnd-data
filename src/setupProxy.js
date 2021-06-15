const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
	app.use(
		createProxyMiddleware('/api', {
			target: 'https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000/',
			changeOrigin: true
		})
	);
};

//'https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000/',