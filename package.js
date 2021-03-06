Package.describe({
  name: 'panter:fiber-save-react-context',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'make the react 16 context-api for SSR using fibers',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/panter/meteor-fiber-save-react-context',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1-beta.1');
  api.use('ecmascript');
  api.mainModule('fiber-save-react-context.js', 'server');
});
