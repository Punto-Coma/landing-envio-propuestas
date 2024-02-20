/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'assets-global.website-files.com'
            },
            {
                hostname: 'cdn.discordapp.com'
            }
    ]
    }
};

export default nextConfig;
