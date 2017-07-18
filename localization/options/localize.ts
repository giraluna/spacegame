import * as Languages from "../defaultLanguages";

import {Localizer} from "../../src/localization/Localizer";

import {options as enOptions} from "./en";

export const localizer = new Localizer<typeof enOptions>("options");
localizer.registerTexts(enOptions, Languages.en);

export const localizeF: typeof localizer.localize = localizer.localize.bind(localizer);
export function localize(key: keyof typeof enOptions): string
{
  return localizeF(key).format();
}
