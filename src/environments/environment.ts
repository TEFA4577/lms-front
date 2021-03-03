// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBackend: 'http://127.0.0.1:8000/api/',
  firebaseConfig: {
    apiKey: 'AIzaSyAGZh27gXIgs3L2nQieygZZ2j099o1Tbk4',
    authDomain: 'lms-proyect.firebaseapp.com',
    databaseURL: 'https://lms-proyect.firebaseio.com',
    projectId: 'lms-proyect',
    storageBucket: 'lms-proyect.appspot.com',
    messagingSenderId: '567350224438',
    appId: '1:567350224438:web:782f8cf103454ec65a5a97',
    measurementId: 'G-W8CRBJC34X'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
