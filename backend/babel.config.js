export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current' 
      },
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ]
};
