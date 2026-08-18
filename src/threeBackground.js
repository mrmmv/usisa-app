import * as THREE from 'three';

export function create3DBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x10b981, 3, 20);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xf59e0b, 2, 20);
  pointLight2.position.set(-5, -5, 2);
  scene.add(pointLight2);

  const orbCount = 12;
  const orbsGroup = new THREE.Group();
  scene.add(orbsGroup);

  const orbMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.35
  });

  const citrusMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.2,
    metalness: 0.6,
    transparent: true,
    opacity: 0.4
  });

  for (let i = 0; i < orbCount; i++) {
    const isCitrus = i % 3 === 0;
    const size = 0.2 + Math.random() * 0.4;
    const geo = new THREE.IcosahedronGeometry(size, 2);
    const mesh = new THREE.Mesh(geo, isCitrus ? citrusMat : orbMat);

    mesh.position.set(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8
    );

    mesh.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.01,
      rotSpeedY: (Math.random() - 0.5) * 0.01,
      floatSpeed: 0.5 + Math.random() * 1.2,
      initialY: mesh.position.y
    };

    orbsGroup.add(mesh);
  }

  const particleCount = 150;
  const pGeo = new THREE.BufferGeometry();
  const pCoords = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    pCoords[i] = (Math.random() - 0.5) * 25;
    pCoords[i + 1] = (Math.random() - 0.5) * 15;
    pCoords[i + 2] = (Math.random() - 0.5) * 10;
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.06,
    color: 0x34d399,
    transparent: true,
    opacity: 0.55
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  let mouseX = 0;
  let mouseY = 0;

  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  window.addEventListener('mousemove', onMouseMove);

  let animId;
  const startTime = performance.now();

  function animate() {
    animId = requestAnimationFrame(animate);
    const elapsed = (performance.now() - startTime) / 1000;

    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    orbsGroup.children.forEach(orb => {
      orb.rotation.x += orb.userData.rotSpeedX;
      orb.rotation.y += orb.userData.rotSpeedY;
      orb.position.y = orb.userData.initialY + Math.sin(elapsed * orb.userData.floatSpeed) * 0.4;
    });

    particles.rotation.y = elapsed * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', onResize);

  return {
    destroy() {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
    }
  };
}
