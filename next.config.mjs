/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "dzk96sx7wjff0xun.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;
