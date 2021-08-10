// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBackend: /*'http://back.academiacomarca.com/api/'*/'http://127.0.0.1:8000/api/',
  firebaseConfig: {
    apiKey: "AIzaSyAafTdK8jv2cfWjW105c4AnH_oHxqyq7PU",
    authDomain: "lms-academia-a582f.firebaseapp.com",
    projectId: "lms-academia-a582f",
    storageBucket: "lms-academia-a582f.appspot.com",
    messagingSenderId: "927465450199",
    appId: "1:927465450199:web:f2d6d885318ae5c7109e92",
    measurementId: "G-NFF115FXGG"
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
