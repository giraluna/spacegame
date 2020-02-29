// Autogenerated from "./LightBurst.glsl"

import * as PIXI from "pixi.js";
import {vertex} from "./vertex";


interface Uniforms
{
  centerBloomStrength: number;
  centerSize: number;
  rayColor: number[];
  raySharpness: number;
  rayStrength: number;
  rotation: number;
  seed: number[];
  uSampler: PIXI.Texture;
}

export class LightBurstShader extends PIXI.Shader<Uniforms>
{
  constructor(initialUniformValues?: Partial<Uniforms>)
  {
    const program = new PIXI.Program(
      vertex,
      fragmentSource,
      "LightBurst",
    );

    super(program, initialUniformValues);
  }

  public setUniforms(uniforms: Partial<Uniforms>): void
  {
    for (const key in uniforms)
    {
      this.uniforms[key] = uniforms[key];
    }
  }
}

const fragmentSource = `/// tsBuildTargets: shader

precision mediump float;

#define PI 3.14159265359
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 seed;
uniform float rotation;
uniform float rayStrength;
uniform float raySharpness;
uniform vec4 rayColor;
uniform float centerSize;
uniform float centerBloomStrength;

//--------------------------------------------------------------------

// https://www.shadertoy.com/view/4dlGW2
// Tileable noise, for creating useful textures. By David Hoskins, Sept. 2013.
// It can be extrapolated to other types of randomised texture.

// https://www.shadertoy.com/terms says default license is CC BY-NC-SA 3.0 which should be fine

float hash(in vec2 p, in float scale)
{
  // This is tiling part, adjusts with the scale...
  p = mod(p, scale);
  return fract(sin(dot(p, seed)) * 5151.5473453);
}

float noise(in vec2 p, in float scale)
{
  vec2 f;

  p *= scale;


  f = fract(p);   // Separate integer from fractional
    p = floor(p);

    f = f*f*(3.0-2.0*f);  // Cosine interpolation approximation

    float res = mix(mix(hash(p,          scale),
            hash(p + vec2(1.0, 0.0), scale), f.x),
          mix(hash(p + vec2(0.0, 1.0), scale),
            hash(p + vec2(1.0, 1.0), scale), f.x), f.y);
    return res;
}

float fbm(in vec2 p)
{
  float f = 0.0;
  // Change starting scale to any integer value...
  float scale = 20.0;
  float amp   = 0.5;

  for (int i = 0; i < 5; i++)
  {
    f += noise(p, scale) * amp;
    amp *= .65;
    // Scale must be multiplied by an integer value...
    scale *= 2.0;
  }
  // Clamp it just in case....
  return min(f, 1.0);
}

//--------------------------------------------------------------------

float ray(vec2 q, float angleAdjust)
{
  float angle = (atan(q.y, q.x) + PI + angleAdjust) / (2.0 * PI);
  return fbm(vec2(angle, seed.y));
}

void main()
{
  vec2 uv = vTextureCoord;
  vec4 color = texture2D(uSampler, vTextureCoord);

  vec2 q = uv - 0.5;
  q *= 1.8;

  float dist = length(q);

  float centerIntensity = pow(1.0 - dist, 8.0);
  centerIntensity = smoothstep(1.0 - centerSize, 1.0, centerIntensity);

  float rayIntensity = ray(q, rotation);
  rayIntensity = smoothstep(0.4, 1.0, rayIntensity) * rayStrength;
  rayIntensity -= dist;
  rayIntensity *= max(1.0, raySharpness + 1.0 - dist);
  rayIntensity += centerIntensity * centerBloomStrength;
  rayIntensity = max(0.0, rayIntensity);
  color += rayColor * rayIntensity;

  gl_FragColor = color;
}
`;