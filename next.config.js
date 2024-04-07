// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     BACKEND_URL: "https://ptops.xyz",
//   },
// };

// module.exports = nextConfig;

module.exports = {
  env: {
    BACKEND_URL: "https://lychie-back.onrender.com",
  },
  images: {
    domains: [
      "images.unsplash.com",
      "lychiebucket.s3.ap-northeast-1.amazonaws.com",
    ], // Replace with your allowed domains
  },
};
