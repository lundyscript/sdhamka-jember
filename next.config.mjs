/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "dzk96sx7wjff0xun.public.blob.vercel-storage.com"
      },
      {
        protocol: "https",
        hostname: "muhammadiyah.or.id"
      }
    ]
  }
};

export default nextConfig;
