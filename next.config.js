/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  async rewrites() {
    return [
      {
        source: "/:username/:repository",
        destination: "/api/:username/:repository",
      },
      {
        source: "/r/:username/:repository",
        destination: "/api/:username/:repository",
      },
      {
        source: "/",
        destination: "/index.html",
      },
    ];
  },
};
