// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:3000/api',
};

export const devConfig = {
    port: 3000,
    database: 'invoice-builder',
    secrete: 'AHSDEUIYEIUER',
    frontendURL: 'http://localhost:4200',
    google: {
      clientId: '933360060968-rd1pnbimtpbn89dtergfdroip2qbk7df.apps.googleusercontent.com',
      clientSecret: '84GJY1kSfFCN3sIs-ilNTopp',
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    twitter: {
      consumerKey: 'dFRt0qpQ564CfsRj2Q8CzztdB',
      consumerSecret: 'ymhQctr7r6FYTWKfcKG1FjPQGyHTTBdeIOvP8h3f301UpgA1VT',
      callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
    },
    github: {
      clientId: 'acfaeff7536a05ae4f1e',
      clientSecret: 'ab7cd9c7e62e2e6d4aee2f3e34429af5e21367c7',
      callbackURL: 'http://localhost:3000/api/auth/github/callback',
    },
    ethereal: {
      username: 'hljs5f6aws3hkufc@ethereal.email',
      password: 'HBVF1EVqtEwUwTH8bw',
      host: 'smtp.ethereal.email',
      port: 587,
    },
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
