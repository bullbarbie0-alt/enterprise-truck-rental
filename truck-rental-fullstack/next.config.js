/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['enterprisetrucks.com', 'static.vecteezy.com', 'img.freepik.com', 
                  'media.gettyimages.com', 'cdn-ilejijg.nitrocdn.com', 'commercial.monroetruck.com',
                  'chillfreez.com', 'img.waimaoniu.net', 't3.ftcdn.net', 'bristoltruckrentals.com',
                  'mma.prnewswire.com', 'cdn.pixabay.com', 'images.unsplash.com'],
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
