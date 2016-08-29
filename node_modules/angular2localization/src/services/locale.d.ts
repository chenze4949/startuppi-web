/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
import { LocaleService } from './locale.service';
import { LocalizationService } from './localization.service';
/**
 * Locale superclass.
 * Provides the methods for localization.
 *
 * Extend this class in components to provide the necessary methods for localization:
 *
 * export class AppComponent extends Locale {
 *
 *     constructor(public locale: LocaleService, public localization: LocalizationService) {
 *         super(locale, localization);
 *
 *     }
 *
 * }
 *
 * @author Roberto Simonetti
 */
export declare class Locale {
    locale: LocaleService;
    localization: LocalizationService;
    constructor(locale?: LocaleService, localization?: LocalizationService);
    lang: string;
    defaultLocale: string;
    currency: string;
}
