// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDmRs3RgHxNoDHE8lCcuh2daShCqOuRcJY",
    authDomain: "rh-groceries.firebaseapp.com",
    databaseURL: "https://rh-groceries.firebaseio.com",
    projectId: "rh-groceries",
    storageBucket: "rh-groceries.appspot.com",
    messagingSenderId: "65234419210"
  },
  registryToken: "794b06ed-83c3-40a1-89d8-94a1dd478ffc"
};
