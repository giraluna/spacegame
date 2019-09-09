// Autogenerated from "./Occupation.glsl"

import * as PIXI from "pixi.js";


interface Uniforms
{
  angle: number;
  offset: number[];
  scale: number;
  stripeColor: number[];
  stripeSize: number;
  uSampler: PIXI.Texture;
}

export class OccupationFilter extends PIXI.Filter<Uniforms>
{
  constructor(initialUniformValues?: Partial<Uniforms>)
  {
    super(undefined, fragmentSource, initialUniformValues);
  }

  public setUniforms(uniforms: Partial<Uniforms>): void
  {
    for (const key in uniforms)
    {
      this.uniforms[key] = uniforms[key];
    }
  }
}

const fragmentSource = `/// tsBuildTargets: filter

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 offset;
uniform float scale;
uniform float angle;
uniform vec4 stripeColor;
uniform float stripeSize;

void main()
{
  vec4 color = texture2D(uSampler, vTextureCoord);

  vec2 pos = gl_FragCoord.xy + offset;

  vec2 q;
  q.x = cos(angle) * pos.x - sin(angle) * pos.y;
  q.y = sin(angle) * pos.x + cos(angle) * pos.y;

  q /= scale;

  float stripeIntensity = sin(q.x) / 2.0 + 0.5;
  stripeIntensity = step(stripeIntensity, stripeSize);

  gl_FragColor = mix(color, stripeColor * color.a, stripeIntensity);
}
`;