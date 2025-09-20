import React, {useEffect, useRef} from 'react';
import styles from './Home.module.scss';
import {
  Vector3
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/addons";
import {applyWhiteningToModel, newScene, origin} from "../../three-utils";

const Home = () => {
  const pageRef = useRef(null);

  useEffect(() => {
      if (pageRef.current) {
        const [wordScene, wordRenderer, wordCamera] = newScene();
        const [avatarScene, avatarRenderer, avatarCamera] = newScene();
        pageRef.current.appendChild(avatarRenderer.domElement);
        pageRef.current.appendChild(wordRenderer.domElement);

        const loader = new GLTFLoader();

        // load and initialize word sphere
        const initialScale = new Vector3(.001, .001, .001);
        const explodeDuration = 400;

        const loads = [];

        loads.push(new Promise((resolve, reject) => {
          loader.load('/models/wordsphere2.glb', (gltf) => {
            // Assuming gltf.scene contains your loaded sphere group
            const wordSphere = gltf.scene;
            wordSphere.scale.copy(initialScale);
            wordScene.add(wordSphere);
            resolve(wordSphere);
          });
        }))

        loads.push(new Promise((resolve, reject) => {
          loader.load('/models/avatar-pose3.glb', gltf => {
            const avatar = gltf.scene;
            applyWhiteningToModel(avatar);
            avatar.scale.set(100,100,100);
            avatarScene.add(avatar);
            resolve(avatar);
          })
        }));

        Promise.all(loads).then(results => {
          const orbitControls = new OrbitControls(wordCamera, wordRenderer.domElement);
          wordCamera.position.set(0, 0, 25);
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

              results[0].scale.copy(initialScale.clone().lerp(new Vector3(1,1,1), t))
            }

            results[1].traverse((child) => {
              if (child.isMesh) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((mat) => {
                  if (mat.userData.shader) {
                    mat.userData.shader.uniforms.cameraPos.value.copy(avatarCamera.position);
                  }
                });
              }
            });

            if (orbitControls.autoRotate || orbitControls.enableDamping) {
              orbitControls.update();
            }

            requestAnimationFrame( animate );

            avatarCamera.position.set(0, 0, wordCamera.position.distanceTo(origin));

            wordRenderer.render( wordScene, wordCamera );
            avatarRenderer.render( avatarScene, avatarCamera );

          }

          animate();

          const stopAutoRotate = () => orbitControls.autoRotate = false;
          window.addEventListener('mousedown', stopAutoRotate);
          window.addEventListener('wheel', stopAutoRotate);
          window.addEventListener('touchstart', stopAutoRotate);
        })

      }
  }, [pageRef])

  return (
    <div className={styles.Home} ref={pageRef}>
    </div>
  );
};

export default Home;
