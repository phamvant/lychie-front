// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     BACKEND_URL: "https://ptops.xyz",
//   },
// };

// module.exports = nextConfig;

module.exports = {
  env: {
    BACKEND_URL: "54.250.208.160:8080",
  },
  images: {
    domains: [
      "images.unsplash.com",
      "lychiebucket.s3.ap-northeast-1.amazonaws.com",
    ], // Replace with your allowed domains
  },
};
