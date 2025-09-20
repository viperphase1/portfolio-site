import {AmbientLight, DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from "three";

export const origin = new Vector3(0,0,0);

export function addWhiteningToMaterial(material) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.cameraPos = { value: new Vector3() };
    shader.uniforms.whitenStart = { value: 1.0 };
    shader.uniforms.whitenEnd = { value: 80.0 };

    // Declare the varying at the top
    shader.vertexShader = `
      varying vec3 vWorldPosition;
    ` + shader.vertexShader;

    // Grab world position *inside* worldpos_vertex include
    shader.vertexShader = shader.vertexShader.replace(
      '#include <worldpos_vertex>',
      `
        #include <worldpos_vertex>
        vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;
      `
    );

    shader.fragmentShader = `
      uniform vec3 cameraPos;
      uniform float whitenStart;
      uniform float whitenEnd;
      varying vec3 vWorldPosition;
    ` + shader.fragmentShader;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
        float dist = distance(cameraPos, vWorldPosition);
        float t = clamp((dist - whitenStart) / (whitenEnd - whitenStart), 0.0, 1.0);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), t);
        #include <dithering_fragment>
      `
    );

    material.userData.shader = shader;
  };
}

export function applyWhiteningToModel(model) {
  model.traverse((child) => {
    if (child.isMesh) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => addWhiteningToMaterial(m));
      } else {
        addWhiteningToMaterial(child.material);
      }
    }
  });
}

export function newScene() {
  const scene = new Scene();
  const ambientLight = new AmbientLight(0xffffff, 0.5);
  const directionalLight = new DirectionalLight(0xffffff, 0.5);
  scene.add(ambientLight);
  scene.add(directionalLight);
  const renderer = new WebGLRenderer({alpha: true, antialias: true});
  renderer.domElement.style.position = 'absolute';
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0,0,25);
  camera.lookAt(origin);
  window.addEventListener('resize', e => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })
  return [scene, renderer, camera];
}
