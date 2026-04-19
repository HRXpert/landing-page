// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Nx-specific options if needed
  },

  webpack: (config, { isServer }) => {
    // Only alias out `canvas` on the server build
    if (isServer) {
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          canvas: false,
        },
      };
    }
    return config;
  },

  async redirects() {
    return [
      {
        source: '/GetStarted',
        destination: '/signup',
        permanent: true,
      },
    ];
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
