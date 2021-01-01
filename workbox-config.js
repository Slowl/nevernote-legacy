module.exports = {
  globDirectory: './public/',
  globPatterns: ['\*\*/\*.{html,js}'],
  swDest: './public/sw.js',
  clientsClaim: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 10000000,
  cleanupOutdatedCaches: true,
};
