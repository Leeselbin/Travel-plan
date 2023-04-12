module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@lib': './src/lib',
          '@store': './src/store',
          '@cmp': './src/components',
          '@modules': './src/modules',
          '@atm': './src/atoms',
          '@screen': './src/screens',
        },
      },
    ],
  ],
};
