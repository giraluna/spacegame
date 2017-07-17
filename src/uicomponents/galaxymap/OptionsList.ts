/// <reference path="../../../lib/react-global.d.ts" />

import NotificationLog from "../../NotificationLog";
import Options from "../../Options";
import eventManager from "../../eventManager";
import TutorialStatus from "../../tutorials/TutorialStatus";

import {Language} from "../../localization/Language";

import NotificationFilterButton from "../notifications/NotificationFilterButton";

import {default as DialogBox} from "../windows/DialogBox";

import {default as AppLanguageSelect} from "../language/AppLanguageSelect";

import OptionsCheckbox from "./OptionsCheckbox";
import OptionsGroup from "./OptionsGroup";
import OptionsNumericField from "./OptionsNumericField";

import {localize} from "../../../localization/options/localize";


export interface PropTypes extends React.Props<any>
{
  log: NotificationLog;
  activeLanguage: Language;
}

interface StateType
{
  hasConfirmResetAllDialog?: boolean;
}

export class OptionsListComponent extends React.Component<PropTypes, StateType>
{
  public displayName: string = "OptionsList";
  public state: StateType;

  constructor(props: PropTypes)
  {
    super(props);

    this.state =
    {
      hasConfirmResetAllDialog: false,
    };

    this.bindMethods();
  }

