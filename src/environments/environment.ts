// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var apiProtocol = '';
var apiHost = '';
if (typeof window !== 'undefined') {
     apiProtocol = window.location.protocol+'//';
     apiHost = window.location.hostname
 }
 // Local Url For Api-------------
const apiPort = ":9000"
//const apiPort = ":8000"
export const apiBaseUrl = apiProtocol+apiHost+apiPort 
export const apiUrl = apiBaseUrl+'/api'
export const imageUrl = apiBaseUrl+'/api/media/image-resize'

export const environment = {
  production: false,
    baseUrl: apiUrl,
   imageUrl: imageUrl, 
  // baseUrl: 'http://192.168.100.59:4200/api',
  // imageUrl: 'http://192.168.100.59:4200/api/media/image-resize', 
  productUrl: 'http://localhost:3001/',
  pluginUrl: 'http://localhost:8000/login',
  s3BucketUrl: 'https://lgpl-prod-s3-bucket.s3.amazonaws.com'
};

export const devMode = "ON"
export const videoUrl = 'https://lgpl-uat-s3-bukcet.s3.amazonaws.com/'

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
