// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApiUrlDomain: '',
  loginurl: 'https://the3dsoft.com/users/v1/user/signin',
  SignupUrl: 'https://the3dsoft.com:443/users/v1/user',
  UserDetailUrl: 'https://the3dsoft.com/users/v1/user/',
  GoogleProvider: '829933291449-vllt35i1gstpp5mbto59rec5ed62l8o5.apps.googleusercontent.com',
  FacebookProvider: '196401391240067',
  UpdateUserProfile: 'https://the3dsoft.com/users/v1/user/id/{id}',
  UpdateThemeProfile: 'https://the3dsoft.com/users/v1/user/theme/id/{id}',
  UpdatePasswordProfile: 'https://the3dsoft.com/users/v1/user/authtoken/id/{id}',
  UpdateMenuProfile: 'https://the3dsoft.com/users/v1/user/menutype/id/{id}',
  createOrderUrl: 'https://the3dsoft.com/wmse2e/api/wms-tests/createOrders',
  endToEndTestUrl: 'https://the3dsoft.com/wmse2e/api/wms-tests'

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
