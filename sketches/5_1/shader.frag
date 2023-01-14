precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNormal;

// Get the normal from the vertex shader
varying vec3 vNoise;

varying vec4 screenCoord;

void main() {
  
  vec3 color = vNoise;
  
  float gray = (color.r + color.g + color.b)/3.0;
  
  // if(screenCoord.x>0.5) {
  //   gl_FragColor = vec4(vec3(gray), 1.0);
  // } else 
    gl_FragColor = vec4(color, 1.0);
  
  
    
  
}