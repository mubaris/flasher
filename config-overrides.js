const darkTheme = require('@ant-design/dark-theme');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    import: "~antd/lib/style/themes/default.less",
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { ...darkTheme.default }
    }
  }),
);