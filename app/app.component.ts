import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: 'app-root',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent { 

    private sub: any;
    events: any[];
    constructor(
        private slimLoadingBarService: SlimLoadingBarService
        ) { }

    ngOnInit(){
        
    }

    startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }
}
