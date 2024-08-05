import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
const canvas = document.querySelector("canvas.webgl");
import pos from "./img/sp.jpg";
import starsTexture from "./img/stars.jpg";
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
camera.position.y = 1;
scene.add(camera);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const directionalLight = new THREE.DirectionalLight();
scene.add(directionalLight);

// directionalLight.setPosition(0,0,0);
const planeGeomatry = new THREE.PlaneGeometry(5, 5);
const planeMatirial = new THREE.MeshBasicMaterial({
  color: "#01BAEF",
  // map:texture.load( pos ),
  side: THREE.DoubleSide,
  // wireframe: true
});
const planeMatirial2 = new THREE.MeshBasicMaterial({
  color: "red",
  // map:texture.load( pos ),
  side: THREE.DoubleSide,
  // wireframe: true
});
const plane = new THREE.Mesh(planeGeomatry, planeMatirial);
const plane2 = new THREE.Mesh(planeGeomatry, planeMatirial2);
scene.add(plane);
// scene.add(plane2);

plane.rotateX(-Math.PI / 2);
plane2.position.z = -2.5;
plane2.position.y = 2.5;

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 5, 10);

const spLight = new THREE.SpotLight(0xffffff);
spLight.position.set(2, 5, -5);

const spLight2 = new THREE.SpotLight(0xffffff);
spLight2.position.set(2, 5, -5);

scene.add(spLight);
scene.add(spotLight);

gltfLoader.load("car.glb", (gltf) => {
  console.log(gltf);
  const model = gltf.scene;
  model.position.y += 0.2;
  scene.add(model);
});

window.addEventListener("keydown", (e) => {
  console.log(e.key, e.keyCode);
  if (e.keyCode === 68) {
    camera.position.x += 0.1;
  } else if (e.keyCode === 65) {
    camera.position.x -= 0.1;
  } else if (e.keyCode === 104) {
    camera.position.y += 0.1;
  } else if (e.keyCode === 98) {
    camera.position.y -= 0.1;
  } else if (e.keyCode === 83) {
    camera.position.z += 0.1;
  } else if (e.keyCode === 87) {
    camera.position.z -= 0.1;
  } else if (e.keyCode === 38) {
    camera.rotation.x += 0.1;
    // up
  } else if (e.keyCode === 40) {
    camera.rotation.x -= 0.1;
    // down
  } else if (e.keyCode === 37) {
    camera.rotation.y += 0.1;
    // left
  } else if (e.keyCode === 39) {
    camera.rotation.y -= 0.1;
    // right
  } else if (e.keyCode === 100) {
    camera.rotation.z += 0.1;
    // left
  } else if (e.keyCode === 102) {
    camera.rotation.z -= 0.1;
    // right
  } else if (e.keyCode === 56) {

    rotateCamera(-0.20000000000000004,0,0);
    moveCamera(0.20000000000000004,1.7000000000000006,5.099999999999997);

  } else if (e.keyCode === 57) {
    rotateCamera(0.4,3.1,0);
    moveCamera(0.4,1.199999999999992,0.09999999999999981);
  } else if (e.keyCode === 49) {

    rotateCamera(-0.09999999999999998,-5.599999999999996,0.1);

    moveCamera(1.7000000000000002,1.3000000000000003,3.0000000000000004);
    // right
  } else if (e.keyCode === 32) {
    console.log(camera.position);
    console.log(camera.rotation);
    console.log("object", camera);
  }
});

function moveCamera(x, y, z) {
    gsap.to(camera.position, {
        x,
        y,
        z,
        duration: 3
    });
}

function rotateCamera(x, y, z) {
    gsap.to(camera.rotation, {
        x,
        y,
        z,
        duration: 3.2
    });
}

const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.width - 0.5);
});
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const renderer = new THREE.WebGLRenderer({
  // color:"#FFFFFF",
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// const controls = new OrbitControls(camera, canvas)

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
const animate = () => {
  renderer.render(scene, camera);
  // controls.update()
  /*  camara;
   x: 0.4000000000000007
   y:1.3000000000000003
   z:0.0999999999999987

    rotation
    */

  window.requestAnimationFrame(animate);
};

animate();
