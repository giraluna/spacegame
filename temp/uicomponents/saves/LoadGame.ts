/// <reference path="../../../lib/react-0.13.3.d.ts" />
import ListItem from "../../../temp/uicomponents/unitlist/ListItem.d.ts"; // TODO refactor | autogenerated

import app from "../../App.ts"; // TODO refactor | autogenerated
import * as React from "react";

/// <reference path="../popups/popupmanager.ts"/>
/// <reference path="savelist.ts"/>


import SaveList from "./SaveList.ts";
import PopupManager from "../popups/PopupManager.ts";
import ConfirmPopup from "../popups/ConfirmPopup.ts";


interface PropTypes extends React.Props<any>
{
  handleClose: any; // TODO refactor | define prop type 123
}

interface StateType
{
  saveKeysToDelete?: any; // TODO refactor | define state type 456
  saveKey?: any; // TODO refactor | define state type 456
}

interface RefTypes extends React.Refs
{
  okButton: HTMLElement;
  popupManager: React.Component<any, any>; // TODO refactor | correct ref type 542 | PopupManager
}

export class LoadGameComponent extends React.Component<PropTypes, StateType>
{
  displayName: string = "LoadGame";
  popupId: reactTypeTODO_any = undefined;

  state: StateType;
  refsTODO: RefTypes;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.state = this.getInitialState();
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateClosePopup = this.updateClosePopup.bind(this);
    this.overRideLightBoxClose = this.overRideLightBoxClose.bind(this);
    this.handleUndoDelete = this.handleUndoDelete.bind(this);
    this.deleteSelectedKeys = this.deleteSelectedKeys.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.getClosePopupContent = this.getClosePopupContent.bind(this);
    this.handleDelete = this.handleDelete.bind(this);    
  }
  
  private getInitialState(): StateType
  {
    return(
    {
      saveKeysToDelete: [],
      saveKey: null
    });
  }
  
  componentDidMount()
  {
    React.findDOMNode<HTMLElement>(this.ref_TODO_okButton).focus();
  }

  handleRowChange(row: ListItem)
  {
    this.setState(
    {
      saveKey: row.data.storageKey
    });
    this.handleUndoDelete(row.data.storageKey);
  }
  handleLoad()
  {
    var saveKey = this.state.saveKey;

    var afterConfirmFN = function()
    {
      // https://github.com/facebook/react/issues/2988
      // https://github.com/facebook/react/issues/2605#issuecomment-118398797
      // without this react will keep a reference to this element causing a big memory leak
      React.findDOMNode<HTMLElement>(this.ref_TODO_okButton).blur();
      window.setTimeout(function()
      {
        app.load(saveKey);
      }, 5);
    }.bind(this);

    if (this.state.saveKeysToDelete.indexOf(saveKey) !== -1)
    {
      var boundClose = this.handleClose.bind(this, true, afterConfirmFN);
      this.handleUndoDelete(saveKey, boundClose);
    }
    else
    {
      this.handleClose(true, afterConfirmFN);
    }
  }
  deleteSelectedKeys()
  {
    this.popupId = this.ref_TODO_popupManager.makePopup(
    {
      contentConstructor: ConfirmPopup,
      contentProps: this.getClosePopupContent(null, false, false)
    });
  }
  getClosePopupContent(afterCloseCallback?: Function, shouldCloseParent: boolean = true;
    shouldUndoAll: boolean = false)
  {
    var deleteFN = function()
    {
      for (var i = 0; i < this.state.saveKeysToDelete.length; i++)
      {
        localStorage.removeItem(this.state.saveKeysToDelete[i]);
      }

      this.setState(
      {
        saveKeysToDelete: []
      });
    }.bind(this);
    var closeFN = function()
    {
      this.popupId = undefined;
      if (shouldCloseParent)
      {
        this.props.handleClose();
      }
      if (shouldUndoAll)
      {
        this.setState(
        {
          saveKeysToDelete: []
        });
      }
      if (afterCloseCallback) afterCloseCallback();
    }.bind(this);

    var confirmText = ["Are you sure you want to delete the following saves?"];
    confirmText  = confirmText.concat(this.state.saveKeysToDelete.map(function(saveKey: string)
    {
      return saveKey.replace("Save.", "");
    }));

    return(
    {
      handleOk: deleteFN,
      handleClose: closeFN,
      contentText: confirmText
    });
  }
  updateClosePopup()
  {
    if (isFinite(this.popupId))
    {
      this.ref_TODO_popupManager.setPopupContent(this.popupId,
        {contentText: this.getClosePopupContent().contentText});
    }
    else if (this.state.saveKeysToDelete.length < 1)
    {
      if (isFinite(this.popupID)) this.ref_TODO_popupManager.closePopup(this.popupId);
      this.popupId = undefined;
    }
  }
  handleClose(deleteSaves: boolean = true, afterCloseCallback?: Function)
  {
    if (!deleteSaves || this.state.saveKeysToDelete.length < 1)
    {
      this.props.handleClose();
      if (afterCloseCallback) afterCloseCallback();
      return;
    }

    this.popupId = this.ref_TODO_popupManager.makePopup(
    {
      contentConstructor: ConfirmPopup,
      contentProps: this.getClosePopupContent(afterCloseCallback, true, true)
    });
  }
  handleDelete(saveKey: string)
  {
    this.setState(
    {
      saveKeysToDelete: this.state.saveKeysToDelete.concat(saveKey)
    }, this.updateClosePopup);
  }
  handleUndoDelete(saveKey: string, callback?: Function)
  {
    var afterDeleteFN = function()
    {
      this.updateClosePopup();
      if (callback) callback();
    }
    var i = this.state.saveKeysToDelete.indexOf(saveKey)
    if (i !== -1)
    {
      var newsaveKeysToDelete = this.state.saveKeysToDelete.slice(0);
      newsaveKeysToDelete.splice(i, 1);
      this.setState(
      {
        saveKeysToDelete: newsaveKeysToDelete
      }, afterDeleteFN);
    }
  }
  overRideLightBoxClose()
  {
    this.handleClose();
  }

  render()
  {
    return(
      React.DOM.div(
      {
        className: "save-game"
      },
        PopupManager(
        {
          ref: (component: TODO_TYPE) =>
{
  this.ref_TODO_popupManager = component;
},
          onlyAllowOne: true
        }),
        SaveList(
        {
          onRowChange: this.handleRowChange,
          autoSelect: !Boolean(app.game.gameStorageKey),
          selectedKey: app.game.gameStorageKey,
          allowDelete: true,
          onDelete: this.handleDelete,
          onUndoDelete: this.handleUndoDelete,
          saveKeysToDelete: this.state.saveKeysToDelete
        }),
        React.DOM.input(
        {
          className: "save-game-name",
          type: "text",
          value: this.state.saveKey ? this.state.saveKey.replace("Save.", "") : "",
          readOnly: true
        }),
        React.DOM.div(
        {
          className: "save-game-buttons-container"
        },
          React.DOM.button(
          {
            className: "save-game-button",
            onClick: this.handleLoad,
            ref: (component: TODO_TYPE) =>
{
  this.ref_TODO_okButton = component;
}
          }, "Load"),
          React.DOM.button(
          {
            className: "save-game-button",
            onClick: this.handleClose.bind(this, true, null)
          }, "Cancel"),
          React.DOM.button(
          {
            className: "save-game-button",
            onClick: this.deleteSelectedKeys,
            disabled: this.state.saveKeysToDelete.length < 1
          },
            "Delete"
          )
        )
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(LoadGameComponent);
export default Factory;