  public render()
  {
    const allOptions: React.ReactElement<any>[] = [];

    const languageOptions: any[] = [];

    languageOptions.push(
    {
      key: "selectAppLanguage",
      content: AppLanguageSelect(
      {
        activeLanguage: this.props.activeLanguage,
      }),
    });

    allOptions.push(OptionsGroup(
    {
      key: "language",
      header: localize("language"),
      options: languageOptions,
      activeLanguage: this.props.activeLanguage,
    }));

    const battleAnimationOptions: any[] = [];

    const battleAnimationStages =
    [
      {
        stage: "before",
        displayName: localize("beforeAbility"),
        min: 0,
        max: 5000,
        step: 100,
      },
      {
        stage: "effectDuration",
        displayName: localize("abilityEffectDuration"),
        min: 0,
        max: 10,
        step: 0.1,
      },
      {
        stage: "after",
        displayName: localize("afterAbility"),
        min: 0,
        max: 5000,
        step: 100,
      },
      {
        stage: "unitEnter",
        displayName: localize("unitEnter"),
        min: 0,
        max: 1000,
        step: 50,
      },
      {
        stage: "unitExit",
        displayName: localize("unitExit"),
        min: 0,
        max: 1000,
        step: 50,
      },
      {
        stage: "turnTransition",
        displayName: localize("turnTransition"),
        min: 0,
        max: 2000,
        step: 100,
      },
    ];
    for (let i = 0; i < battleAnimationStages.length; i++)
    {
      const props = battleAnimationStages[i];
      const stage = props.stage;

      battleAnimationOptions.push(
        {
          key: stage,
          content: OptionsNumericField(
          {
            label: props.displayName,
            id: "options-battle-animation-" + stage,
            value: Options.battleAnimationTiming[stage],
            min: props.min,
            max: props.max,
            step: props.step,
            onChange: (value: number) =>
            {
              Options.battleAnimationTiming[stage] = value;
              this.forceUpdate();
            },
          }),
        },
      );
    }


    allOptions.push(OptionsGroup(
    {
      key: "battleAnimationOptions",
      header: localize("battleAnimationTiming"),
      options: battleAnimationOptions,
      activeLanguage: this.props.activeLanguage,
      resetFN: () =>
      {
        Options.setDefaultForCategory("battleAnimationTiming");
        this.forceUpdate();
      },
    }));

    const debugOptions: any[] = [];
    debugOptions.push(
    {
      key: "debugMode",
      content:
        OptionsCheckbox(
        {
          isChecked: Options.debug.enabled,
          label: localize("debugMode"),
          onChangeFN: () =>
          {
            Options.debug.enabled = !Options.debug.enabled;
            this.forceUpdate();
            eventManager.dispatchEvent("renderUI");
          },
        }),
    });

    if (Options.debug.enabled)
    {
      debugOptions.push(
      {
        key: "battleSimulationDepth",
        content: React.DOM.div(
        {

        },
          OptionsNumericField(
          {
            label: localize("aiVsAiBattleSimulationDepth"),
            id: "battle-simulation-depth-input",
            value: Options.debug.battleSimulationDepth,
            min: 1,
            max: 500,
            step: 1,
            onChange: value =>
            {
              Options.debug.battleSimulationDepth = value;
              this.forceUpdate();
            },
          }),
        ),
      });
    }


    allOptions.push(OptionsGroup(
    {
      key: "debug",
      header: localize("debug"),
      options: debugOptions,
      activeLanguage: this.props.activeLanguage,
      resetFN: () =>
      {
        Options.setDefaultForCategory("debug");
        this.forceUpdate();
      },
    }));

    const uiOptions: any[] = [];
    uiOptions.push(
    {
      key: "noHamburger",
      content:
        OptionsCheckbox(
        {
          isChecked: Options.ui.noHamburger,
          label: localize("alwaysExpandTopRightMenuOnLowResolution"),
          onChangeFN: () =>
          {
            Options.ui.noHamburger = !Options.ui.noHamburger;
            eventManager.dispatchEvent("updateHamburgerMenu");
            this.forceUpdate();
          },
        }),
    });

    uiOptions.push(
    {
      key: "notificationLogFilter",
      content: NotificationFilterButton(
      {
        filter: this.props.log.notificationFilter,
        text: localize("messageSettings"),
        highlightedOptionKey: null,
        activeLanguage: this.props.activeLanguage,
      }),
    });

    uiOptions.push(
    {
      key: "resetTutorials",
      content: React.DOM.button(
      {
        className: "reset-tutorials-button",
        onClick: TutorialStatus.reset,
      },
        localize("resetTutorials"),
      ),
    });

    allOptions.push(OptionsGroup(
    {
      key: "ui",
      header: localize("ui"),
      options: uiOptions,
      activeLanguage: this.props.activeLanguage,
      resetFN: () =>
      {
        Options.setDefaultForCategory("ui");
      },
    }));


    const displayOptions: any[] = [];
    displayOptions.push(
    {
      key: "borderWidth",
      content: OptionsNumericField(
      {
        label: localize("borderWidth"),
        id: "options-border-width",
        min: 0,
        max: 50,
        step: 1,
        value: Options.display.borderWidth,
        onChange: (value: number) =>
        {
          Options.display.borderWidth = value;
          eventManager.dispatchEvent("renderMap");
          this.forceUpdate();
        },
      }),
    });

    allOptions.push(OptionsGroup(
    {
      key: "display",
      header: localize("display"),
      options: displayOptions,
      activeLanguage: this.props.activeLanguage,
      resetFN: () =>
      {
        Options.setDefaultForCategory("display");
        this.forceUpdate();
      },
    }));

    return(
      React.DOM.div({className: "options"},

        !this.state.hasConfirmResetAllDialog ? null :
          DialogBox(
          {
            title: localize("resetAllOptions"),
            handleOk: () =>
            {
              Options.setDefaults();
              this.closeResetAllOptionsDialog();
            },
            handleCancel: () =>
            {
              this.closeResetAllOptionsDialog();
            },
          },
          localize("areYouSureYouWantToResetAllOptions"),
        ),

        React.DOM.div({className: "options-header"},
          React.DOM.button(
          {
            className: "reset-options-button reset-all-options-button",
            onClick: this.openResetAllOptionsDialog,
          },
            localize("resetAllOptions"),
          ),
        ),
        allOptions,
      )
    );
  }

  private bindMethods()
  {
    this.openResetAllOptionsDialog = this.openResetAllOptionsDialog.bind(this);
    this.closeResetAllOptionsDialog = this.closeResetAllOptionsDialog.bind(this);
  }
  private openResetAllOptionsDialog()
  {
    this.setState(
    {
      hasConfirmResetAllDialog: true,
    });
  }
  private closeResetAllOptionsDialog()
  {
    this.setState(
    {
      hasConfirmResetAllDialog: false,
    });
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(OptionsListComponent);
export default Factory;
