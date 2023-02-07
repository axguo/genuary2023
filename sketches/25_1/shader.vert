attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;


uniform float uFrameCount;
uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;
varying vec3 vNormal;
varying vec4 screenCoord;

void main() {
  vec2 uv = vTexCoord;

  float tile = 9.0;

  vec4 noise = texture2D(uNoiseTexture, fract(aTexCoord * tile));

  vNoise = noise.rgb;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  
  vNormal = aNormal;
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vTexCoord = aTexCoord;
  
  screenCoord = gl_Position;
}