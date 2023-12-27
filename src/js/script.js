import * as THREE from 'three';
import { Vector3 } from 'three';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,2,5);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.scaleCoef = 0.01;
box.speedX = 0.03;
box.speedY = 0.025;
box.speedZ = 0.01;
scene.add(box);

const planeGeo = new THREE.PlaneGeometry(30,30);
const planeMat = new THREE.MeshStandardMaterial();
const plane = new THREE.Mesh(planeGeo,planeMat);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -1.5;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

function animate() {
    box.rotation.x += 0.02;
    box.rotation.y += 0.01;

    if(box.scale.x <= 0.5 || box.scale.x >= 1.5){
        box.scaleCoef *= -1;
    }
    scaleX = box.scale.x+box.scaleCoef;
    scaleY = box.scale.y+box.scaleCoef;
    scaleZ = box.scale.z+box.scaleCoef;
    box.scale.set(scaleX,scaleY,scaleZ);
    console.log(box.scale)

    if(box.position.x >= 6 || box.position.x <= -6)
        box.speedX *= -1;
    if(box.position.y >= 5 || box.position.y <= -1)
        box.speedY *= -1;
    if(box.position.z >= 1000 || box.position.z <= 0.1)
        box.speedZ *= -1;
    box.position.x += box.speedX;
    box.position.y += box.speedY;
    box.position.z += box.speedZ;

    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);
