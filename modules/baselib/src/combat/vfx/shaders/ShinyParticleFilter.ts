// Autogenerated from "./ShinyParticle.glsl"

import * as PIXI from "pixi.js";


interface Uniforms
{
  highlightIntensity: number;
  spikeColor: number[];
  spikeIntensity: number;
  uSampler: PIXI.Texture;
}

export class ShinyParticleFilter extends PIXI.Filter<Uniforms>
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

const fragmentSource = `/// tsBuildTargets: filter shader

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float spikeIntensity;
uniform float highlightIntensity;
uniform vec4 spikeColor;


const vec4 highlightColor = vec4(1.0, 1.0, 1.0, 1.0);
const vec2 center = vec2(0.5, 0.5);
const float angle = -0.1 * 3.141592;

float spike(vec2 q)
{
  vec2 rotated;
  rotated.x = cos(angle) * q.x - sin(angle) * q.y;
  rotated.y = sin(angle) * q.x + cos(angle) * q.y;

  float xStrength = max(0.5 - abs(rotated.x), 0.0);
  float yStrength = max(0.5 - abs(rotated.y), 0.0);

  return xStrength + yStrength;
}

void main()
{
  vec2 uv = vTextureCoord;
  vec4 color = texture2D(uSampler, uv);

  vec2 q = uv - 0.5;
  // q *= 2.5;

  float dist = length(q);

  float spikeStrength = spike(q);
  spikeStrength -= dist;
  spikeStrength = pow(spikeStrength, 1.5);
  spikeStrength *= spikeIntensity;

  color += spikeColor * spikeStrength;


  // center highlight
  float highlightStrength = 1.0 - dist;
  highlightStrength = pow(highlightStrength, 8.0);
  highlightStrength *= highlightIntensity;

  color += highlightColor * highlightStrength;


  gl_FragColor = color;
}
`;
