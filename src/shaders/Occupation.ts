// Autogenerated from "./Occupation.glsl"

/// <reference path="../../lib/pixi.d.ts"/>

export interface Uniforms
{
  baseColor: {type: "4fv"; value: number[];};
  gapSize: {type: "1f"; value: number;};
  lineColor: {type: "4fv"; value: number[];};
  offset: {type: "2fv"; value: number[];};
  zoom: {type: "1f"; value: number;};
}

export default class Occupation extends PIXI.AbstractFilter
{
  uniforms: Uniforms

  constructor(uniforms?: Uniforms)
  {
    super(null, sourceLines.join("\n"), uniforms);
  }
  public static getUniformTypes()
  {
    return(
    {
      baseColor: "vec4",
      gapSize: "float",
      lineColor: "vec4",
      offset: "vec2",
      zoom: "float",
    });
   }
}

const sourceLines =
[
  "precision mediump float;",
  "",
  "uniform vec4 baseColor;",
  "uniform vec4 lineColor;",
  "uniform float gapSize;",
  "uniform vec2 offset;",
  "uniform float zoom;",
  "",
  "void main( void )",
  "{",
  "  vec2 position = gl_FragCoord.xy + offset;",
  "  position.x += position.y;",
  "  float scaled = floor(position.x * 0.1 / zoom);",
  "  float res = mod(scaled, gapSize);",
  "  if(res > 0.0)",
  "  {",
  "    gl_FragColor = mix(gl_FragColor, baseColor, 0.5);",
  "  }",
  "  else",
  "  {",
  "    gl_FragColor = mix(gl_FragColor, lineColor, 0.5);",
  "  }",
  "}",
]
