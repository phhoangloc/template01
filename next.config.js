/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'drive.google.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
            },
        ],
    },
    env: {
        HOMEPAGE_URL_: "http://localhost:3000/",
        SERVER_URL: "https://126.4.193.90:4000/",
        GOOGLE_URL: "https://drive.google.com/uc?id=",
    },
}

module.exports = nextConfig
