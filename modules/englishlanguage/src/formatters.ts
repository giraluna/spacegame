import { EnglishName } from "./EnglishName";


export const formatters =
{
  capitalize: (s: string, locale: string, formatterOutput?: string) =>
  {
    // example: "_, capitalize, {name, possessiveName}"
    if (formatterOutput)
    {
      return formatterOutput.charAt(0).toUpperCase() + formatterOutput.slice(1);
    }
    // example "{displayName, capitalize}"
    else
    {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  },
  possessiveName: (name: EnglishName) =>
  {
    const lastChar = name.baseName[name.baseName.length - 1];

    if (lastChar === "s")
    {
      return name.baseName + "'";
    }
    else
    {
      return name.baseName + "'s";
    }
  },
  pronoun: (name: EnglishName, locale: string, form: string) => name.languageSpecificTags.pronouns[form],
  wasWere: (name: EnglishName) => name.languageSpecificTags.isPlural ? "were" : "was",
  sVerb: (name: EnglishName, locale: string, verbStem: string) => name.languageSpecificTags.isPlural ? verbStem : verbStem + "s",
  esVerb: (name: EnglishName, locale: string, verbStem: string) => name.languageSpecificTags.isPlural ? verbStem : verbStem + "es",
};
