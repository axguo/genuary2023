const vert = `attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute vec2 aTexCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform mat3 uNormalMatrix;

  varying highp vec2 vVertTexCoord;

  void main(void) {
    vec4 positionVec4 = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
    vVertTexCoord = aTexCoord;
  }
`
const frag = `precision mediump float;
  varying highp vec2 vVertTexCoord;

  uniform sampler2D uImg;
  uniform sampler2D uDepth;
  uniform bool bw;

  vec4 one = vec4(201, 203, 163, 255)/vec4(255);
  vec4 two = vec4(255, 225, 168, 255)/vec4(255);
  vec4 three = vec4(226, 109, 92, 255)/vec4(255);
  vec4 four = vec4(114, 61, 70, 255)/vec4(255);
  vec4 five = vec4(71, 45, 48, 255)/vec4(255);

  int mod(int x, int y) {
    return x - y * (x/y);
  }

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec4 color = texture2D(uImg, vVertTexCoord);
    vec4 depth = texture2D(uDepth, vVertTexCoord);
    color *= vec4(255);

    if(!bw) {
      if(color.r==0.0){
        color = five;
      }
      else if(mod(int(color.r),4)==0){
          color = one;
      } else if (mod(int(color.r),4)==1){
          color = three;
      } else if (mod(int(color.r),4)==2){
          color = two;
      } else if (mod(int(color.r),4)==3){
          color = five;
      }  
    } else {
      if(mod(int(color.r),2)==0){
          color = vec4(0);
      } else {color = vec4(0.95);}
    }
    
    gl_FragColor = color+rand(vVertTexCoord)/10.0;
    // gl_FragColor = depth;
  }
  `