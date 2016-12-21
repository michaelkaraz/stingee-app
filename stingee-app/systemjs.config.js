/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
        System.config({
            paths: {
                // paths serve as alias
                'npm:': 'node_modules/'
            },
            // map tells the System loader where to look for things
            map: {
                // our app is within the app folder
                app: 'app',
                // angular bundles
                '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
                '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
                '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
                '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
                '@angular/platform-browser-dynamic':
                    'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
                '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
                '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
                '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
                '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
                'angular2-mdl': 'https://unpkg.com/angular2-mdl@latest/bundle/angular2-mdl.js',
                'angular2-infinite-scroll': 'node_modules/angular2-infinite-scroll',
                // other libraries
                'rxjs': 'npm:rxjs',
                'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
                "angular2-masonry": "node_modules/angular2-masonry",
                "masonry-layout": "node_modules/masonry-layout/dist/masonry.pkgd.js",
                'angular2-google-maps': 'node_modules/angular2-google-maps'
    },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-infinite-scroll': {
                main: 'angular2-infinite-scroll.js',
                defaultExtension: 'js'
            },
            "angular2-masonry": {
                 "defaultExtension": "js", "main": "index"
            },
            'angular2-google-maps/core': {
                main: "index.js",
                defaultExtension: 'js'
                
            }
            
        }
    });
})(this);
