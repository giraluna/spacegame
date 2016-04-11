/// <reference path="../../../lib/react-0.13.3.d.ts" />


import SubEmblemTemplate from "../../../src/templateinterfaces/SubEmblemTemplate.d.ts";


import app from "../../../src/App.ts"; // TODO refactor | autogenerated
import * as React from "react";

export interface PropTypes extends React.Props<any>
{
  handleSelectEmblem: any; // TODO refactor | define prop type 123
  hasImageFailMessage: any; // TODO refactor | define prop type 123
  uploadFiles: any; // TODO refactor | define prop type 123
  flag: any; // TODO refactor | define prop type 123
}

interface StateType
{
  // TODO refactor | add state type
}

class FlagPicker_COMPONENT_TODO extends React.Component<PropTypes, StateType>
{
  displayName: string = "FlagPicker";
  state: StateType;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.state = this.getInitialState();
    
    this.bindMethods();
  }
  private bindMethods()
  {
    
  }
  
  private getInitialState(): StateType
  {
    var initialEmblem: SubEmblemTemplate = null;
    if (this.props.flag.foregroundEmblem)
    {
      initialEmblem = this.props.flag.foregroundEmblem.inner;
    }
    return(
    {
      selectedEmblem: initialEmblem
    });
  }

  handleSelectEmblem(emblemTemplate: SubEmblemTemplate)
  {
    if (this.state.selectedEmblem === emblemTemplate && emblemTemplate !== null)
    {
      this.clearSelectedEmblem();
      return;
    }
    React.findDOMNode(this.refs.imageUploader).value = null;
    this.props.handleSelectEmblem(emblemTemplate);
    this.setState({selectedEmblem: emblemTemplate});
  }

  clearSelectedEmblem()
  {
    this.handleSelectEmblem(null);
  }

  handleUpload()
  {
    if (!this.props.uploadFiles) throw new Error();

    var files = React.findDOMNode(this.refs.imageUploader).files;

    this.props.uploadFiles(files);
  }
  makeEmblemElement(template: SubEmblemTemplate)
  {
    var className = "emblem-picker-image";
    if (this.state.selectedEmblem &&
      this.state.selectedEmblem.key === template.key)
    {
      className += " selected-emblem";
    }

    return(
      React.DOM.div(
      {
        className: "emblem-picker-container",
        key: template.key,
        onClick: this.handleSelectEmblem.bind(this, template)
      },
        React.DOM.img(
        {
          className: className,
          src: app.images[template.src].src
        })
      )
    );
  }

  render()
  {
    var emblems: any[] = [];

    for (var emblemType in app.moduleData.Templates.SubEmblems)
    {
      var template = app.moduleData.Templates.SubEmblems[emblemType];
      emblems.push(this.makeEmblemElement(template));
    }

    var imageInfoMessage: React.HTMLElement;
    if (this.props.hasImageFailMessage)
    {
      imageInfoMessage =
      React.DOM.div({className: "image-info-message image-loading-fail-message"},
        "Linked image failed to load. Try saving it to your own computer " + 
        "and uploading it."
      );
    }
    else
    {
      imageInfoMessage =
      React.DOM.div({className: "image-info-message"},
        "Upload or drag image here to set it as your flag"
      );
    }
    

    return(
      React.DOM.div(
      {
        className: "flag-picker"
      },
        React.DOM.div(
        {
          className: "flag-image-uploader"
        },
          React.DOM.div({className: "flag-picker-title"},
            "Upload image"
          ),
          React.DOM.div(
          {
            className: "flag-image-uploader-content"
          },
            React.DOM.input(
            {
              className: "flag-image-upload-button",
              type: "file",
              ref: "imageUploader",
              onChange: this.handleUpload
            }),
            imageInfoMessage
          )
        ),
        React.DOM.div(
        {
          className: "emblem-picker"
        },
          React.DOM.div({className: "flag-picker-title"},
            "Emblems"
          ),
          React.DOM.div({className: "emblem-picker-emblem-list"},
            emblems
          )
        )
      )
    );
  }
}

const Factory: React.Factory<PropTypes> = React.createFactory(FlagPicker_COMPONENT_TODO);
export default Factory;
