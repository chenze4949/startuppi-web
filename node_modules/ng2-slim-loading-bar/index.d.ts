import { ModuleWithProviders } from "@angular/core";
import { SlimLoadingBarService } from './src/slim-loading-bar.service';
export * from './src/slim-loading-bar.component';
export * from './src/slim-loading-bar.service';
export declare let providers: {
    provide: typeof SlimLoadingBarService;
    useFactory: () => SlimLoadingBarService;
}[];
export declare class SlimLoadingBarModule {
    static forRoot(): ModuleWithProviders;
}
