const { Before, After } = require('@cucumber/cucumber');

Before('@setup', function () {
  // This hook will run before scenarios tagged with @setup
  global.Hooks = 1;
  console.log(`Global variable Hooks set to: ${global.someGlobalVar}`);
});

After('@teardown', function () {
  // This hook will run after scenarios tagged with @teardown
  global.someGlobalVar = undefined;
  console.log(`Global variable Hooks cleared`);
});
