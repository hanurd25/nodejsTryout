const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '127.0.0.1';

let totalRequests = 0;

const htmlPath = path.join(__dirname, 'index.html');
let htmlContent;
try {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
} catch (err) {
    console.error('Failed to read index.html:', err.message);
    process.exit(1);
}

function serveStaticFile(req, res, contentType) {
    const fullPath = path.join(__dirname, filepath)
    try {
        const content = fs.readFileSync(fullPath, 'utf8');
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content);
    } catch (err) {
        res.writehead(404);
        res.end('Not Found');
    }
}


const server = http.createServer((req, res) => {
    // Increment totalRequests for every request (even non‑/calculate)
    totalRequests++;

    // Logging total requests and request info in terminal
    console.log(`Request #${totalRequests} | ${req.method} ${req.url}`);

    // Serve the HTML
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
        return;
    }

    // Serve CSS file
    if (req.method === 'GET' && req.url === '/style.css') {
        const cssPath = path.join(__dirname, 'style.css');
        try {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
        } catch (err) {
            res.writeHead(404);
            res.end('CSS not found');
        }
        return;
    }

    //Can make a "serveStatic" function out of this for the HTML utilities
    /*
    if (req.method === 'GET' && req.url === '/HTMLutil.js') {
        const jsPath = path.join(__dirname, 'script.js');
        try {
            const jsContent = fs.readFileSync(jsPath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(jsContent);
        } catch (err) {
            res.writeHead(404);
            res.end('JavaScript not found');
        }
        return;
    }

     */


    // API endpoint: POST /calculate
    if (req.method === 'POST' && req.url === '/calculate') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { a, b, operation } = JSON.parse(body);

                let result;
                if (operation === 'add') result = a + b;
                else if (operation === 'multiply') result = a * b;
                else throw new Error('Invalid operation');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result, count: totalRequests }));
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

server.listen(PORT, HOST, () => {
    console.log(`Math server running at http://${HOST}:${PORT}`);
    console.log(`Serving HTML from ${htmlPath}`);
    console.log(`Localhost only – API still works for Python clients.`);
});