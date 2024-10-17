const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400, must-revalidate'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;