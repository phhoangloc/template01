/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
            },
        ],
    },
    env: {
        HOMEPAGE_URL: "http://localhost:3000/",
        SERVER_URL: "http://localhost:4000/",
    },
}

module.exports = nextConfig
