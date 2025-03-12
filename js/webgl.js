// WebGL background effect using Three.js
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

let scene, camera, renderer;
let geometry, material, points;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        alpha: true
    });

    // Configure renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a192f, 0.1);
    camera.position.setZ(30);

    // Create particle geometry
    geometry = new THREE.BufferGeometry();
    const vertices = [];
    const size = 2000;

    for (let i = 0; i < 1500; i++) {
        const x = Math.random() * size - size/2;
        const y = Math.random() * size - size/2;
        const z = Math.random() * size - size/2;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Create particle material
    material = new THREE.PointsMaterial({
        size: 2,
        color: 0x64ffda,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create particle system
    points = new THREE.Points(geometry, material);
    scene.add(points);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particle system
    points.rotation.x += 0.0003;
    points.rotation.y += 0.0002;

    // Add wave effect
    const positions = points.geometry.attributes.position.array;
    const time = Date.now() * 0.0001;

    for(let i = 0; i < positions.length; i += 3) {
        positions[i+1] += Math.sin(time + positions[i] * 0.5) * 0.1;
    }
    points.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize and start animation
init();
animate();
