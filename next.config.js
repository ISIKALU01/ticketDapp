const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Add this line


module.exports = {
  webpack: (config, { isServer }) => {
    // Allow importing artifacts directly
    config.resolve.alias['@artifacts'] = path.resolve(__dirname, 'artifacts');
    
    // Copy files plugin (alternative to prebuild script)
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'artifacts/contracts'),
              to: path.resolve(__dirname, 'public/contracts')
            }
          ]
        })
      );
    }
    
    return config;
  }
};