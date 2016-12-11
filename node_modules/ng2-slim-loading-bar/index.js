// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-slim-loading-bar
import { NgModule } from "@angular/core";
import { SlimLoadingBarComponent } from './src/slim-loading-bar.component';
import { SlimLoadingBarService, slimLoadingBarServiceFactory } from './src/slim-loading-bar.service';
export * from './src/slim-loading-bar.component';
export * from './src/slim-loading-bar.service';
export var providers = [{ provide: SlimLoadingBarService, useFactory: slimLoadingBarServiceFactory }];
export var SlimLoadingBarModule = (function () {
    function SlimLoadingBarModule() {
    }
    SlimLoadingBarModule.forRoot = function () {
        return {
            ngModule: SlimLoadingBarModule,
            providers: providers
        };
    };
    SlimLoadingBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SlimLoadingBarComponent],
                    exports: [SlimLoadingBarComponent],
                    providers: providers
                },] },
    ];
    /** @nocollapse */
    SlimLoadingBarModule.ctorParameters = [];
    return SlimLoadingBarModule;
}());
