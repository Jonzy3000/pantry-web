module.exports = {
  target: "experimental-serverless-trace",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.tsx?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
