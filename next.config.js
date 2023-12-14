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
        HOMEPAGE_URL: "http://localhost:3000/",
        SERVER_URL: "https://localhost:4000/",
        GOOGLE_URL: "https://drive.google.com/uc?id=",
    },
}

module.exports = nextConfig
