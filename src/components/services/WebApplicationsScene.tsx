'use client';

import { useEffect, useRef } from 'react';
import styles from './WebApplicationsScene.module.css';

export default function WebApplicationsScene() {
    const rootRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const canvas = canvasRef.current;

        if (!root || !canvas) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const compactViewport = window.matchMedia('(max-width: 767px)');
        let disposed = false;
        let initialized = false;
        let inView = false;
        let teardownScene = () => {};
        let syncSceneVisibility = () => {};

        const initializeScene = async () => {
            if (initialized || disposed || compactViewport.matches) return;
            initialized = true;

            try {
                const [THREE, { RoundedBoxGeometry }, { RoomEnvironment }] = await Promise.all([
                    import('three'),
                    import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
                    import('three/examples/jsm/environments/RoomEnvironment.js'),
                ]);
                if (disposed) return;

                const renderer = new THREE.WebGLRenderer({
                    canvas,
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                });
                renderer.setClearColor(0x000000, 0);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 1.06;
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFShadowMap;

                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(29, 1, 0.1, 30);
                camera.position.set(0, 0.1, 6.15);

                const environmentGenerator = new THREE.PMREMGenerator(renderer);
                const environmentScene = new RoomEnvironment();
                const environmentTarget = environmentGenerator.fromScene(environmentScene, 0.035);
                scene.environment = environmentTarget.texture;
                environmentScene.dispose();

                const sculpture = new THREE.Group();
                sculpture.position.set(-0.05, 0.08, 0);
                sculpture.rotation.set(-0.08, -0.2, -0.018);
                sculpture.scale.setScalar(0.88);
                scene.add(sculpture);

                const glassMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x080b0a,
                    emissive: 0x010202,
                    emissiveIntensity: 0.16,
                    metalness: 0.14,
                    roughness: 0.3,
                    transmission: 0,
                    transparent: true,
                    opacity: 0.86,
                    thickness: 0.18,
                    clearcoat: 0.72,
                    clearcoatRoughness: 0.2,
                });
                const glassRearMaterial = glassMaterial.clone();
                glassRearMaterial.opacity = 0.58;
                const chromeMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x8b9290,
                    metalness: 0.94,
                    roughness: 0.16,
                    clearcoat: 1,
                    clearcoatRoughness: 0.1,
                });
                const edgeMaterial = new THREE.LineBasicMaterial({
                    color: 0xe7ecea,
                    transparent: true,
                    opacity: 0.66,
                });
                const brightUiMaterial = new THREE.MeshStandardMaterial({
                    color: 0x79837f,
                    emissive: 0x101513,
                    emissiveIntensity: 0.24,
                    metalness: 0.52,
                    roughness: 0.32,
                });
                const dimUiMaterial = new THREE.MeshStandardMaterial({
                    color: 0x1d2321,
                    metalness: 0.42,
                    roughness: 0.46,
                });
                const accentMaterial = new THREE.MeshStandardMaterial({
                    color: 0x83aa9e,
                    emissive: 0x23483d,
                    emissiveIntensity: 1.05,
                    metalness: 0.2,
                    roughness: 0.28,
                });
                const chartMaterial = new THREE.LineBasicMaterial({
                    color: 0xb8c4c0,
                    transparent: true,
                    opacity: 0.78,
                });

                const panels: Array<{
                    group: InstanceType<typeof THREE.Group>;
                    baseY: number;
                    baseZ: number;
                    drift: number;
                }> = [];

                const addRoundedBlock = (
                    parent: InstanceType<typeof THREE.Group>,
                    width: number,
                    height: number,
                    x: number,
                    y: number,
                    z: number,
                    material: InstanceType<typeof THREE.Material>,
                    radius = 0.025,
                ) => {
                    const block = new THREE.Mesh(
                        new RoundedBoxGeometry(width, height, 0.035, 3, Math.min(radius, height * 0.42)),
                        material,
                    );
                    block.position.set(x, y, z);
                    parent.add(block);
                    return block;
                };

                const createPanel = ({
                    width,
                    height,
                    x,
                    y,
                    z,
                    scale = 1,
                }: {
                    width: number;
                    height: number;
                    x: number;
                    y: number;
                    z: number;
                    scale?: number;
                }) => {
                    const panel = new THREE.Group();
                    panel.position.set(x, y, z);
                    panel.scale.setScalar(scale);

                    const shellGeometry = new RoundedBoxGeometry(width, height, 0.13, 5, 0.12);
                    const shell = new THREE.Mesh(
                        shellGeometry,
                        panels.length < 2 ? glassRearMaterial : glassMaterial,
                    );
                    shell.castShadow = true;
                    panel.add(shell);

                    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(shellGeometry, 28), edgeMaterial);
                    panel.add(outline);

                    addRoundedBlock(panel, width * 0.9, 0.045, 0, height * 0.35, 0.095, dimUiMaterial);

                    [-0.37, -0.28, -0.19].forEach((ratio, index) => {
                        const dot = new THREE.Mesh(
                            new THREE.SphereGeometry(0.043, 16, 10),
                            index === 0 ? accentMaterial : chromeMaterial,
                        );
                        dot.position.set(width * ratio, height * 0.35, 0.14);
                        panel.add(dot);
                    });

                    addRoundedBlock(panel, width * 0.19, height * 0.53, -width * 0.34, -height * 0.08, 0.1, dimUiMaterial, 0.05);
                    addRoundedBlock(panel, width * 0.42, height * 0.22, width * 0.08, height * 0.12, 0.11, dimUiMaterial, 0.06);
                    addRoundedBlock(panel, width * 0.48, 0.045, width * 0.1, -height * 0.16, 0.13, brightUiMaterial);
                    addRoundedBlock(panel, width * 0.34, 0.04, width * 0.03, -height * 0.27, 0.13, dimUiMaterial);

                    const chartPoints = [
                        new THREE.Vector3(-width * 0.08, height * 0.06, 0.145),
                        new THREE.Vector3(width * 0.01, height * 0.16, 0.145),
                        new THREE.Vector3(width * 0.1, height * 0.01, 0.145),
                        new THREE.Vector3(width * 0.18, height * 0.12, 0.145),
                        new THREE.Vector3(width * 0.29, height * 0.04, 0.145),
                    ];
                    const chartCurve = new THREE.CatmullRomCurve3(chartPoints);
                    const chartLine = new THREE.Line(
                        new THREE.BufferGeometry().setFromPoints(chartCurve.getPoints(32)),
                        chartMaterial,
                    );
                    panel.add(chartLine);

                    sculpture.add(panel);
                    panels.push({ group: panel, baseY: y, baseZ: z, drift: panels.length * 0.82 });
                    return panel;
                };

                const rearPanel = createPanel({ width: 3.25, height: 1.94, x: -0.82, y: 0.34, z: -1.02, scale: 0.88 });
                rearPanel.rotation.y = 0.055;

                const middlePanel = createPanel({ width: 3.42, height: 2.04, x: -0.4, y: 0.18, z: -0.56, scale: 0.94 });
                middlePanel.rotation.y = 0.025;

                createPanel({ width: 3.5, height: 2.12, x: 0.1, y: -0.02, z: -0.06 });

                const frontPanel = createPanel({ width: 2.05, height: 1.14, x: 1.32, y: -0.58, z: 0.76 });
                frontPanel.rotation.y = -0.08;
                frontPanel.rotation.z = -0.012;

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.56);
                const keyLight = new THREE.SpotLight(0xffffff, 62, 22, Math.PI * 0.28, 0.72, 1.45);
                keyLight.position.set(4.4, 5.2, 6.2);
                keyLight.target.position.set(0, 0, 0);
                keyLight.castShadow = true;
                keyLight.shadow.mapSize.set(512, 512);
                const rimLight = new THREE.PointLight(0x8fb7aa, 42, 15, 1.8);
                rimLight.position.set(-3.8, -0.4, 3.8);
                const fillLight = new THREE.PointLight(0xdde5e2, 24, 12, 2);
                fillLight.position.set(0.4, 1.8, -2.5);
                scene.add(ambientLight, keyLight, keyLight.target, rimLight, fillLight);

                const pointerTarget = { x: 0, y: 0 };
                const pointerCurrent = { x: 0, y: 0 };
                let frameId = 0;
                let running = false;

                const resize = () => {
                    const { width, height } = root.getBoundingClientRect();
                    if (width <= 0 || height <= 0) return;
                    renderer.setSize(width, height, false);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                };

                const renderFrame = (time = 0) => {
                    pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.065;
                    pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.065;
                    sculpture.rotation.y = -0.18 + pointerCurrent.x * 0.18;
                    sculpture.rotation.x = -0.05 - pointerCurrent.y * 0.1;
                    keyLight.position.x = 4.4 + pointerCurrent.x * 1.2;
                    keyLight.position.y = 5.2 - pointerCurrent.y * 0.65;

                    if (!reducedMotion.matches) {
                        panels.forEach(({ group, baseY, baseZ, drift }, index) => {
                            group.position.z = baseZ + Math.sin(time * 0.00062 + drift) * (0.035 + index * 0.007);
                            group.position.y = baseY + Math.cos(time * 0.00048 + drift) * 0.018;
                        });
                    }

                    renderer.render(scene, camera);
                };

                const tick = (time: number) => {
                    renderFrame(time);
                    frameId = window.requestAnimationFrame(tick);
                };

                const stop = () => {
                    if (!running) return;
                    window.cancelAnimationFrame(frameId);
                    running = false;
                };

                const start = () => {
                    if (running || !inView || document.hidden || reducedMotion.matches) {
                        renderFrame();
                        return;
                    }
                    running = true;
                    frameId = window.requestAnimationFrame(tick);
                };

                const onPointerMove = (event: PointerEvent) => {
                    if (event.pointerType === 'touch' || reducedMotion.matches) return;
                    const rect = root.getBoundingClientRect();
                    pointerTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                    pointerTarget.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
                };

                const onPointerLeave = () => {
                    pointerTarget.x = 0;
                    pointerTarget.y = 0;
                };

                const onVisibilityChange = () => {
                    if (document.hidden) stop();
                    else start();
                };

                const onMotionPreferenceChange = () => {
                    if (reducedMotion.matches) {
                        stop();
                        pointerTarget.x = 0;
                        pointerTarget.y = 0;
                        renderFrame();
                    } else {
                        start();
                    }
                };

                const onContextLost = (event: Event) => {
                    event.preventDefault();
                    stop();
                    delete root.dataset.ready;
                };

                const resizeObserver = new ResizeObserver(resize);
                resizeObserver.observe(root);
                root.addEventListener('pointermove', onPointerMove);
                root.addEventListener('pointerleave', onPointerLeave);
                canvas.addEventListener('webglcontextlost', onContextLost);
                document.addEventListener('visibilitychange', onVisibilityChange);
                reducedMotion.addEventListener('change', onMotionPreferenceChange);

                syncSceneVisibility = () => {
                    if (inView) start();
                    else stop();
                };

                resize();
                renderFrame();
                root.dataset.ready = 'true';
                syncSceneVisibility();

                teardownScene = () => {
                    stop();
                    resizeObserver.disconnect();
                    root.removeEventListener('pointermove', onPointerMove);
                    root.removeEventListener('pointerleave', onPointerLeave);
                    canvas.removeEventListener('webglcontextlost', onContextLost);
                    document.removeEventListener('visibilitychange', onVisibilityChange);
                    reducedMotion.removeEventListener('change', onMotionPreferenceChange);

                    scene.traverse((object) => {
                        if (
                            !(object instanceof THREE.Mesh)
                            && !(object instanceof THREE.LineSegments)
                            && !(object instanceof THREE.Line)
                        ) return;
                        object.geometry.dispose();
                    });
                    glassMaterial.dispose();
                    glassRearMaterial.dispose();
                    chromeMaterial.dispose();
                    edgeMaterial.dispose();
                    brightUiMaterial.dispose();
                    dimUiMaterial.dispose();
                    accentMaterial.dispose();
                    chartMaterial.dispose();
                    environmentTarget.dispose();
                    environmentGenerator.dispose();
                    renderer.dispose();
                    renderer.forceContextLoss();
                    syncSceneVisibility = () => {};
                };
            } catch (error) {
                initialized = false;
                delete root.dataset.ready;
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('Web Applications scene fell back to its static preview.', error);
                }
            }
        };

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
                if (inView) void initializeScene();
                syncSceneVisibility();
            },
            { rootMargin: '180px 0px', threshold: 0 },
        );
        visibilityObserver.observe(root);
        const initialVisibilityFrame = window.requestAnimationFrame(() => {
            const rect = root.getBoundingClientRect();
            inView = rect.bottom >= -180 && rect.top <= window.innerHeight + 180;
            if (inView) void initializeScene();
        });

        return () => {
            disposed = true;
            window.cancelAnimationFrame(initialVisibilityFrame);
            visibilityObserver.disconnect();
            teardownScene();
        };
    }, []);

    return (
        <div ref={rootRef} className={styles.scene} aria-hidden="true">
            <div className={styles.fallback}>
                <span className={styles.fallbackPanel} />
                <span className={styles.fallbackPanel} />
                <span className={styles.fallbackPanel} />
            </div>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
