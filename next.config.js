/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'drive.google.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '126.4.193.90',
                port: '4000',
            },
        ],
    },
    env: {
        HOMEPAGE_URL_: "http://localhost:3000/",
        SERVER_URL: "https://192.168.2.80:4000/",
        GOOGLE_URL: "https://drive.google.com/uc?id=",
    },
}

module.exports = nextConfig
