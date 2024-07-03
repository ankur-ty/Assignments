const { Before, After } = require('@cucumber/cucumber');

Before('@setup', function () {
  global.Hooks = 1;
  console.log(`Global variable Hooks set to: ${global.someGlobalVar}`);
});

After('@teardown', function () {
  global.Hooks = undefined;
  console.log(`Global variable Hooks cleared`);
});
