import { MissingTranslationHandler, MissingTranslationHandlerParams } from "@ngx-translate/core";

export class MissingTranslationService implements MissingTranslationHandler {
  // tslint:disable-next-line:typedef
  handle(params: MissingTranslationHandlerParams) {
    return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
  }
}
