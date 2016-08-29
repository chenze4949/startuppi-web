/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
import { PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';
import { LocaleService } from '../services/locale.service';
/**
 * 'translate' pipe function.
 */
export declare class TranslatePipe implements PipeTransform {
    localization: LocalizationService;
    locale: LocaleService;
    constructor(localization: LocalizationService, locale: LocaleService);
    /**
     * TranslatePipe transform method.
     *
     * @param key The key to be translated
     * @param lang The current language code for the LocalizationService
     * @return The value of translation
     */
    transform(key: string, lang: string): string;
}
