import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function renderKyle(canvas: HTMLElement) {
  let sizes = {
    height: window.innerHeight,
    width: window.innerWidth,
    getAspectRatio() {
      return this.width / this.height;
    },
  };
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.getAspectRatio(),
    0.1,
    100
  );
  camera.position.z = 3;

  scene.add(camera);
  scene.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(1, 1),
      new THREE.MeshNormalMaterial({ wireframe: true })
    )
  );

  //Orbital controls
  const controls = new OrbitControls(camera, canvas);

  //   Renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Animate
  function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  //   Manage resizing
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    renderer.setSize(sizes.width, sizes.height);
    camera.aspect = sizes.getAspectRatio();
    camera.updateProjectionMatrix();
  });

  animate();
}
