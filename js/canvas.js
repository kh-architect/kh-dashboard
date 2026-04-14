(function () {
    let scene, renderer, camera, particlesMesh, cubesGroup;
    let explosionScale = 0.1;
    let cubesScaleFactor = 0;

    let targetX = 0, targetY = 0;

    function lerp(start, end, t) { return start * (1 - t) + end * t; }

    function update3DTheme() {
        const isLightMode = document.body.classList.contains('light-mode');
        if (scene) {
            if (isLightMode) {
                scene.fog = new THREE.FogExp2(0xf2f2f7, 0.02);
                renderer.setClearColor(0xf2f2f7);
                if (particlesMesh) particlesMesh.visible = false;
                if (cubesGroup) {
                    cubesGroup.visible = true;
                    window.cubesTriggered = true;
                }
            } else {
                scene.fog = new THREE.FogExp2(0x050505, 0.03);
                renderer.setClearColor(0x050505);
                if (particlesMesh) {
                    particlesMesh.visible = true;
                    window.explosionTriggered = true;
                }
                if (cubesGroup) cubesGroup.visible = false;
            }
        }
    }
    window.update3DTheme = update3DTheme;

    try {
        const isLightMode = document.body.classList.contains('light-mode');
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(isLightMode ? 0xf2f2f7 : 0x050505, isLightMode ? 0.02 : 0.03);
        
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 15;
        
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(isLightMode ? 0xf2f2f7 : 0x050505);
        
        const container = document.getElementById('canvas-container');
        if (container) container.appendChild(renderer.domElement);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const count = window.innerWidth < 768 ? 1500 : 3000;
        const posArray = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) { posArray[i] = (Math.random() - 0.5) * 45; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({ size: 0.06, color: 0xd9c38c, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        particlesMesh = new THREE.Points(particlesGeometry, particlesMat);
        particlesMesh.scale.set(0.1, 0.1, 0.1);
        scene.add(particlesMesh);

        // Cubes
        cubesGroup = new THREE.Group();
        const boxGeo = new THREE.BoxGeometry(1, 1, 1);
        const boxMat = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 });
        const edgeGeo = new THREE.EdgesGeometry(boxGeo);
        const edgeMat = new THREE.LineBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.4 });
        const cubeCount = window.innerWidth < 768 ? 20 : 40;
        for (let i = 0; i < cubeCount; i++) {
            const mesh = new THREE.Mesh(boxGeo, boxMat);
            mesh.position.set((Math.random() - 0.5) * 35, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15);
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.add(new THREE.LineSegments(edgeGeo, edgeMat));
            mesh.userData = { targetScale: Math.random() * 2 + 0.5 };
            mesh.scale.set(0, 0, 0);
            cubesGroup.add(mesh);
        }
        scene.add(cubesGroup);
        
        particlesMesh.visible = !isLightMode;
        cubesGroup.visible = isLightMode;

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            
            const gX = window.globalX !== undefined ? window.globalX : (window.innerWidth / 2);
            const gY = window.globalY !== undefined ? window.globalY : (window.innerHeight / 2);
            
            const normalizedX = (gX / window.innerWidth) - 0.5;
            const normalizedY = (gY / window.innerHeight) - 0.5;
            
            targetX = lerp(targetX, normalizedX, 0.05);
            targetY = lerp(targetY, normalizedY, 0.05);
            
            if (window.explosionTriggered && particlesMesh && !document.body.classList.contains('light-mode')) {
                explosionScale += (1 - explosionScale) * 0.04;
                particlesMesh.scale.set(explosionScale, explosionScale, explosionScale);
            }
            if (window.cubesTriggered && cubesGroup && document.body.classList.contains('light-mode')) {
                cubesScaleFactor += (1 - cubesScaleFactor) * 0.04;
                cubesGroup.children.forEach(cube => {
                    const t = cube.userData.targetScale * cubesScaleFactor;
                    cube.scale.set(t, t, t);
                });
            }
            
            if (particlesMesh && particlesMesh.visible) {
                particlesMesh.rotation.y = targetX * 0.3 + (elapsedTime * 0.05);
                particlesMesh.rotation.x = targetY * 0.3;
            }
            if (cubesGroup && cubesGroup.visible) {
                cubesGroup.rotation.y = targetX * 0.3 + (elapsedTime * 0.05);
                cubesGroup.rotation.x = targetY * 0.3;
                cubesGroup.children.forEach(c => { c.rotation.x += 0.001; c.rotation.y += 0.002; });
            }

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (e) { console.error("3D Error", e); }
})();
