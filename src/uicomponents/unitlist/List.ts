/// <reference path="../../../lib/react-0.13.3.d.ts" />
import * as React from "react";

/// <reference path="../mixins/splitmultilinetext.ts" />


import eventManager from "../../eventManager";

import ListItem from "./ListItem";
import ListColumn from "./ListColumn";

interface PropTypes extends React.Props<any>
{
  initialColumns: ListColumn[];
  listItems: ListItem[];
  initialSortOrder?: ListColumn[];
  keyboardSelect?: boolean; // boolean = false
  initialSelected?: ListItem;
  tabIndex?: number; // number = 1
  noHeader?: boolean; // boolean = false
  addSpacer?: boolean; // boolean = false
  onRowChange?: (row: ListItem) => void;
  colStylingFN?: (column: ListColumn, props: any) => any;
  autoSelect?: boolean;
}

interface StateType
{
  columns: ListColumn[];
  selectedColumn: ListColumn;
  sortingOrder: ListColumn[];
  selected: ListItem;
}

interface RefTypes extends React.Refs
{
  header: HTMLElement;
  inner: HTMLElement;
}

export class ListComponent extends React.Component<PropTypes, StateType>
{
  mixins: [SplitMultilineText];
  sortedItems: ListItem[] = [];
  state: StateType;
  refsTODO: RefTypes;

  constructor(props: PropTypes)
  {
    super(props);
    
    this.bindMethods();
  }
  private bindMethods()
  {
    this.getNewSortingOrder = this.getNewSortingOrder.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.makeInitialSortingOrder = this.makeInitialSortingOrder.bind(this);
    this.shiftSelection = this.shiftSelection.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.setDesiredHeight = this.setDesiredHeight.bind(this);
    this.handleSelectColumn = this.handleSelectColumn.bind(this);
    this.sort = this.sort.bind(this);    
  }

  getInitialState(): StateType
  {
    var initialColumn: ListColumn = this.props.initialSortOrder ?
      this.props.initialSortOrder[0] :
      this.props.initialColumns[0];

    return(
    {
      columns: this.props.initialColumns,
      selected: null, // set in componentDidMount
      selectedColumn: initialColumn,
      sortingOrder: this.makeInitialSortingOrder(this.props.initialColumns, initialColumn)
    });
  }

  componentDidMount()
  {
    var self = this;

    window.addEventListener("resize", this.setDesiredHeight, false);
    eventManager.addEventListener("popupResized", this.setDesiredHeight);

    if (this.props.keyboardSelect)
    {
      React.findDOMNode(this).addEventListener("keydown", function(event: KeyboardEvent)
      {
        switch (event.keyCode)
        {
          case 40:
          {
            self.shiftSelection(1);
            break;
          }
          case 38:
          {
            self.shiftSelection(-1);
            break;
          }
          default:
          {
            return;
          }
        }
      });
    }
    if (this.props.initialSelected)
    {
      this.handleSelectRow(this.props.initialSelected);
    }
    else if (this.props.autoSelect)
    {
      this.handleSelectRow(this.sortedItems[0]);
      React.findDOMNode<HTMLElement>(this).focus();
    }
    else
    {
      this.setState({selected: this.sortedItems[0]});
    }
  }

  componentWillUnmount()
  {
    window.removeEventListener("resize", this.setDesiredHeight);
    eventManager.removeEventListener("popupResized", this.setDesiredHeight);
  }

  componentDidUpdate()
  {
    this.setDesiredHeight();
  }

  setDesiredHeight()
  {
    var ownNode = React.findDOMNode<HTMLElement>(this);
    var innerNode = React.findDOMNode<HTMLElement>(this.ref_TODO_inner);

    ownNode.style.height = "auto";
    innerNode.style.height = "auto";

    var parentHeight = ownNode.parentElement.getBoundingClientRect().height;
    var ownRect = ownNode.getBoundingClientRect();
    var ownHeight = ownRect.height;


    var strippedOwnHeight = parseInt(getComputedStyle(ownNode).height)
    var extraHeight = ownHeight - strippedOwnHeight;

    var desiredHeight = parentHeight - extraHeight;

    var maxHeight = window.innerHeight - ownRect.top - extraHeight;

    desiredHeight = Math.min(desiredHeight, maxHeight);

    ownNode.style.height = "" + desiredHeight + "px";
    innerNode.style.height = "" + desiredHeight + "px";
  }

  handleScroll(e: React.UIEvent)
  {
    // scrolls header to match list contents
    var target = <Element> e.target;
    var header = React.findDOMNode<HTMLElement>(this.ref_TODO_header);
    var titles = <NodeListOf<HTMLElement>> header.getElementsByClassName("fixed-table-th-inner");

    var marginString = "-" + target.scrollLeft + "px";

    for (var i = 0; i < titles.length; i++)
    {
      titles[i].style.marginLeft = marginString;
    }
  }

  makeInitialSortingOrder(columns: ListColumn[], initialColumn: ListColumn)
  {
    var initialSortOrder = this.props.initialSortOrder;
    if (!initialSortOrder || initialSortOrder.length < 1)
    {
      initialSortOrder = [initialColumn];
    }


    var order = initialSortOrder;


    for (var i = 0; i < columns.length; i++)
    {
      if (!columns[i].order)
      {
        columns[i].order = columns[i].defaultOrder;
      }
      if (initialSortOrder.indexOf(columns[i]) < 0)
      {
        order.push(columns[i]);
      }
    }

    return order;
  }

  getNewSortingOrder(newColumn: ListColumn)
  {
    var order = this.state.sortingOrder.slice(0);
    var current = order.indexOf(newColumn);

    if (current >= 0)
    {
      order.splice(current);
    }

    order.unshift(newColumn);

    return order;
  }

