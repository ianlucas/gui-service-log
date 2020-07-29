module.exports = {
  extends: [
    '@vue/standard',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: true
      }
    ]
  }
}
