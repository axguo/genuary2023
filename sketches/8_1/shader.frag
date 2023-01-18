#ifdef GL_ES
precision mediump float;
#endif
#define NC %%n_val%%

uniform vec2 u_resolution;
uniform vec3 u_cir[NC];
uniform float u_t;
uniform int u_color;

float sdfCir(vec2 p,vec3 c){
  return length(abs(p-c.xy));
}

float smin4(float x[NC],float k){
  float res = 0.0; // pow(2, -k*a ) + exp2( -k*b );
  for (int i = 0; i < NC; i++) res += exp(-k * x[i]);
  return res/k;
  return -log(res)/k;
}

vec3 hsv2rgb(vec3 c){
  c=vec3(c.x/360.0,c.y/100.0,c.z/100.0);
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

int mod(int x, int y) {
    return x - y * (x/y);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
  float d[NC];
  
  for(int i=0;i<NC;i++){
    d[i]=sdfCir(gl_FragCoord.xy,u_cir[i]);
  }
  
  float e=smin4(d,.02);
  e=e/u_resolution.x*10.0;
  
  e=abs(e);
  vec3 color=hsv2rgb( vec3(mod(int(e*360.0+u_t), 100)+u_color,80.0,100.0));
  gl_FragColor = vec4(abs(sin(color)), 1.0);
}
