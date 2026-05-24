const https = require('https');

const urls = [
    "https://www.instagram.com/reel/DTRqZ7yCC9d/",
    "https://www.instagram.com/reel/DSmlEHYDeys/",
    "https://www.instagram.com/reel/DPRjljijXX_/"
];

async function fetchOgImage(url) {
    const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    return new Promise((resolve, reject) => {
        https.get(api, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json && json.data && json.data.image) {
                        resolve(json.data.image.url);
                    } else {
                        resolve('No image found: ' + data.substring(0, 100));
                    }
                } catch(e) { resolve('Error parsing: ' + data.substring(0, 100)); }
            });
        }).on('error', reject);
    });
}

async function run() {
    for (const url of urls) {
        console.log(`Fetching ${url}...`);
        const img = await fetchOgImage(url);
        console.log(`Result: ${img}`);
    }
}

run();
