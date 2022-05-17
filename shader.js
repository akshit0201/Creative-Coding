const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true,
  duration: 4,
  fps: 24
};

// Your glsl code
const frag = glsl(`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;
#pragma glslify: noise = require('glsl-noise/simplex/3d');
  void main () {
  vec3 cA = sin(time)+ vec3(1.0,0.0,0.0);
  vec3 cB = vec3(0.0,0.0,1.0);
  vec2 center = vUv - 0.5;
  center.x *= aspect;
  float dis = length(center);
  vec3 color = mix(cA,cB,vUv.y);
  float alpha = smoothstep(0.251,0.25,dis);
   // gl_FragColor = vec4(color,alpha);
   float n = noise(vec3(center,time));
   gl_FragColor = vec4(vec3(n),1.0);
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor: 'white',
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      playhead: ({playhead}) => playhead,
      aspect: ({width,height}) => width/height
    }
  });
};

canvasSketch(sketch, settings);
