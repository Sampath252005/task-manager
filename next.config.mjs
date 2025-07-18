/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ Allow Cloudinary-hosted images
  },
};

export default nextConfig;
