module.exports = {
  siteUrl: 'https://www.egypt-green.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/en'),
    await config.transform(config, '/ar'),
    await config.transform(config, '/products'),
    await config.transform(config, '/landing'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/agent'),
    await config.transform(config, '/articles'),
  ],
};