  handleSelectColumn(column: ListColumn)
  {
    if (column.notSortable) return;
    function getReverseOrder(order: string)
    {
      return order === "desc" ? "asc" : string = "desc";
    }

    if (this.state.selectedColumn.key === column.key)
    {
      column.order = getReverseOrder(column.order);
      this.forceUpdate();
    }
    else
    {
      column.order = column.defaultOrder;
      this.setState(
      {
        selectedColumn: column,
        sortingOrder: this.getNewSortingOrder(column)
      })
    }
  }

  handleSelectRow(row: ListItem)
  {
    if (this.props.onRowChange && row) this.props.onRowChange.call(null, row);

    this.setState(
    {
      selected: row
    });
  }

  sort()
  {
    var itemsToSort = this.props.listItems;
    var columnsToTry = this.state.columns;
    var sortOrder = this.state.sortingOrder;
    var sortFunctions:
    {
      [key: string]: (a: any, b: any) => number;
    } = {};


    function makeSortingFunction(column: ListColumn)
    {
      if (column.sortingFunction) return column.sortingFunction;

      var propToSortBy = column.propToSortBy || column.key;

      return (function (a: ListItem, b: ListItem)
      {
        var a1 = a.data[propToSortBy];
        var b1 = b.data[propToSortBy];

        if (a1 > b1) return 1;
        else if (a1 < b1) return -1;
        else return 0;
      })
    }

    itemsToSort.sort(function(a: ListItem, b: ListItem)
    {
      var result = 0;
      for (var i = 0; i < sortOrder.length; i++)
      {
        var columnToSortBy = sortOrder[i];

        if (!sortFunctions[columnToSortBy.key])
        {
          sortFunctions[columnToSortBy.key] = makeSortingFunction(columnToSortBy);
        }
        var sortFunction = sortFunctions[columnToSortBy.key];

        result = sortFunction(a, b);

        if (columnToSortBy.order === "desc")
        {
          result *= -1;
        }

        if (result) return result;
      }

      return 0; // couldnt sort
    });

    this.sortedItems = itemsToSort;
  }

  shiftSelection(amountToShift: number)
  {
    var reverseIndexes = {};
    for (var i = 0; i < this.sortedItems.length; i++)
    {
      reverseIndexes[this.sortedItems[i].key] = i;
    };
    var currSelectedIndex = reverseIndexes[this.state.selected.key];
    var nextIndex = (currSelectedIndex + amountToShift) % this.sortedItems.length;
    if (nextIndex < 0)
    {
      nextIndex += this.sortedItems.length;
    }

    this.handleSelectRow(this.sortedItems[nextIndex]);
  }
  render()
  {
    var self = this;
    var columns: React.HTMLElement[] = [];
    var headerLabels: React.HTMLElement[] = [];

    this.state.columns.forEach(function(column: ListColumn)
    {
      var colProps: any =
      {
        key: column.key
      };

      if (self.props.colStylingFN)
      {
        colProps = self.props.colStylingFN(column, colProps);
      }

      columns.push(
        React.DOM.col(colProps)
      );

      var sortStatus: string = "";

      if (!column.notSortable) sortStatus = " sortable";

      if (self.state.selectedColumn.key === column.key)
      {
        sortStatus += " sorted-" + column.order;
      }
      else if (!column.notSortable) sortStatus += " unsorted";

      headerLabels.push(
        React.DOM.th(
          {
            key: column.key
          },
          React.DOM.div(
            {
              className: "fixed-table-th-inner"
            },
            React.DOM.div(
            {
              className: "fixed-table-th-content" + sortStatus,
              title: column.title || colProps.title || null,
              onMouseDown: self.handleSelectColumn.bind(null, column),
              onTouchStart: self.handleSelectColumn.bind(null, column),
            },
              column.label
            )
          )
        )
      );
    });

    this.sort();

    var sortedItems: ListItem[] = this.sortedItems;
    
    var rows: React.ReactElement<any>[] = [];

    sortedItems.forEach(function(item: ListItem, i: number)
    {
      item.data.key = item.key;
      item.data.activeColumns = self.state.columns;
      item.data.handleClick = self.handleSelectRow.bind(null, item);
      var row = item.data.rowConstructor(item.data);

      rows.push(
        row
      );
      if (self.props.addSpacer && i < sortedItems.length - 1)
      {
        rows.push(React.DOM.tr(
        {
          className: "list-spacer",
          key: "spacer" + i
        },
          React.DOM.td(
          {
            colSpan: 20
          },
            null
          )
        ))
      }
    });



    return(
      React.DOM.div(
        {
          className: "fixed-table-container" + (this.props.noHeader ? " no-header" : ""),
          tabIndex: isFinite(this.props.tabIndex) ? this.props.tabIndex : 1
        },
        React.DOM.div({className: "fixed-table-header-background"}),
        React.DOM.div(
        {
          className: "fixed-table-container-inner",
          ref: (component: TODO_TYPE) =>
{
  this.ref_TODO_inner = component;
},
          onScroll: this.handleScroll
        },
          React.DOM.table(
          {
            className: "react-list"
          },
            React.DOM.colgroup(null,
              columns
            ),

            React.DOM.thead({className: "fixed-table-actual-header", ref: (component: TODO_TYPE) =>
{
  this.ref_TODO_header = component;
}},
              React.DOM.tr(null,
                headerLabels
              )
            ),

            React.DOM.thead({className: "fixed-table-hidden-header"},
              React.DOM.tr(null,
                headerLabels
              )
            ),

            React.DOM.tbody(null,
              rows
            )
          )
        )
      )
    );
  }
  
}

const Factory: React.Factory<PropTypes> = React.createFactory(ListComponent);
export default Factory;