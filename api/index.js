const https = require('https');
export default function handler(req, res) {
 const options = {
 hostname: '137.131.143.111',
 port: 443,
 path: req.url,
 method: req.method,
 headers: {
 ...req.headers,
 'host': '137.131.143.111',
 'connection': 'keep-alive'
 },
 rejectUnauthorized: false
 };
 const proxyReq = https.request(options, (proxyRes) => {
 res.writeHead(proxyRes.statusCode, proxyRes.headers);
 proxyRes.pipe(res);
 });
 proxyReq.on('error', (err) => {
 console.error('Erro na conexão com VPS:', err.message);
 res.status(502).end('ERRO: VPS FORA DE AREA OU FIREWALL ATIVO');
 });
 req.pipe(proxyReq);
}
export const config = {
 api: {
 bodyParser: false,
 externalResolver: true
 }
};
