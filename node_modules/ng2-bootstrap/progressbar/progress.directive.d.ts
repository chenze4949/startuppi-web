import { BarComponent } from './bar.component';
export declare class ProgressDirective {
    animate: boolean;
    max: number;
    addClass: boolean;
    bars: any[];
    protected _max: number;
    addBar(bar: BarComponent): void;
    removeBar(bar: BarComponent): void;
}
