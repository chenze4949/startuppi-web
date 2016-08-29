/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */

(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    '@angular2-material': 'node_modules/@angular2-material',
    'angular2-autosize':'node_modules/angular2-autosize',
    "ng2-dropdown": "node_modules/ng2-dropdown",
    "ng2-tabs": "node_modules/ng2-tabs",
    'ng2-bootstrap': 'node_modules/ng2-bootstrap',
    'moment': 'node_modules/moment/moment.js',
    'angular2localization': 'node_modules/angular2localization',
    'ng2-bs3-modal': 'node_modules/ng2-bs3-modal',
    'jquery': 'https://code.jquery.com/jquery-2.2.3.min.js',
    'owl-carousel': 'https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js',
    'angular2-swiper': 'node_modules/angular2-swiper',
    'swiper': 'node_modules/swiper',
    'ng2-slim-loading-bar': 'node_modules/ng2-slim-loading-bar'
  };

  var  meta = {
    'owl-carousel': {deps: ['jquery']}
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    '@angular2-material/core': {main:'core.js'},
    '@angular2-material/button': {main:'button.js'},
    '@angular2-material/checkbox': {main:'checkbox.js'},
    '@angular2-material/tabs': {main:'tabs.js'},
    '@angular2-material/progress-circle': {main:'progress-circle.js'},
    '@angular2-material/sidenav': {main:'sidenav.js'},
    "ng2-dropdown": { "main": "index.js", "defaultExtension": "js" },
    "ng2-tabs": { "main": "index.js", "defaultExtension": "js" },
    "ng2-bootstrap": { "main": "index.js", "defaultExtension": "js" },
    "angular2-autosize": { "main": "index.js", "defaultExtension": "js" },
    'angular2localization': { main: '/bundles/angular2localization.umd.min.js', defaultExtension: 'js' },
    'ng2-bs3-modal': { main: '/bundles/ng2-bs3-modal.js', defaultExtension: 'js' },
    'angular2-swiper': {
      main: 'dist/ks-swiper.js',
      defaultExtension: 'js'
    },
    'swiper': {
      main: 'dist/js/swiper.js',
      defaultExtension: 'js'
    },
    'ng2-slim-loading-bar':  { main: 'index.js',  defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
