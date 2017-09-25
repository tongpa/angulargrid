/** Add Transpiler for Typescript */
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    '.': {
      defaultExtension: 'ts'
    },
    'vendor': {
      defaultExtension: 'js'
    }
  }
});

System.config({
  map: {
    'main': 'main.js',

    // Angular specific mappings.
    '@angular/core': '/javascript/node_modules/@angular/core/bundles/core.umd.js', //'https://unpkg.com/@angular/core/bundles/core.umd.js',
    '@angular/animations': '/javascript/node_modules/@angular/animations/bundles/animations.umd.js', //'https://unpkg.com/@angular/animations/bundles/animations.umd.js',
    '@angular/common': '/javascript/node_modules/@angular/common/bundles/common.umd.js', //'https://unpkg.com/@angular/common/bundles/common.umd.js',
    '@angular/compiler': '/javascript/node_modules/@angular/compiler/bundles/compiler.umd.js', //'https://unpkg.com/@angular/compiler/bundles/compiler.umd.js',
    '@angular/http': '/javascript/node_modules/@angular/http/bundles/http.umd.js', //'https://unpkg.com/@angular/http/bundles/http.umd.js',
    '@angular/forms': '/javascript/node_modules/@angular/forms/bundles/forms.umd.js', //'https://unpkg.com/@angular/forms/bundles/forms.umd.js',
    '@angular/router': '/javascript/node_modules/@angular/router/bundles/router.umd.js', //'https://unpkg.com/@angular/router/bundles/router.umd.js',
    '@angular/platform-browser': '/javascript/node_modules/@angular/platform-browser/bundles/platform-browser.umd.js', //'https://unpkg.com/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': '/javascript/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js', //'https://unpkg.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/animations/browser': '/javascript/node_modules/@angular/animations/bundles/animations-browser.umd.js', //'https://unpkg.com/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': '/javascript/node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js', //'https://unpkg.com/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/material': '/javascript/node_modules/@angular/material/bundles/material.umd.js', //'https://unpkg.com/@angular/material/bundles/material.umd.js',
    '@angular/cdk': '/javascript/node_modules/@angular/cdk/bundles/cdk.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk.umd.js',
    '@angular/cdk/a11y': '/javascript/node_modules/@angular/cdk/bundles/cdk-a11y.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/bidi': '/javascript/node_modules/@angular/cdk/bundles/cdk-bidi.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': '/javascript/node_modules/@angular/cdk/bundles/cdk-coercion.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/collections': '/javascript/node_modules/@angular/cdk/bundles/cdk-collections.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/keycodes': '/javascript/node_modules/@angular/cdk/bundles/cdk-keycodes.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/observers': '/javascript/node_modules/@angular/cdk/bundles/cdk-observers.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': '/javascript/node_modules/@angular/cdk/bundles/cdk-overlay.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/platform': '/javascript/node_modules/@angular/cdk/bundles/cdk-platform.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': '/javascript/node_modules/@angular/cdk/bundles/cdk-portal.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': '/javascript/node_modules/@angular/cdk/bundles/cdk-rxjs.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/scrolling': '/javascript/node_modules/@angular/cdk/bundles/cdk-scrolling.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/stepper': '/javascript/node_modules/@angular/cdk/bundles/cdk-stepper.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-stepper.umd.js',
    '@angular/cdk/table': '/javascript/node_modules/@angular/cdk/bundles/cdk-table.umd.js', //'https://unpkg.com/@angular/cdk/bundles/cdk-table.umd.js',

    // Rxjs mapping
    'rxjs': '/javascript/node_modules/rxjs', //'https://unpkg.com/rxjs',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});
