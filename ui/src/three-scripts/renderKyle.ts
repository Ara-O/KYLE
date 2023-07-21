import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// @ts-expect-error
import vertexShader from "./vertexShader.glsl";
// @ts-expect-error
import fragmentShader from "./fragmentShader.glsl";

export default function renderKyle(canvas: HTMLElement) {
  let sizes = {
    height: window.innerHeight,
    width: window.innerWidth - 550,
    getAspectRatio() {
      return this.width / this.height;
    },
  };

  let spikeLevel = {
    value: 1,
  };

  let angerLevel = {
    value: 0.0,
  };

  const scene = new THREE.Scene();

  //Camera
  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.getAspectRatio(),
    0.1,
    100
  );

  camera.position.z = 3;
  scene.add(camera);

  // Kyle geometry
  const geometry = new THREE.SphereGeometry(0.5);

  console.log(geometry);
  const randomPointCounts = geometry.attributes.position.count;
  const randomPoints = new Float32Array(randomPointCounts);

  for (let i = 0; i < randomPoints.length; i++) {
    randomPoints[i] = Math.random();
  }

  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomPoints, 1));

  //Kyle Material
  const material = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    wireframe: true,
    transparent: true,
    uniforms: {
      spikeLevel,
      angerLevel,
    },
  });

  const kyle = new THREE.Mesh(geometry, material);

  scene.add(kyle);

  //Orbital controls
  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.enableRotate = true;

  //   Renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Animate
  function animate() {
    window.requestAnimationFrame(animate);
    kyle.rotation.y += 0.001;
    renderer.render(scene, camera);
    controls.update();
  }

  //   Manage resizing
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth - 550;
    sizes.height = window.innerHeight;
    renderer.setSize(sizes.width, sizes.height);
    camera.aspect = sizes.getAspectRatio();
    camera.updateProjectionMatrix();
  });

  window.setInterval(() => {
    spikeLevel.value = Math.random() * 1;
  }, 100);

  animate();
}
