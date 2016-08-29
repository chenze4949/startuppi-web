export * from  './file-upload/file-select.directive';
export * from  './file-upload/file-drop.directive';
export * from  './file-upload/file-uploader.class';

import {FileSelectDirective} from './file-upload/file-select.directive';
import {FileDropDirective} from './file-upload/file-drop.directive';

export const FILE_UPLOAD_DIRECTIVES:[any] = [FileSelectDirective, FileDropDirective];

export default {
  directives: [
    FILE_UPLOAD_DIRECTIVES
  ]
};
