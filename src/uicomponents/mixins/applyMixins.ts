/// <reference path="../../../lib/react-global.d.ts" />

import MixinBase from "./MixinBase";

type LifeCycleFunction = "componentWillMount" | "componentDidMount" |
  "componentWillReceiveProps" | "componentWillUpdate" |
  "componentDidUpdate" | "componentWillUnmount";
const lifeCycleFunctions =
[
  "componentWillMount" , "componentDidMount" ,
  "componentWillReceiveProps" , "componentWillUpdate" ,
  "componentDidUpdate" , "componentWillUnmount"
];

function wrapLifeCycleFunction(base: React.Component<any, any>, functionName: LifeCycleFunction, mixins: MixinBase<any>[])
{
  const originalFunction = base[functionName];
  const mixinsWithFunction = mixins.filter(mixin => Boolean(mixin[functionName]));
  
  base[functionName] = function(...args: any[])
  {
    mixinsWithFunction.forEach(mixin =>
    {
      mixin[functionName].apply(mixin, args);
    });
    if (originalFunction)
    {
      originalFunction.apply(base, args);
    }
  }
}
function wrapRenderFunction(base: React.Component<any, any>, mixins: MixinBase<any>[])
{
  const originalFunction = base.render;
  const mixinsWithFunction = mixins.filter(mixin => Boolean(mixin.onRender));
  
  base.render = function(...args: any[])
  {
    mixinsWithFunction.forEach(mixin =>
    {
      mixin.onRender.call(mixin);
    });
    return originalFunction.apply(base, args);
  }
}

export default function applyMixins(base: React.Component<any, any>, ...mixins: MixinBase<any>[])
{
  lifeCycleFunctions.forEach((functionName: LifeCycleFunction) =>
  {
    wrapLifeCycleFunction(base, functionName, mixins);
  });
  
  wrapRenderFunction(base, mixins);
}
