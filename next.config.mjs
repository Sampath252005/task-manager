/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ Allow Cloudinary-hosted images
  },
  async redirects() {
    return [
      {
        source: "/", // When visiting root URL
        destination: "/dashboard", // Go to dashboard
        permanent: false, // false = temporary redirect (good for development)
      },
    ];
  },
};

export default nextConfig;
