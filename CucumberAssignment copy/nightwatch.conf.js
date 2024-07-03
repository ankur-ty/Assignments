// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

const additonalEnvironments = require("./environments");

if(!additonalEnvironments.test_settings)
  additonalEnvironments.test_settings = {};

const bstackOptions = {
  'bstack:options' : {
    "os" : "OS X",
    "osVersion" : "Big Sur",
    "buildName" : "browserstack-build-1",
    "sessionName" : "BStack nightwatch snippet",
    "source": "nightwatch:sample-sdk:v1.0",
    "seleniumVersion" : "4.0.0",
    userName: '',
    accessKey: ''
  },
}

const browserStack = {
  webdriver: {
    start_process: false,
    timeout_options: {
      timeout: 120000,
      retry_attempts: 3
    },
    keep_alive: true
  },

  selenium: {
    host: 'hub.browserstack.com',
    port: 443
  },

  desiredCapabilities: {
    browserName: 'chrome',
    ...bstackOptions
  }
}

const nightwatchConfigs = {
  src_folders: ['/Users/ankurtyagi/Assignments/CucumberAssignment/test'],
  page_objects_path: ['/Users/ankurtyagi/Assignments/CucumberAssignment/pages'],
  live_output: true,
  plugins: ['@nightwatch/browserstack'],
  '@nightwatch/browserstack': {
    browserstackLocal: true // set true to manage browserstack local tunnel. Defaults to false.
  },

  test_runner: {
    // set cucumber as the runner
    // For more info on using CucumberJS with Nightwatch, visit:
    // https://nightwatchjs.org/guide/writing-tests/using-cucumberjs.html
    type: 'cucumber',

    // define cucumber specific options
    options: {
      //set the feature path
      feature_path: 'test',

      // start the webdriver session automatically (enabled by default)
      // auto_start_session: true

      // use parallel execution in Cucumber
      // parallel: 2 // set number of workers to use (can also be defined in the cli as --parallel 2
    }
  },

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org'
    },

    browserstack:  {
      ...browserStack
    },

    "browserstack.chrome": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'chrome',
        ...bstackOptions
      }
    },
    "browserstack.firefox": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'firefox',
        ...bstackOptions
      }
    },
    "browserstack.edge": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'Edge',
        ...bstackOptions
      }
    }
  }
}

for(let key in additonalEnvironments.test_settings) {
  nightwatchConfigs.test_settings[key] = {
    ...browserStack,
    ...additonalEnvironments.test_settings[key]
  };
}

module.exports = nightwatchConfigs;
