import * as THREE from 'three';

export function create3DTurntable(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Clear existing canvas
  container.innerHTML = '';

  const getWidth = () => container.clientWidth || container.offsetWidth || 340;
  const getHeight = () => container.clientHeight || container.offsetHeight || 280;

  let width = getWidth();
  let height = getHeight();

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 3.2, 6.2);
  camera.lookAt(0, 1.0, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // Lighting - Balanced and vibrant
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0f172a, 1.2);
  scene.add(hemiLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
  mainLight.position.set(4, 7, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const emeraldFill = new THREE.PointLight(0x10b981, 2.5, 12);
  emeraldFill.position.set(-3, 3, 3);
  scene.add(emeraldFill);

  const citrusAccent = new THREE.PointLight(0xf59e0b, 2.0, 10);
  citrusAccent.position.set(3, 2, -3);
  scene.add(citrusAccent);

  // Turntable Group (Rotates with Stepper/Angle)
  const turntableGroup = new THREE.Group();
  scene.add(turntableGroup);

  // Base Disk (Metallic Beveled Platter)
  const diskGeo = new THREE.CylinderGeometry(2.1, 2.2, 0.18, 64);
  const diskMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0x064e3b,
    emissiveIntensity: 0.2
  });
  const baseDisk = new THREE.Mesh(diskGeo, diskMat);
  baseDisk.position.y = -0.09;
  baseDisk.receiveShadow = true;
  turntableGroup.add(baseDisk);

  // Glowing Outer Neon LED Ring
  const ringGeo = new THREE.TorusGeometry(2.15, 0.035, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const ledRing = new THREE.Mesh(ringGeo, ringMat);
  ledRing.rotation.x = Math.PI / 2;
  ledRing.position.y = 0.01;
  turntableGroup.add(ledRing);

  // Cardinal Direction Ticks on Platter (0° N, 90° W, 180° E, 270° S)
  const cardinalAngles = [
    { angle: 0, color: 0x10b981, name: 'N' },
    { angle: 90, color: 0x38bdf8, name: 'W' },
    { angle: 180, color: 0xf59e0b, name: 'E' },
    { angle: 270, color: 0xec4899, name: 'S' }
  ];

  cardinalAngles.forEach(({ angle, color }) => {
    const rad = (angle * Math.PI) / 180;
    const tickGeo = new THREE.BoxGeometry(0.12, 0.04, 0.35);
    const tickMat = new THREE.MeshBasicMaterial({ color });
    const tick = new THREE.Mesh(tickGeo, tickMat);
    tick.position.set(Math.sin(rad) * 1.9, 0.02, Math.cos(rad) * 1.9);
    tick.rotation.y = rad;
    turntableGroup.add(tick);
  });

  // 3D Calamansi Tree Assembly
  const treeGroup = new THREE.Group();
  turntableGroup.add(treeGroup);

  // Planter Pot
  const potGeo = new THREE.CylinderGeometry(0.65, 0.45, 0.75, 32);
  const potMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.5
  });
  const pot = new THREE.Mesh(potGeo, potMat);
  pot.position.y = 0.38;
  pot.castShadow = true;
  pot.receiveShadow = true;
  treeGroup.add(pot);

  // Soil Top
  const soilGeo = new THREE.CylinderGeometry(0.63, 0.63, 0.06, 32);
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x2e1a0d, roughness: 0.9 });
  const soil = new THREE.Mesh(soilGeo, soilMat);
  soil.position.y = 0.74;
  treeGroup.add(soil);

  // Trunk & Branches
  const trunkGeo = new THREE.CylinderGeometry(0.07, 0.11, 1.1, 16);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.85 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 1.25;
  trunk.castShadow = true;
  treeGroup.add(trunk);

  // Branch Outgrowths
  const branchMat = trunkMat;
  const branch1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.55, 12), branchMat);
  branch1.position.set(0.18, 1.4, 0.1);
  branch1.rotation.z = -0.55;
  treeGroup.add(branch1);

  const branch2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.5, 12), branchMat);
  branch2.position.set(-0.16, 1.5, -0.1);
  branch2.rotation.z = 0.6;
  treeGroup.add(branch2);

  // Multi-Cluster Foliage Canopy (Glossy Citrus Leaves)
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x059669,
    roughness: 0.35,
    metalness: 0.15,
    flatShading: false
  });
  const leafMatLight = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    roughness: 0.3,
    metalness: 0.1
  });

  const canopyClusters = [
    { x: 0, y: 2.15, z: 0, r: 0.72, mat: leafMat },
    { x: 0.38, y: 1.95, z: 0.25, r: 0.48, mat: leafMatLight },
    { x: -0.38, y: 2.05, z: -0.25, r: 0.52, mat: leafMat },
    { x: -0.28, y: 1.82, z: 0.35, r: 0.45, mat: leafMatLight },
    { x: 0.28, y: 2.25, z: -0.28, r: 0.48, mat: leafMat },
    { x: 0, y: 2.5, z: 0, r: 0.42, mat: leafMatLight }
  ];

  canopyClusters.forEach(c => {
    const geo = new THREE.DodecahedronGeometry(c.r, 2);
    const mesh = new THREE.Mesh(geo, c.mat);
    mesh.position.set(c.x, c.y, c.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    treeGroup.add(mesh);
  });

  // Calamansi Fruits (Green & Ripening Golden Spheres)
  const fruits = [
    { x: 0.38, y: 1.85, z: 0.35, color: 0xf59e0b, r: 0.11 },
    { x: -0.42, y: 1.95, z: 0.18, color: 0x10b981, r: 0.10 },
    { x: 0.22, y: 2.3, z: -0.32, color: 0xfbbf24, r: 0.12 },
    { x: -0.22, y: 1.72, z: -0.35, color: 0x10b981, r: 0.09 },
    { x: 0.45, y: 2.1, z: 0.08, color: 0xf59e0b, r: 0.11 },
    { x: -0.15, y: 2.2, z: 0.42, color: 0x84cc16, r: 0.10 }
  ];

  fruits.forEach(f => {
    const geo = new THREE.SphereGeometry(f.r, 20, 20);
    const mat = new THREE.MeshStandardMaterial({
      color: f.color,
      roughness: 0.2,
      metalness: 0.1,
      emissive: f.color,
      emissiveIntensity: 0.15
    });
    const fruitMesh = new THREE.Mesh(geo, mat);
    fruitMesh.position.set(f.x, f.y, f.z);
    fruitMesh.castShadow = true;
    treeGroup.add(fruitMesh);
  });

  // 3D Scanner Camera Rig & HUD Projection Monitor
  const scannerRig = new THREE.Group();
  scene.add(scannerRig);

  // Camera Housing
  const camGeo = new THREE.BoxGeometry(0.35, 0.24, 0.42);
  const camMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.2 });
  const camMesh = new THREE.Mesh(camGeo, camMat);
  camMesh.position.set(0, 1.85, 2.5);
  camMesh.castShadow = true;
  scannerRig.add(camMesh);

  // Optical Lens
  const lensGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 24);
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.1 });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.set(0, 1.85, 2.24);
  scannerRig.add(lensMesh);

  // Laser Scan Cone Beam
  const beamGeo = new THREE.ConeGeometry(0.75, 2.1, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
  });
  const beamMesh = new THREE.Mesh(beamGeo, beamMat);
  beamMesh.rotation.x = -Math.PI / 2;
  beamMesh.position.set(0, 1.85, 1.25);
  scannerRig.add(beamMesh);

  // 3D HUD Photo Monitor Display Screen
  const hudCanvas = document.createElement('canvas');
  hudCanvas.width = 512;
  hudCanvas.height = 320;
  const hudCtx = hudCanvas.getContext('2d');

  function drawHudDefault(angleText = '0° North', statusText = 'Recent Scan Preview') {
    hudCtx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    hudCtx.fillRect(0, 0, 512, 320);

    hudCtx.strokeStyle = '#10b981';
    hudCtx.lineWidth = 6;
    hudCtx.strokeRect(6, 6, 500, 308);

    hudCtx.fillStyle = '#10b981';
    hudCtx.fillRect(6, 6, 500, 48);

    hudCtx.fillStyle = '#000000';
    hudCtx.font = 'bold 22px sans-serif';
    hudCtx.fillText(`USISA 360° VISION — ${angleText.toUpperCase()}`, 20, 38);

    hudCtx.fillStyle = '#64748b';
    hudCtx.font = '18px sans-serif';
    hudCtx.fillText(statusText, 30, 150);

    hudCtx.strokeStyle = '#38bdf8';
    hudCtx.lineWidth = 3;
    hudCtx.strokeRect(30, 80, 452, 200);
  }

  drawHudDefault('0° North', 'Live 4K Foliar Frame Active');

  const hudTexture = new THREE.CanvasTexture(hudCanvas);
  hudTexture.generateMipmaps = false;
  hudTexture.minFilter = THREE.LinearFilter;

  const hudPlaneGeo = new THREE.PlaneGeometry(1.6, 1.0);
  const hudPlaneMat = new THREE.MeshBasicMaterial({
    map: hudTexture,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide
  });
  const hudPlane = new THREE.Mesh(hudPlaneGeo, hudPlaneMat);
  hudPlane.position.set(0, 2.75, 1.8);
  hudPlane.rotation.x = -0.15;
  scene.add(hudPlane);

  // Background Cyber Dust Particles
  const particleCount = 150;
  const pGeo = new THREE.BufferGeometry();
  const pCoords = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    pCoords[i] = (Math.random() - 0.5) * 7;
    pCoords[i + 1] = Math.random() * 4.5;
    pCoords[i + 2] = (Math.random() - 0.5) * 7;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.045,
    color: 0x10b981,
    transparent: true,
    opacity: 0.6
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Mouse & Touch Drag Controls
  let isDragging = false;
  let previousMouseX = 0;
  let targetRotationY = 0;
  let currentRotationY = 0;
  let desiredAngleRad = 0;

  const onMouseDown = (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMouseX;
    targetRotationY += deltaX * 0.008;
    previousMouseX = e.clientX;
  };

  const onMouseUp = () => { isDragging = false; };

  container.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMouseX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMouseX;
      targetRotationY += deltaX * 0.008;
      previousMouseX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  function setAngleDegrees(deg) {
    desiredAngleRad = (deg * Math.PI) / 180;
  }

  function updateActiveImage(imgSrc, angleName = '0° North') {
    if (!imgSrc || imgSrc.trim() === '') {
      drawHudDefault(angleName, 'Awaiting Foliar Scan Frame...');
      hudTexture.needsUpdate = true;
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      hudCtx.clearRect(0, 0, 512, 320);
      hudCtx.drawImage(img, 0, 0, 512, 320);

      hudCtx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      hudCtx.fillRect(0, 0, 512, 40);

      hudCtx.fillStyle = '#10b981';
      hudCtx.font = 'bold 18px sans-serif';
      hudCtx.fillText(`[LIVE FRAME] ${angleName.toUpperCase()}`, 16, 26);

      hudCtx.strokeStyle = '#10b981';
      hudCtx.lineWidth = 4;
      hudCtx.strokeRect(10, 10, 492, 300);

      hudTexture.needsUpdate = true;
    };
    img.src = imgSrc;
  }

  // Animation Loop
  let animationFrameId;
  const startTime = performance.now();

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    const elapsedTime = (performance.now() - startTime) / 1000;

    currentRotationY += (targetRotationY + desiredAngleRad - currentRotationY) * 0.075;
    turntableGroup.rotation.y = currentRotationY;

    treeGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.025;
    beamMat.opacity = 0.16 + Math.sin(elapsedTime * 4.5) * 0.09;
    hudPlane.position.y = 2.75 + Math.sin(elapsedTime * 2) * 0.03;
    particles.rotation.y = elapsedTime * 0.04;

    renderer.render(scene, camera);
  }

  animate();

  const onResize = () => {
    const w = getWidth();
    const h = getHeight();
    if (w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  };

  window.addEventListener('resize', onResize);
  setTimeout(onResize, 150);

  return {
    setAngleDegrees,
    updateActiveImage,
    destroy() {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    }
  };
}
