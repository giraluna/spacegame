import {Localizer} from "core/localization/Localizer";
import {englishLanguage} from "modules/englishlanguage/englishLanguage";
import {terrains as en_terrains} from "./en/terrains";


const allMessages =
{
  ...en_terrains,
};

export const localizer = new Localizer<typeof allMessages>("spaceTerrains");
localizer.setAll(allMessages, englishLanguage);

export const localize = localizer.localize.bind(localizer);
