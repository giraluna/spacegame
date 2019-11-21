import * as React from "react";
import * as ReactDOMElements from "react-dom-factories";

import { Star } from "core/src/map/Star";
import { TitanComponentTemplate } from "../TitanComponentTemplate";
import {ManufacturableThingsList} from "modules/defaultui/src/uicomponents/production/ManufacturableThingsList";
import { Player } from "core/src/player/Player";
import { localize } from "modules/titans/localization/localize";
import { useTitanAssemblingCapacity } from "./useTitanAssemblingCapacity";
import { titanForge } from "../buildings/templates/titanForge";
import { manufacturableThingKinds } from "../manufacturableThingKinds";


// tslint:disable-next-line:no-any
export interface PropTypes extends React.Props<any>
{
  selectedLocation: Star | undefined;
  manufacturableThings: TitanComponentTemplate[];
  triggerParentUpdate: () => void;
  canManufacture: boolean;
  player: Player;
}

const TitanManufacturingOverviewComponent: React.FunctionComponent<PropTypes> = props =>
{
  const assemblingCapacity = useTitanAssemblingCapacity(props.selectedLocation);

  function addComponentToBuildQueue(component: TitanComponentTemplate): void
  {
    props.selectedLocation.manufactory.addThingToQueue(component, manufacturableThingKinds.titanComponent);
    props.triggerParentUpdate();
  }

  function makeActionButton(): React.ReactElement<any>
  {
    const canAssemble = props.canManufacture && assemblingCapacity > 0;

    const baseProps: React.HTMLAttributes<HTMLButtonElement> =
    {
      className: "titan-manufacturing-overview-action-button",
    };

    if (canAssemble)
    {
      return ReactDOMElements.button(
      {
        ...baseProps,
      },
        localize("assemble"),
      );
    }
    else
    {
      return ReactDOMElements.button(
      {
        ...baseProps,
        onClick: () =>
        {
          props.player.buildBuilding(titanForge, props.selectedLocation);
        },
      },
        localize("buildTitanForge"),
      );
    }
  }

  return(
    ReactDOMElements.div(
    {
      className: "titan-manufacturing-overview",
    },
      ReactDOMElements.div(
      {
        className: "production-list-header",
      },
        ManufacturableThingsList(
        {
          manufacturableThings: props.manufacturableThings,
          onClick: (props.canManufacture ? <any>addComponentToBuildQueue : null),
          showCost: true,
          player: props.player,
        }),
      ),
      ReactDOMElements.div(
      {
        className: "titan-manufacturing-overview-action",
      },
        makeActionButton(),
      ),
    )
  );
};

export const TitanManufacturingOverview: React.FunctionComponentFactory<PropTypes> = React.createFactory(TitanManufacturingOverviewComponent);