'use client';

import { useEffect, useRef } from 'react';
import type { Group, Material, Mesh, Object3D, Vector3 } from 'three';
import styles from './ServiceSculptureScene.module.css';

export type ServiceSculptureVariant = 'mobile' | 'ai' | 'saas' | 'infrastructure' | 'security';

interface ServiceSculptureSceneProps {
    variant: ServiceSculptureVariant;
}

function StaticSculpture({ variant }: ServiceSculptureSceneProps) {
    const metalId = `${variant}-metal`;
    const glassId = `${variant}-glass`;
    const glowId = `${variant}-glow`;

    return (
        <svg className={styles.fallbackArt} viewBox="0 0 420 220" aria-hidden="true">
            <defs>
                <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#d8dddb" stopOpacity="0.72" />
                    <stop offset="0.35" stopColor="#343a38" stopOpacity="0.92" />
                    <stop offset="1" stopColor="#090b0b" />
                </linearGradient>
                <linearGradient id={glassId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#89928f" stopOpacity="0.24" />
                    <stop offset="1" stopColor="#080a0a" stopOpacity="0.82" />
                </linearGradient>
                <radialGradient id={glowId}>
                    <stop offset="0" stopColor="#82b5a5" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#82b5a5" stopOpacity="0" />
                </radialGradient>
            </defs>

            <ellipse cx="210" cy="192" rx="128" ry="16" fill="#000" opacity="0.45" />

            {variant === 'mobile' && (
                <g stroke="#dce4e1" strokeOpacity="0.34">
                    <g transform="translate(111 25) rotate(-10 65 90)">
                        <rect width="130" height="180" rx="24" fill={`url(#${metalId})`} />
                        <rect x="7" y="7" width="116" height="166" rx="19" fill={`url(#${glassId})`} />
                        <rect x="45" y="12" width="40" height="8" rx="4" fill="#070909" />
                    </g>
                    <g transform="translate(213 48) rotate(7 58 80)">
                        <rect width="116" height="160" rx="22" fill={`url(#${metalId})`} />
                        <rect x="7" y="7" width="102" height="146" rx="17" fill={`url(#${glassId})`} />
                        <rect x="40" y="12" width="36" height="7" rx="4" fill="#070909" />
                        <path d="M22 124 93 45" stroke="#78ab9b" strokeOpacity="0.38" />
                    </g>
                </g>
            )}

            {variant === 'ai' && (
                <g transform="translate(0 -1)">
                    <ellipse cx="210" cy="112" rx="138" ry="67" fill="none" stroke="#aeb8b4" strokeOpacity="0.35" />
                    {[78, 119, 164, 256, 301, 342].map((x, index) => (
                        <g key={x}>
                            <line x1={x} y1={index % 2 ? 70 : 105} x2="210" y2="112" stroke="#9ba6a2" strokeOpacity="0.3" />
                            <circle cx={x} cy={index % 2 ? 70 : 105} r="12" fill={`url(#${metalId})`} stroke="#e2e7e5" strokeOpacity="0.35" />
                        </g>
                    ))}
                    <path d="m146 132 64 26 66-26-65-27Z" fill="#070909" stroke="#c9cfcd" strokeOpacity="0.4" />
                    <path d="m146 111 64 26 66-26-65-27Z" fill={`url(#${metalId})`} stroke="#e2e7e5" strokeOpacity="0.5" />
                    <path d="m154 90 57 23 57-23-57-22Z" fill={`url(#${glassId})`} stroke="#e2e7e5" strokeOpacity="0.42" />
                    {Array.from({ length: 20 }, (_, index) => (
                        <circle key={index} cx={181 + (index % 5) * 15} cy={83 + Math.floor(index / 5) * 7} r="2" fill="#bdc8c4" />
                    ))}
                </g>
            )}

            {variant === 'saas' && (
                <g stroke="#cbd3d0" strokeOpacity="0.35">
                    {[[104, 74], [186, 52], [270, 75], [145, 137], [232, 132], [316, 126]].map(([x, y]) => (
                        <line key={`${x}-${y}`} x1="211" y1="108" x2={x} y2={y} />
                    ))}
                    {[[104, 74], [186, 52], [270, 75], [145, 137], [232, 132], [316, 126]].map(([x, y], index) => (
                        <g key={`${x}-${y}-box`} transform={`translate(${x - 28} ${y - 22})`}>
                            <rect width="56" height="44" rx="7" fill={`url(#${index % 2 ? metalId : glassId})`} />
                            <circle cx="12" cy="12" r="2.5" fill="#82b5a5" />
                            <path d="M11 30h33" />
                        </g>
                    ))}
                    <g transform="translate(177 77)">
                        <rect width="68" height="58" rx="9" fill={`url(#${metalId})`} />
                        <circle cx="16" cy="15" r="3" fill="#82b5a5" />
                        <path d="M14 39h40" />
                    </g>
                </g>
            )}

            {variant === 'infrastructure' && (
                <g>
                    <ellipse cx="210" cy="115" rx="138" ry="61" fill="none" stroke="#b5bfbb" strokeOpacity="0.38" />
                    <ellipse cx="210" cy="115" rx="105" ry="88" fill="none" stroke="#6f7a76" strokeOpacity="0.28" transform="rotate(-20 210 115)" />
                    {[82, 338, 163, 278].map((x, index) => (
                        <circle key={x} cx={x} cy={index < 2 ? 115 : index === 2 ? 39 : 184} r="10" fill={`url(#${metalId})`} stroke="#e1e6e4" strokeOpacity="0.35" />
                    ))}
                    {[69, 87, 105, 123].map((y, index) => (
                        <g key={y}>
                            <rect x="164" y={y} width="92" height="24" fill={index % 2 ? `url(#${glassId})` : `url(#${metalId})`} />
                            <ellipse cx="210" cy={y} rx="46" ry="12" fill={`url(#${metalId})`} />
                        </g>
                    ))}
                    <ellipse cx="210" cy="147" rx="65" ry="17" fill={`url(#${metalId})`} />
                </g>
            )}

            {variant === 'security' && (
                <g transform="translate(0 2)">
                    <rect x="79" y="80" width="262" height="74" fill={`url(#${glassId})`} stroke="#b8c1be" strokeOpacity="0.28" />
                    {[0, 1, 2].map((index) => (
                        <path
                            key={index}
                            d="M210 28 278 55v48c0 42-29 70-68 87-39-17-68-45-68-87V55Z"
                            transform={`translate(${index * 7 - 7} ${index * 3}) scale(${1 - index * 0.12})`}
                            style={{ transformOrigin: '210px 110px' }}
                            fill={index === 2 ? `url(#${glassId})` : `url(#${metalId})`}
                            stroke="#e0e5e3"
                            strokeOpacity={0.46 - index * 0.08}
                        />
                    ))}
                    <line x1="67" y1="119" x2="351" y2="119" stroke="#8cc0b0" strokeOpacity="0.55" />
                    <circle cx="210" cy="119" r="23" fill={`url(#${glowId})`} />
                </g>
            )}
        </svg>
    );
}

export default function ServiceSculptureScene({ variant }: ServiceSculptureSceneProps) {
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
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 1.08;

                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 30);
                camera.position.set(0, 0.12, 6.3);

                const environmentGenerator = new THREE.PMREMGenerator(renderer);
                const environmentScene = new RoomEnvironment();
                const environmentTarget = environmentGenerator.fromScene(environmentScene, 0.035);
                scene.environment = environmentTarget.texture;
                environmentScene.dispose();

                const sculpture = new THREE.Group();
                scene.add(sculpture);

                const chrome = new THREE.MeshPhysicalMaterial({
                    color: 0x8b9290,
                    metalness: 0.94,
                    roughness: 0.17,
                    clearcoat: 1,
                    clearcoatRoughness: 0.1,
                });
                const darkChrome = new THREE.MeshPhysicalMaterial({
                    color: 0x101313,
                    metalness: 0.86,
                    roughness: 0.22,
                    clearcoat: 0.9,
                    clearcoatRoughness: 0.14,
                });
                const glass = new THREE.MeshPhysicalMaterial({
                    color: 0x0a0d0c,
                    metalness: 0.16,
                    roughness: 0.28,
                    transparent: true,
                    opacity: 0.72,
                    clearcoat: 0.8,
                    clearcoatRoughness: 0.16,
                });
                const accent = new THREE.MeshStandardMaterial({
                    color: 0x82ad9f,
                    emissive: 0x20473b,
                    emissiveIntensity: 1.12,
                    metalness: 0.24,
                    roughness: 0.26,
                });
                const dim = new THREE.MeshStandardMaterial({
                    color: 0x242a28,
                    metalness: 0.5,
                    roughness: 0.4,
                });
                const line = new THREE.LineBasicMaterial({
                    color: 0xcbd4d1,
                    transparent: true,
                    opacity: 0.5,
                });

                const animated: Array<{
                    object: Object3D;
                    baseY: number;
                    baseRotationY: number;
                    phase: number;
                    amplitude: number;
                }> = [];

                const addRounded = (
                    parent: Object3D,
                    size: [number, number, number],
                    position: [number, number, number],
                    material: Material,
                    radius = 0.08,
                ) => {
                    const mesh = new THREE.Mesh(
                        new RoundedBoxGeometry(size[0], size[1], size[2], 4, Math.min(radius, size[0] * 0.2, size[1] * 0.35)),
                        material,
                    );
                    mesh.position.set(...position);
                    parent.add(mesh);
                    return mesh;
                };

                const addOutline = (mesh: Mesh, opacity = 0.36) => {
                    const outline = new THREE.LineSegments(
                        new THREE.EdgesGeometry(mesh.geometry, 28),
                        new THREE.LineBasicMaterial({ color: 0xe3e8e6, transparent: true, opacity }),
                    );
                    mesh.add(outline);
                };

                const addRod = (parent: Group, from: Vector3, to: Vector3, radius = 0.018) => {
                    const direction = new THREE.Vector3().subVectors(to, from);
                    const rod = new THREE.Mesh(
                        new THREE.CylinderGeometry(radius, radius, direction.length(), 12),
                        dim,
                    );
                    rod.position.copy(from).add(to).multiplyScalar(0.5);
                    rod.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
                    parent.add(rod);
                    return rod;
                };

                const createPhone = (position: [number, number, number], rotation: [number, number, number], scale: number) => {
                    const phone = new THREE.Group();
                    phone.position.set(...position);
                    phone.rotation.set(...rotation);
                    phone.scale.setScalar(scale);
                    sculpture.add(phone);

                    const shell = addRounded(phone, [1.42, 2.7, 0.19], [0, 0, 0], darkChrome, 0.2);
                    addOutline(shell, 0.5);
                    addRounded(phone, [1.26, 2.48, 0.045], [0, 0, 0.12], glass, 0.16);
                    addRounded(phone, [0.42, 0.09, 0.035], [0, 1.08, 0.16], dim, 0.04);
                    addRounded(phone, [0.04, 0.48, 0.04], [0.735, 0.35, 0.015], chrome, 0.02);

                    const diagonal = new THREE.Line(
                        new THREE.BufferGeometry().setFromPoints([
                            new THREE.Vector3(-0.45, -0.88, 0.16),
                            new THREE.Vector3(0.43, 0.72, 0.16),
                        ]),
                        new THREE.LineBasicMaterial({ color: 0x82ad9f, transparent: true, opacity: 0.32 }),
                    );
                    phone.add(diagonal);
                    animated.push({ object: phone, baseY: position[1], baseRotationY: rotation[1], phase: animated.length * 1.8, amplitude: 0.035 });
                };

                if (variant === 'mobile') {
                    sculpture.position.set(0, 0.02, 0);
                    sculpture.rotation.set(-0.02, 0.02, 0);
                    sculpture.scale.setScalar(0.84);
                    createPhone([-0.5, 0.15, -0.35], [-0.08, -0.28, -0.13], 1);
                    createPhone([0.58, -0.24, 0.45], [0.04, 0.18, 0.065], 0.88);
                }

                if (variant === 'ai') {
                    sculpture.position.set(0, 0, 0);
                    sculpture.rotation.set(-0.27, -0.36, -0.02);
                    sculpture.scale.setScalar(0.7);
                    const chipGroup = new THREE.Group();
                    sculpture.add(chipGroup);
                    [-0.42, 0, 0.42].forEach((y, index) => {
                        const chip = addRounded(chipGroup, [2.25 - index * 0.08, 0.38, 1.58 - index * 0.04], [0, y, 0], index === 2 ? chrome : darkChrome, 0.12);
                        addOutline(chip, 0.34);
                        animated.push({ object: chip, baseY: y, baseRotationY: 0, phase: index * 0.8, amplitude: 0.025 });
                    });
                    const cap = addRounded(chipGroup, [1.72, 0.17, 1.18], [0, 0.74, 0], glass, 0.1);
                    addOutline(cap, 0.44);
                    for (let row = 0; row < 4; row += 1) {
                        for (let column = 0; column < 6; column += 1) {
                            const pin = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), column === 0 && row === 0 ? accent : chrome);
                            pin.position.set(-0.54 + column * 0.215, 0.86, -0.33 + row * 0.22);
                            chipGroup.add(pin);
                        }
                    }
                    const orbit = new THREE.Group();
                    orbit.rotation.x = 0.76;
                    sculpture.add(orbit);
                    orbit.add(new THREE.Mesh(new THREE.TorusGeometry(2.28, 0.012, 8, 96), line));
                    orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.01, 8, 96), line));
                    for (let index = 0; index < 6; index += 1) {
                        const angle = (index / 6) * Math.PI * 2;
                        const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.19, 20, 14), index === 2 ? accent : chrome);
                        satellite.position.set(Math.cos(angle) * 2.28, Math.sin(angle) * 2.28, 0);
                        orbit.add(satellite);
                        addRod(orbit, new THREE.Vector3(0, 0, 0), satellite.position.clone(), 0.012);
                    }
                    animated.push({ object: orbit, baseY: 0, baseRotationY: 0, phase: 0.4, amplitude: 0.02 });
                }

                if (variant === 'saas') {
                    sculpture.position.set(0, 0.02, 0);
                    sculpture.rotation.set(-0.18, -0.34, -0.015);
                    sculpture.scale.setScalar(0.86);
                    const positions: Array<[number, number, number]> = [
                        [0, 0, 0.25], [-1.62, 0.52, -0.45], [1.55, 0.58, -0.35],
                        [-1.25, -0.72, 0.3], [1.15, -0.68, 0.45], [0.15, 0.86, -0.72],
                    ];
                    positions.slice(1).forEach((position) => {
                        addRod(sculpture, new THREE.Vector3(...positions[0]), new THREE.Vector3(...position), 0.035);
                    });
                    positions.forEach((position, index) => {
                        const node = addRounded(
                            sculpture,
                            index === 0 ? [1.18, 0.95, 0.88] : [0.94, 0.74, 0.72],
                            position,
                            index === 0 ? chrome : darkChrome,
                            0.11,
                        );
                        addOutline(node, index === 0 ? 0.5 : 0.3);
                        addRounded(node, [index === 0 ? 0.66 : 0.5, 0.055, 0.035], [0, -0.12, index === 0 ? 0.47 : 0.39], dim, 0.02);
                        const status = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), index % 3 === 0 ? accent : chrome);
                        status.position.set(-0.3, 0.18, index === 0 ? 0.49 : 0.4);
                        node.add(status);
                        animated.push({ object: node, baseY: position[1], baseRotationY: 0, phase: index * 0.78, amplitude: 0.035 });
                    });
                }

                if (variant === 'infrastructure') {
                    sculpture.position.set(0, 0.02, 0);
                    sculpture.rotation.set(-0.16, -0.18, 0);
                    sculpture.scale.setScalar(0.72);
                    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.55, 0.26, 64), darkChrome);
                    base.position.y = -0.95;
                    sculpture.add(base);
                    addOutline(base, 0.28);
                    [-0.55, -0.14, 0.27, 0.68].forEach((y, index) => {
                        const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.96, 0.32, 48), index === 3 ? chrome : darkChrome);
                        disc.position.y = y;
                        sculpture.add(disc);
                        addOutline(disc, 0.34);
                        animated.push({ object: disc, baseY: y, baseRotationY: 0, phase: index * 0.65, amplitude: 0.018 });
                    });
                    const orbit = new THREE.Group();
                    orbit.rotation.x = 0.98;
                    sculpture.add(orbit);
                    orbit.add(new THREE.Mesh(new THREE.TorusGeometry(2.18, 0.014, 8, 96), line));
                    orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.012, 8, 96), line));
                    for (let index = 0; index < 4; index += 1) {
                        const angle = index * Math.PI * 0.5 + 0.35;
                        const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 12), index === 1 ? accent : chrome);
                        satellite.position.set(Math.cos(angle) * 2.18, Math.sin(angle) * 2.18, 0);
                        orbit.add(satellite);
                    }
                    animated.push({ object: orbit, baseY: 0, baseRotationY: 0, phase: 1.2, amplitude: 0.016 });
                }

                if (variant === 'security') {
                    sculpture.position.set(0, 0.03, 0);
                    sculpture.rotation.set(0.02, -0.24, 0);
                    sculpture.scale.setScalar(0.76);
                    const grid = new THREE.GridHelper(4.7, 14, 0x6e7975, 0x343a38);
                    grid.rotation.x = Math.PI / 2;
                    grid.position.z = -0.7;
                    const gridMaterial = grid.material as Material;
                    gridMaterial.transparent = true;
                    gridMaterial.opacity = 0.2;
                    sculpture.add(grid);

                    const shieldShape = new THREE.Shape();
                    shieldShape.moveTo(0, 1.42);
                    shieldShape.lineTo(1.02, 1.02);
                    shieldShape.lineTo(0.9, -0.48);
                    shieldShape.quadraticCurveTo(0.56, -1.16, 0, -1.48);
                    shieldShape.quadraticCurveTo(-0.56, -1.16, -0.9, -0.48);
                    shieldShape.lineTo(-1.02, 1.02);
                    shieldShape.closePath();

                    [1, 0.79, 0.58].forEach((scale, index) => {
                        const geometry = new THREE.ExtrudeGeometry(shieldShape, {
                            depth: 0.11,
                            bevelEnabled: true,
                            bevelSegments: 3,
                            bevelSize: 0.055,
                            bevelThickness: 0.05,
                        });
                        geometry.center();
                        const shield = new THREE.Mesh(geometry, index === 1 ? darkChrome : index === 2 ? glass : chrome);
                        shield.scale.setScalar(scale);
                        shield.position.set(index * 0.14 - 0.14, 0, index * 0.26);
                        sculpture.add(shield);
                        addOutline(shield, 0.42 - index * 0.07);
                        animated.push({ object: shield, baseY: 0, baseRotationY: 0, phase: index * 0.75, amplitude: 0.018 });
                    });
                    addRod(sculpture, new THREE.Vector3(-2.25, 0, 0.48), new THREE.Vector3(2.25, 0, 0.48), 0.018).material = accent;
                    const scanPoint = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), accent);
                    scanPoint.position.set(0.72, 0, 0.5);
                    sculpture.add(scanPoint);
                }

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.62);
                const keyLight = new THREE.SpotLight(0xffffff, 58, 20, Math.PI * 0.3, 0.75, 1.5);
                keyLight.position.set(4.2, 5.2, 6);
                keyLight.target.position.set(0, 0, 0);
                const rimLight = new THREE.PointLight(0x83b4a4, 38, 14, 1.8);
                rimLight.position.set(-3.8, -0.3, 4);
                const fillLight = new THREE.PointLight(0xdde5e2, 20, 12, 2);
                fillLight.position.set(0.5, 1.5, -2.8);
                scene.add(ambientLight, keyLight, keyLight.target, rimLight, fillLight);

                const pointerTarget = { x: 0, y: 0 };
                const pointerCurrent = { x: 0, y: 0 };
                const baseRotation = { x: sculpture.rotation.x, y: sculpture.rotation.y };
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
                    sculpture.rotation.y = baseRotation.y + pointerCurrent.x * 0.18;
                    sculpture.rotation.x = baseRotation.x - pointerCurrent.y * 0.1;
                    keyLight.position.x = 4.2 + pointerCurrent.x * 1.15;
                    keyLight.position.y = 5.2 - pointerCurrent.y * 0.65;

                    if (!reducedMotion.matches) {
                        animated.forEach(({ object, baseY, baseRotationY, phase, amplitude }, index) => {
                            object.position.y = baseY + Math.sin(time * 0.00055 + phase) * amplitude;
                            object.rotation.y = baseRotationY + Math.cos(time * 0.00028 + phase) * (0.008 + index * 0.0004);
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
                        const disposable = object as Object3D & {
                            geometry?: { dispose: () => void };
                            material?: Material | Material[];
                        };
                        disposable.geometry?.dispose();
                        if (Array.isArray(disposable.material)) {
                            disposable.material.forEach((material) => material.dispose());
                        } else {
                            disposable.material?.dispose();
                        }
                    });
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
                    console.warn(`${variant} service scene fell back to its static preview.`, error);
                }
            }
        };

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
                if (inView) void initializeScene();
                syncSceneVisibility();
            },
            { rootMargin: '100px 0px', threshold: 0 },
        );
        visibilityObserver.observe(root);
        const initialVisibilityFrame = window.requestAnimationFrame(() => {
            const rect = root.getBoundingClientRect();
            inView = rect.bottom >= -100 && rect.top <= window.innerHeight + 100;
            if (inView) void initializeScene();
        });

        return () => {
            disposed = true;
            window.cancelAnimationFrame(initialVisibilityFrame);
            visibilityObserver.disconnect();
            teardownScene();
        };
    }, [variant]);

    return (
        <div ref={rootRef} className={styles.scene} data-variant={variant} aria-hidden="true">
            <div className={styles.fallback}>
                <StaticSculpture variant={variant} />
            </div>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
