/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'drive.google.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.locand.jp',
                port: '4000',
            },
        ],
    },
    env: {
        // HOMEPAGE_URL_: "http://localhost:3000/",
        HOMEPAGE_URL: "http://locand.jp/",
        // SERVER_URL: "https://localhost:4000/",
        SERVER_URL: "https://admin.locand.jp:4000/",
        GOOGLE_URL: "https://drive.google.com/uc?id=",
    },
}

module.exports = nextConfig
