import * as React from "react";

import app from "../../App"; // TODO global
import {activeModuleData} from "../../activeModuleData";
import {Language} from "../../localization/Language";
import
{
  setActiveLanguageCode,
} from "../../localization/activeLanguage";
import
{
  getLanguagesByCode,
  getLanguageSupportLevelForModuleFiles,
} from "../../localization/languageSupport";

import {default as LanguageSelect} from "./LanguageSelect";


interface PropTypes extends React.Props<any>
{
  activeLanguage: Language;
  onChange?: () => void;
}

interface StateType
{
}

export class AppLanguageSelectComponent extends React.Component<PropTypes, StateType>
{
  public displayName = "AppLanguageSelect";
  public state: StateType;

  constructor(props: PropTypes)
  {
    super(props);

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  public render()
  {
    return(
      LanguageSelect(
      {
        activeLanguage: this.props.activeLanguage,
        availableLanguagesByCode: getLanguagesByCode(...activeModuleData.moduleFiles),
        languageSupportLevelByCode: getLanguageSupportLevelForModuleFiles(...activeModuleData.moduleFiles),
        onChange: this.handleLanguageChange,
      })
    );
  }

  private handleLanguageChange(newLanguage: Language): void
  {
    setActiveLanguageCode(newLanguage.code);
    localStorage.setItem("Rance.language", newLanguage.code);
    app.reactUI.render();
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(AppLanguageSelectComponent);
export default Factory;
