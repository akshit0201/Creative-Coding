// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");
const random = require("canvas-sketch-util/random")
const palletes = require('nice-color-palettes')
// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("white", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera()


  // Setup camera controller

  // Setup your scene
  const scene = new THREE.Scene();
const pallete = random.pick(palletes)
  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // Setup a material
  for(let i=0;i<40;++i){


    const material = new THREE.MeshStandardMaterial({
      color: random.pick(pallete)
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(random.range(-1,1),random.range(-1,1),random.range(-1,1))
    mesh.scale.set(random.range(-1,1),random.range(-1,1),random.range(-1,1))
    mesh.scale.multiplyScalar(0.4)
    scene.add(mesh);

  }
scene.add(new THREE.AmbientLight('blue'))
  const light = new THREE.DirectionalLight('white',1)
  light.position.set(1,2,3)
  scene.add(light)
  // Setup a mesh with geometry + material

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      // Setup an isometric perspective
      const aspect = viewportWidth / viewportHeight;
      const zoom = 2;
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;
      camera.near = -100;
      camera.far = 100;
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update camera properties
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {

      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
