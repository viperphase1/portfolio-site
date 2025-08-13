import React, {useEffect, useRef, useState} from 'react';
import styles from './Home.module.scss';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';
import {descriptors} from "./descriptors";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import {OrbitControls, TextGeometry} from "three/addons";
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const Home = () => {
  const canvasRef = useRef(null);
  const [scene, setScene] = useState(new Scene());
  const shouldAutoRotate = useRef(true);

  function exportScene() {
    const exporter = new GLTFExporter();

    exporter.parse(
      scene,
      function (result) {
        if (result instanceof ArrayBuffer) {
          saveArrayBuffer(result, 'scene.glb');
        } else {
          saveString(JSON.stringify(result), 'scene.gltf');
        }
      }, null,
      { binary: true } // change to true if you want .glb instead of .gltf
    );
  }

  function saveString(text, filename) {
    saveBlob(new Blob([text], { type: 'text/plain' }), filename);
  }

  function saveArrayBuffer(buffer, filename) {
    saveBlob(new Blob([buffer], { type: 'application/octet-stream' }), filename);
  }

  function saveBlob(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  useEffect(() => {
    if (canvasRef && scene) {
      const wordsContainer = new Object3D();
      const ambientLight = new AmbientLight(0xffffff, 0.5);
      const directionalLight = new DirectionalLight(0xffffff, 0.5);
      scene.add(wordsContainer);
      scene.add(ambientLight);
      scene.add(directionalLight);
      const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

      const root = Math.sqrt(descriptors.length);
      const thetaDelta = 2 * Math.PI / root;
      const phiDelta = (5/6) * Math.PI / root;
      const phiOffset = phiDelta / 2 + (Math.PI - (root * phiDelta)) / 2;
      let firstHalf = descriptors.slice(0, descriptors.length / 2);
      let secondHalf = descriptors.slice(descriptors.length / 2);
      firstHalf = firstHalf.sort((a,b) => a.length - b.length);
      secondHalf = secondHalf.sort((a,b) => b.length - a.length);
      const words = [...firstHalf, ...secondHalf];
      const initialRadius = 0.3;
      const finalRadius = 12;
      const explodeDuration = 400;

      const tweens = [];

      const loader = new FontLoader();
      loader.load('/fonts/helvetiker_regular.typeface.json', font => {
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const geometry = new TextGeometry(word, {
            font: font,
            size: 0.5,
            height: 0.2,
            depth: 0,
            curveSegments: 6,
          });

          geometry.computeBoundingBox();

          const bbox = geometry.boundingBox;
          const centerX = (bbox.max.x + bbox.min.x) / 2;
          const centerY = (bbox.max.y + bbox.min.y) / 2;
          const centerZ = (bbox.max.z + bbox.min.z) / 2;

          // Translate geometry vertices so center is at origin
          geometry.translate(-centerX, -centerY, -centerZ);

          const remainder = i % root;
          const quotient = Math.floor(i / root);

          const material = new MeshStandardMaterial({ color: 0xff0000 });
          const textMesh = new Mesh(geometry, material);
          textMesh.position.setFromSphericalCoords(initialRadius, quotient * phiDelta + phiOffset, remainder * thetaDelta);
          textMesh.lookAt(textMesh.position.clone().multiplyScalar(2));
          wordsContainer.add(textMesh);

          const direction = textMesh.position.clone().normalize();
          const startPosition = textMesh.position.clone();
          const finalPosition = direction.multiplyScalar(finalRadius);

          tweens.push((interpolationFactor) => {
            textMesh.position.copy(startPosition.clone().lerp(finalPosition, interpolationFactor));
          });
        }

        const renderer = new WebGLRenderer({canvas: canvasRef.current, alpha: true, antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 0, 25);
        orbitControls.autoRotate = true;
        orbitControls.enableDamping = true;
        orbitControls.update();

        let startTime;

        function animate(time) {
          if (!startTime) startTime = time;
          const elapsed = time - startTime;

          // Calculate interpolation factor from 0 to 1
          let t = elapsed / explodeDuration;
          if (t > 1) t = 1;

          t = 1 - Math.pow(1 - t, 3); // cubic ease-out

          for (const tween of tweens) {
            tween(t);
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
  }, [canvasRef, scene])

  return (
    <div className={styles.Home}>
      <canvas ref={canvasRef}></canvas>
      <button onClick={exportScene}>Export</button>
    </div>
  );
};

export default Home;
