
precision mediump float;

varying vec2 vTexCoord;
varying vec4 screenCoord;
varying vec3 vNormal;
varying vec3 vNoise;

void main() {
    
  vec3 color = vNoise;
  gl_FragColor = vec4(color ,1.0);
}