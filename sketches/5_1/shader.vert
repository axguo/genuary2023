
// Get the position attribute of the geometry
attribute vec3 aPosition;

// Get the texture coordinate attribute from the geometry
attribute vec2 aTexCoord;

// Get the vertex normal attribute from the geometry
attribute vec3 aNormal;

// uProjectionMatrix is used to convert the 3d world coordinates into screen coordinates 
uniform mat4 uProjectionMatrix;

// uModelViewMatrix is a combination of the model matrix and the view matrix
// The model matrix defines the object position / rotation / scale
// Multiplying uModelMatrix * vec4(aPosition, 1.0) would move the object into it's world position

// The view matrix defines attributes about the camera, such as focal length and camera position
// Multiplying uModelViewMatrix * vec4(aPosition, 1.0) would move the object into its world position in front of the camera
uniform mat4 uModelViewMatrix;

// Get the framecount uniform
uniform float uFrameCount;

// Get the noise texture
uniform sampler2D uNoiseTexture;

uniform float uAmplitude;

varying vec3 vNoise;

varying vec2 vTexCoord;
varying vec3 vNormal;

varying vec4 screenCoord;

void main() {
  float amplitude = uAmplitude;
  
  float tile = 2.0;
  float speed = 0.01;
  vec4 noise = texture2D(uNoiseTexture, fract(aTexCoord * tile + uFrameCount * speed));

  // Send the noise color to the fragment shader
  vNoise = noise.rgb;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Send the normal to the fragment shader
  vNormal = aNormal;
  
  screenCoord = uProjectionMatrix * uModelViewMatrix * positionVec4;

  
  // add the noise to the position, and multiply by the normal to move along it. 
  if(screenCoord.x < 0.5) {
    positionVec4.xyz += (noise.rgb - 0.5 ) * aNormal * amplitude;
  }
  
  // Move our vertex positions into screen space
  // The order of multiplication is always projection * view * model * position
  // In this case model and view have been combined so we just do projection * modelView * position
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  // Send the texture coordinates to the fragment shader
  vTexCoord = aTexCoord;
}