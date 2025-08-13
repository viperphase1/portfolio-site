import React, {useEffect, useRef} from 'react';
import styles from './Home.module.scss';
import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Vector3
} from 'three';
import {OrbitControls} from "three/addons";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
      if (canvasRef.current) {
        const scene = new Scene();
        const ambientLight = new AmbientLight(0xffffff, 0.5);
        const directionalLight = new DirectionalLight(0xffffff, 0.5);
        scene.add(ambientLight);
        scene.add(directionalLight);
        const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        const initialScale = new Vector3(.001, .001, .001);
        const explodeDuration = 400;

        const loader = new GLTFLoader();
        loader.load('/models/wordsphere2.glb', (gltf) => {
          // Assuming gltf.scene contains your loaded sphere group
          const loadedGroup = gltf.scene;
          loadedGroup.scale.copy(initialScale);
          scene.add(loadedGroup);

          const renderer = new WebGLRenderer({canvas: canvasRef.current, alpha: true, antialias: true});
          renderer.setSize(window.innerWidth, window.innerHeight);
          const orbitControls = new OrbitControls(camera, renderer.domElement);
          camera.position.set(0, 0, 25);
          orbitControls.autoRotate = true;
          orbitControls.enableDamping = true;
          orbitControls.update();

          let startTime;

          function animate(time) {
            if (time) {
              if (!startTime) startTime = time;
              const elapsed = time - startTime;

              // Calculate interpolation factor from 0 to 1
              let t = elapsed / explodeDuration;
              if (t > 1) t = 1;

              t = 1 - Math.pow(1 - t, 3); // cubic ease-out

              loadedGroup.scale.copy(initialScale.clone().lerp(new Vector3(1,1,1), t))
            }

            if (orbitControls.autoRotate || orbitControls.enableDamping) {
              orbitControls.update();
            }

            requestAnimationFrame( animate );

            renderer.render( scene, camera );

          }

          animate();

          const stopAutoRotate = () => orbitControls.autoRotate = false;
          window.addEventListener('mousedown', stopAutoRotate);
          window.addEventListener('wheel', stopAutoRotate);
          window.addEventListener('touchstart', stopAutoRotate);

          window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          })

        });

      }
  }, [canvasRef])

  return (
    <div className={styles.Home}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Home;
