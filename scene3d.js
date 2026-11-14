/*
 * BUSSY 67! — Three.js Chapter 01 foundation.
 * One transparent WebGL scene behind the existing accessible HTML.
 * Uses the original bus.png as a texture.
 */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/libs/meshopt_decoder.module.js";

export async function createStoryExperience({mount,landingScene,travelScene,marsTravelScene,surfaceScene,lrvScene,alsepScene,surveyorScene,opportunityScene,spiritScene,insightScene,pathfinderScene,returnScene,finalScene,gsap,ScrollTrigger}){
 if(!mount||!landingScene||!travelScene||!marsTravelScene||!surfaceScene||!lrvScene||!alsepScene||!surveyorScene||!opportunityScene||!spiritScene||!insightScene||!pathfinderScene||!returnScene||!finalScene||!gsap||!ScrollTrigger)throw new Error("Missing 3D mount, story scenes or animation dependencies.");
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 const mobile=matchMedia("(max-width: 620px)").matches;
 const isPortrait=()=>matchMedia("(orientation: portrait)").matches&&Math.min(innerWidth,innerHeight)<=620;
 const isNarrow=()=>Math.min(innerWidth,innerHeight)<=620;
 const lowPower=(navigator.hardwareConcurrency||4)<=4;
 const pixelCap=reduced||lowPower?1.25:mobile?1.5:1.8;
 let disposed=false,pageVisible=!document.hidden,sceneVisible=true,raf=0,last=0;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);
 camera.position.set(0,0,8.6);
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:!lowPower,powerPreference:"high-performance",stencil:false,depth:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,pixelCap));
 renderer.setSize(mount.clientWidth||innerWidth,mount.clientHeight||innerHeight,false);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.shadowMap.enabled=true;
 renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.15;
 mount.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0x9dbdff,1.15));
 const key=new THREE.DirectionalLight(0xffe2b5,2.4);
 key.position.set(-4,5,7);key.castShadow=true;
 key.shadow.mapSize.set(1024,1024);
 key.shadow.camera.left=-24;key.shadow.camera.right=24;
 key.shadow.camera.top=24;key.shadow.camera.bottom=-24;
 scene.add(key);

 // Procedural stylized Earth texture; illustrative rather than geographic data.
 const mapCanvas=document.createElement("canvas");mapCanvas.width=1024;mapCanvas.height=512;
 const ctx=mapCanvas.getContext("2d"),ocean=ctx.createLinearGradient(0,0,1024,512);
 ocean.addColorStop(0,"#174b83");ocean.addColorStop(.5,"#0b2c59");ocean.addColorStop(1,"#06162f");
 ctx.fillStyle=ocean;ctx.fillRect(0,0,1024,512);
 const land=ctx.createLinearGradient(0,80,0,450);land.addColorStop(0,"#8aab72");land.addColorStop(.55,"#527d59");land.addColorStop(1,"#b2a477");ctx.fillStyle=land;
 const shapes=[
 [[115,112],[160,76],[213,83],[240,121],[218,151],[190,170],[178,215],[145,230],[123,190],[93,165]],
 [[205,235],[247,250],[260,302],[238,355],[215,397],[192,350],[181,296]],
 [[420,105],[462,81],[501,95],[518,131],[489,158],[455,150]],
 [[480,172],[529,183],[550,236],[534,300],[501,350],[475,306],[458,245]],
 [[610,110],[656,87],[712,100],[750,133],[725,167],[681,176],[650,151]],
 [[690,208],[735,205],[765,250],[745,310],[709,329],[682,279]],
 [[820,300],[860,278],[895,302],[886,339],[846,350]]
 ];
 shapes.forEach(p=>{ctx.beginPath();p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();});
 const ice=ctx.createLinearGradient(0,0,0,65);ice.addColorStop(0,"rgba(225,242,255,.92)");ice.addColorStop(1,"rgba(225,242,255,0)");ctx.fillStyle=ice;ctx.fillRect(0,0,1024,65);
 const earthMap=new THREE.CanvasTexture(mapCanvas);earthMap.colorSpace=THREE.SRGBColorSpace;earthMap.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
 const earthGroup=new THREE.Group();earthGroup.position.set(mobile?-.75:-3.25,mobile?.72:-.25,mobile?-1.8:-1.35);earthGroup.scale.setScalar(mobile?.58:1);scene.add(earthGroup);
 const earth=new THREE.Mesh(new THREE.SphereGeometry(2.05,lowPower?40:64,lowPower?32:48),new THREE.MeshStandardMaterial({map:earthMap,roughness:.92,metalness:.02}));earthGroup.add(earth);
 earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(2.13,48,32),new THREE.MeshBasicMaterial({color:0x56aaff,transparent:true,opacity:.19,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false})));
 earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(2.17,48,32),new THREE.MeshBasicMaterial({color:0x9bdcff,transparent:true,opacity:.075,side:THREE.BackSide,depthWrite:false})));
 // A realistic lunar globe using NASA's LRO/LROC 2025 color map.
 // NASA SVS CGI Moon Kit: https://svs.gsfc.nasa.gov/4720/
 // 2K map (2048x1024); a procedural crater map remains available if the CDN fails.
 const moonCanvas=document.createElement("canvas");moonCanvas.width=1024;moonCanvas.height=512;
 const moonCtx=moonCanvas.getContext("2d");
 const moonBase=moonCtx.createLinearGradient(0,0,1024,512);
 moonBase.addColorStop(0,"#a09d96");moonBase.addColorStop(.5,"#77756f");moonBase.addColorStop(1,"#aaa69d");
 moonCtx.fillStyle=moonBase;moonCtx.fillRect(0,0,1024,512);
 for(let i=0;i<430;i++){
   const x=Math.random()*1024,y=Math.random()*512,r=2+Math.random()*19;
   const crater=moonCtx.createRadialGradient(x-r*.22,y-r*.25,r*.12,x,y,r);
   crater.addColorStop(0,"rgba(47,47,46,.46)");crater.addColorStop(.55,"rgba(83,82,78,.23)");
   crater.addColorStop(.82,"rgba(190,187,178,.12)");crater.addColorStop(1,"rgba(45,45,44,.2)");
   moonCtx.fillStyle=crater;moonCtx.beginPath();moonCtx.arc(x,y,r,0,Math.PI*2);moonCtx.fill();
 }
 const fallbackMoonMap=new THREE.CanvasTexture(moonCanvas);
 fallbackMoonMap.colorSpace=THREE.SRGBColorSpace;
 fallbackMoonMap.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
 const moonMaterial=new THREE.MeshStandardMaterial({map:fallbackMoonMap,bumpMap:fallbackMoonMap,bumpScale:.035,roughness:1,metalness:0});
 const moonGroup=new THREE.Group();
 moonGroup.position.set(mobile?1.0:4.8,mobile?1.35:.45,-2.55);
 moonGroup.scale.setScalar(.075);
 scene.add(moonGroup);
 const moon=new THREE.Mesh(new THREE.SphereGeometry(2.05,lowPower?48:72,lowPower?36:56),moonMaterial);
 moonGroup.add(moon);
 const moonTextureUrl="https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_2k.jpg";
 const moonLoader=new THREE.TextureLoader();moonLoader.setCrossOrigin("anonymous");
 const releaseFallbackMoonMap=()=>{
   if(moonMaterial.map!==fallbackMoonMap&&moonMaterial.bumpMap!==fallbackMoonMap)fallbackMoonMap.dispose();
 };
 moonLoader.load(moonTextureUrl,texture=>{
   if(disposed){texture.dispose();return;}
   texture.colorSpace=THREE.SRGBColorSpace;
   texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
   moonMaterial.map=texture;
   moonMaterial.needsUpdate=true;
   releaseFallbackMoonMap();
 },undefined,()=>{ /* The procedural crater texture remains as a graceful offline fallback. */ });
 // NASA LOLA elevation map adds genuine crater and terrain relief through bump mapping.
 const heightLoader=new THREE.TextureLoader();heightLoader.setCrossOrigin("anonymous");
 heightLoader.load("https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg",texture=>{
   if(disposed){texture.dispose();return;}
   texture.colorSpace=THREE.NoColorSpace;
   texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
   moonMaterial.bumpMap=texture;
   moonMaterial.bumpScale=.045;
   moonMaterial.needsUpdate=true;
   releaseFallbackMoonMap();
 },undefined,()=>{ /* Keep the color map and its subtle procedural relief if height data is unavailable. */ });


 const count=lowPower?420:mobile?650:1050,positions=new Float32Array(count*3);
 for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*24;positions[i*3+1]=(Math.random()-.5)*13;positions[i*3+2]=-7-Math.random()*16;}
 const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
 const stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xdceaff,size:.035,transparent:true,opacity:.88,depthWrite:false}));scene.add(stars);

 // CHAPTER 6 — PROCEDURAL 3D MARS
 // A locally generated equirectangular surface keeps the globe self-contained.
 const marsCanvas=document.createElement("canvas");
 marsCanvas.width=1024;marsCanvas.height=512;
 const marsCtx=marsCanvas.getContext("2d");
 const marsBase=marsCtx.createLinearGradient(0,0,1024,512);
 marsBase.addColorStop(0,"#b96848");marsBase.addColorStop(.34,"#9f4d36");
 marsBase.addColorStop(.68,"#c77b55");marsBase.addColorStop(1,"#6f3027");
 marsCtx.fillStyle=marsBase;marsCtx.fillRect(0,0,1024,512);
 for(let i=0;i<95;i++){
   const x=Math.random()*1024,y=30+Math.random()*452,rw=18+Math.random()*100,rh=8+Math.random()*42;
   marsCtx.fillStyle=Math.random()>.52?"rgba(75,35,29,.17)":"rgba(235,157,105,.16)";
   marsCtx.beginPath();marsCtx.ellipse(x,y,rw,rh,Math.random()*.8,0,Math.PI*2);marsCtx.fill();
 }
 for(let i=0;i<360;i++){
   const x=Math.random()*1024,y=20+Math.random()*472,r=1.5+Math.random()*12;
   const crater=marsCtx.createRadialGradient(x-r*.24,y-r*.28,r*.08,x,y,r);
   crater.addColorStop(0,"rgba(72,35,29,.34)");crater.addColorStop(.52,"rgba(93,43,32,.18)");
   crater.addColorStop(.78,"rgba(232,157,111,.19)");crater.addColorStop(1,"rgba(67,31,27,.22)");
   marsCtx.fillStyle=crater;marsCtx.beginPath();marsCtx.arc(x,y,r,0,Math.PI*2);marsCtx.fill();
 }
 const northCap=marsCtx.createLinearGradient(0,0,0,58);
 northCap.addColorStop(0,"rgba(239,216,190,.78)");northCap.addColorStop(1,"rgba(239,216,190,0)");
 marsCtx.fillStyle=northCap;marsCtx.fillRect(0,0,1024,58);
 const southCap=marsCtx.createLinearGradient(0,454,0,512);
 southCap.addColorStop(0,"rgba(239,216,190,0)");southCap.addColorStop(1,"rgba(239,216,190,.68)");
 marsCtx.fillStyle=southCap;marsCtx.fillRect(0,454,1024,58);
 const marsTexture=new THREE.CanvasTexture(marsCanvas);
 marsTexture.colorSpace=THREE.SRGBColorSpace;
 marsTexture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
 const marsGroup=new THREE.Group();
 marsGroup.position.set(mobile?2.5:3.4,.55,-8.8);
 marsGroup.scale.setScalar(.001);
 scene.add(marsGroup);
 const marsSphere=new THREE.Mesh(
   new THREE.SphereGeometry(2.05,lowPower?48:72,lowPower?36:56),
   new THREE.MeshStandardMaterial({map:marsTexture,roughness:.98,metalness:0})
 );
 marsGroup.add(marsSphere);
 marsGroup.add(new THREE.Mesh(
   new THREE.SphereGeometry(2.16,48,36),
   new THREE.MeshBasicMaterial({color:0xe87952,transparent:true,opacity:.17,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false})
 ));

 // Build BUSSY as a real low-poly 3D school bus from reusable Three.js meshes.
 // This replaces the flat PNG plane; the original PNG remains untouched in assets.
 const bus=new THREE.Group();
 bus.position.set(mobile?.35:1.7,mobile?-1.48:-1.35,mobile?.85:1.25);
 bus.scale.setScalar(mobile?.62:.94);
 bus.rotation.y=-.34;
 bus.rotation.z=-.035;
 scene.add(bus);

 const mat=(color,roughness=.72,metalness=.02)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const yellow=mat(0xffc928,.58),yellowLight=mat(0xffdc55,.55),yellowDark=mat(0xd99b12,.7);
 const glass=mat(0x17344e,.28,.18),rubber=mat(0x111722,.94),hub=mat(0xb8c6d5,.38,.55);
 const trim=mat(0x202a36,.72),white=mat(0xf5f3e8,.38),red=mat(0xe84b42,.45),blue=mat(0x65c9f2,.32,.12);

 const makeBox=(parent,w,h,d,material,x,y,z,rx=0,ry=0,rz=0)=>{
   const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
   mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);parent.add(mesh);return mesh;
 };
 const bodyShape=new THREE.Shape();
 bodyShape.moveTo(-1.62,-.53);
 bodyShape.lineTo(1.22,-.53);
 bodyShape.quadraticCurveTo(1.63,-.53,1.66,-.16);
 bodyShape.lineTo(1.66,.34);
 bodyShape.quadraticCurveTo(1.66,.66,1.34,.66);
 bodyShape.lineTo(-1.34,.66);
 bodyShape.quadraticCurveTo(-1.66,.66,-1.66,.34);
 bodyShape.lineTo(-1.66,-.53);
 bodyShape.closePath();
 const bodyGeometry=new THREE.ExtrudeGeometry(bodyShape,{depth:1.18,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8});
 bodyGeometry.translate(0,0,-.59);
 const body=new THREE.Mesh(bodyGeometry,yellow);bus.add(body);

 // Roof cap and lower chassis give the silhouette real depth.
 makeBox(bus,2.72,.12,1.22,yellowLight,-.02,.63,0);
 makeBox(bus,2.92,.18,1.12,trim,-.02,-.51,0);
 makeBox(bus,2.95,.12,1.2,yellowDark,-.02,-.36,0);

 // Large side windows, with individual frames and central pillars.
 for(const side of [-1,1]){
   const z=side*.603;
   for(let i=0;i<4;i++){
     const x=-1.08+i*.59;
     makeBox(bus,.49,.39,.035,trim,x,.28,z);
     makeBox(bus,.425,.325,.025,glass,x,.29,z+side*.022);
     makeBox(bus,.035,.34,.035,yellowLight,x-.255,.29,z+side*.025);
     makeBox(bus,.035,.34,.035,yellowLight,x+.255,.29,z+side*.025);
   }
   // Side emergency door and its small window.
   makeBox(bus,.34,.72,.04,yellowDark,1.18,.02,z);
   makeBox(bus,.25,.32,.035,glass,1.18,.28,z+side*.025);
   makeBox(bus,2.7,.095,.035,yellowDark,-.02,-.17,z+side*.025);
   makeBox(bus,2.68,.035,.04,trim,-.02,-.25,z+side*.03);
 }

 // Front windshield, split into two panes; facing the bus's +X direction.
 makeBox(bus,.055,.55,.94,trim,1.57,.27,0,0,0,-.12);
 makeBox(bus,.045,.46,.40,glass,1.612,.29,-.235,0,0,-.12);
 makeBox(bus,.045,.46,.40,glass,1.612,.29,.235,0,0,-.12);

 makeBox(bus,.08,.08,1.02,yellowLight,1.57,.59,0,0,0,-.12);

 // BUSSY's expressive face: glossy eyes seated on the front windshield.
 // The eye geometry is part of the 3D bus, not a 2D decal.
 const eyeWhite=mat(0xfffdf5,.24);
 const iris=mat(0x45a9d8,.22,.08);
 const pupil=mat(0x101a2a,.18);
 const eyeSparkle=new THREE.MeshBasicMaterial({color:0xffffff});
 for(const side of [-1,1]){
   const z=side*.225;
   const eye=new THREE.Mesh(new THREE.SphereGeometry(.145,24,18),eyeWhite);
   eye.scale.set(.72,1,1);
   eye.position.set(1.685,.345,z);
   bus.add(eye);

   const irisBall=new THREE.Mesh(new THREE.SphereGeometry(.083,20,16),iris);
   irisBall.scale.set(.68,1,1);
   irisBall.position.set(1.785,.34,z-side*.025);
   bus.add(irisBall);

   const pupilBall=new THREE.Mesh(new THREE.SphereGeometry(.048,18,14),pupil);
   pupilBall.scale.set(.65,1,1);
   pupilBall.position.set(1.84,.34,z-side*.035);
   bus.add(pupilBall);

   const sparkle=new THREE.Mesh(new THREE.SphereGeometry(.019,12,10),eyeSparkle);
   sparkle.position.set(1.875,.375,z-side*.045);
   bus.add(sparkle);

   // Soft curved brows give the character a friendly, curious expression.
   const browCurve=new THREE.CatmullRomCurve3([
     new THREE.Vector3(1.69,.51,z-side*.13),
     new THREE.Vector3(1.71,.56,z),
     new THREE.Vector3(1.69,.52,z+side*.13)
   ]);
   const brow=new THREE.Mesh(new THREE.TubeGeometry(browCurve,12,.025,8,false),yellowDark);
   bus.add(brow);
 }

 // A curved smile sits on the front panel below the windshield.
 const smileCurve=new THREE.CatmullRomCurve3([
   new THREE.Vector3(1.835,-.155,-.29),
   new THREE.Vector3(1.855,-.205,-.17),
   new THREE.Vector3(1.86,-.225,0),
   new THREE.Vector3(1.855,-.205,.17),
   new THREE.Vector3(1.835,-.155,.29)
 ]);
 const smile=new THREE.Mesh(
   new THREE.TubeGeometry(smileCurve,28,.027,10,false),
   mat(0x54251d,.55)
 );
 bus.add(smile);

 // Tiny warm cheek lights add a little character without cluttering the body.
 for(const side of [-1,1]){
   const cheek=new THREE.Mesh(new THREE.SphereGeometry(.055,14,10),mat(0xff9a68,.65));
   cheek.scale.set(.45,.7,1);
   cheek.position.set(1.72,-.095,side*.38);
   bus.add(cheek);
 }

 // Friendly front bumper, grille and bright headlights.
 makeBox(bus,.22,.17,1.25,trim,1.68,-.39,0);
 makeBox(bus,.045,.22,.42,hub,1.80,-.20,0);
 for(const z of [-.43,.43]){
   const lamp=new THREE.Mesh(new THREE.SphereGeometry(.105,16,12),white);
   lamp.position.set(1.72,-.12,z);bus.add(lamp);
   const lens=new THREE.Mesh(new THREE.SphereGeometry(.055,12,8),blue);
   lens.position.set(1.79,-.12,z);bus.add(lens);
 }
 makeBox(bus,.06,.12,.48,red,-1.68,-.22,0);

 // Four chunky tires, with metallic hubs on both sides.
 for(const x of [-1.03,1.03]){
   for(const side of [-1,1]){
     const tire=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.19,24),rubber);
     tire.rotation.x=Math.PI/2;tire.position.set(x,-.48,side*.62);bus.add(tire);
     const wheelHub=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.205,20),hub);
     wheelHub.rotation.x=Math.PI/2;wheelHub.position.set(x,-.48,side*.62);bus.add(wheelHub);
     const center=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.215,16),trim);
     center.rotation.x=Math.PI/2;center.position.set(x,-.48,side*.62);bus.add(center);
   }
 }
 // Roof lights and a small destination panel add the familiar school-bus details.
 for(const z of [-.43,0,.43]){
   const marker=new THREE.Mesh(new THREE.SphereGeometry(.055,12,8),red);
   marker.position.set(-1.32,.72,z);bus.add(marker);
 }
 makeBox(bus,.52,.15,.035,trim,-.9,.78,.62);
 makeBox(bus,.39,.075,.02,white,-.9,.78,.645);
 const glow=new THREE.PointLight(0x4c9fff,18,12,2);glow.position.set(-1.6,1.8,3.5);scene.add(glow);

 // CHAPTER 11 — a bright, welcoming Earth landscape.
 // The group remains hidden until the globe zoom has reached its close-up.
 const homecoming=new THREE.Group();
 homecoming.scale.setScalar(.001);
 scene.add(homecoming);

 const daytimeSky=new THREE.Mesh(
   new THREE.SphereGeometry(78,32,20),
   new THREE.MeshBasicMaterial({color:0x83c9f4,side:THREE.BackSide})
 );
 homecoming.add(daytimeSky);

 const meadow=new THREE.Mesh(
   new THREE.PlaneGeometry(180,180,1,1),
   new THREE.MeshStandardMaterial({color:0x69a94f,roughness:1})
 );
 meadow.rotation.x=-Math.PI/2;
 meadow.position.set(0,-2.24,-28);
 meadow.receiveShadow=true;
 homecoming.add(meadow);

 const road=new THREE.Mesh(
   new THREE.PlaneGeometry(8.4,115),
   new THREE.MeshStandardMaterial({color:0x454c53,roughness:.96})
 );
 road.rotation.x=-Math.PI/2;
 road.position.set(0,-2.205,-25);
 road.receiveShadow=true;
 homecoming.add(road);

 const vergeMaterials=[mat(0x579443,1),mat(0x78b957,1),mat(0x91c967,1)];
 for(let i=0;i<(mobile?34:58);i++){
   const side=i%2===0?-1:1,z=-4-Math.random()*43,x=side*(5.2+Math.random()*22);
   const patch=new THREE.Mesh(new THREE.SphereGeometry(.35+Math.random()*.8,8,6),vergeMaterials[i%vergeMaterials.length]);
   patch.position.set(x,-2.14+Math.random()*.08,z);
   patch.scale.set(1.2,.12,.7);
   homecoming.add(patch);
 }

 const laneMarkMaterial=new THREE.MeshBasicMaterial({color:0xf6e7a9});
 for(let i=0;i<13;i++){
   const dash=new THREE.Mesh(new THREE.BoxGeometry(.12,.025,2.15),laneMarkMaterial);
   dash.position.set(0,-2.185,8-i*7.3);
   homecoming.add(dash);
 }

 const hillMaterial=[mat(0x78b65d,1),mat(0x68a653,1),mat(0x8bc56b,1)];
 [[-24,-1.65,-48,20,5,8],[0,-1.8,-55,27,6,9],[25,-1.65,-49,22,5,8]].forEach((v,i)=>{
   const hill=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),hillMaterial[i]);
   hill.position.set(v[0],v[1],v[2]);hill.scale.set(v[3],v[4],v[5]);homecoming.add(hill);
 });

 const cloudMaterial=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1});
 for(let i=0;i<(mobile?5:8);i++){
   const cloud=new THREE.Group(),x=(i-(mobile?2:3.5))*9,z=-23-(i%3)*10,y=7+(i%2)*2;
   [[0,0,0,1.6],[1.15,.12,0,1.25],[-1.05,.08,.08,1.15],[.25,.55,0,1.05]].forEach(([cx,cy,cz,r])=>{
     const puff=new THREE.Mesh(new THREE.SphereGeometry(r,12,9),cloudMaterial);
     puff.position.set(cx,cy,cz);puff.scale.y=.68;cloud.add(puff);
   });
   cloud.position.set(x,y,z);homecoming.add(cloud);
 }

 // A few tiny wildflowers add a friendly storybook finish to the grass verge.
 const flowerStem=mat(0x3e7837,1),flowerPetals=[mat(0xffe8a5,1),mat(0xffffff,1),mat(0xffd1dc,1)];
 for(let i=0;i<(mobile?16:28);i++){
   const x=(Math.random()-.5)*28,z=-3-Math.random()*26;
   if(Math.abs(x)<5.2)continue;
   const stem=new THREE.Mesh(new THREE.CylinderGeometry(.018,.024,.24,5),flowerStem);
   stem.position.set(x,-2.02,z);homecoming.add(stem);
   const bloom=new THREE.Mesh(new THREE.SphereGeometry(.075,8,6),flowerPetals[i%flowerPetals.length]);
   bloom.position.set(x,-1.89,z);homecoming.add(bloom);
 }

 // Add a fully modeled school campus behind BUSSY. The front entrance faces
 // the road, so the bus appears to have arrived at its destination.
 const schoolCampus=new THREE.Group();
 schoolCampus.position.set(0,-2.2,-32);
 homecoming.add(schoolCampus);

 const schoolWall=mat(0xf1dfb9,.92),schoolTrim=mat(0xf7f0dc,.8);
 const schoolRoof=mat(0xc65b48,.86),schoolGlass=mat(0x75c9e8,.3,.08);
 const schoolDoor=mat(0x315b72,.65),schoolFrame=mat(0xfff3d6,.8);
 makeBox(schoolCampus,18,5.2,4.6,schoolWall,0,2.6,0);
 makeBox(schoolCampus,18.5,.28,4.9,schoolTrim,0,5.18,0);

 // A simple gabled roof gives the building a recognizable school silhouette.
 const roofShape=new THREE.Shape();
 roofShape.moveTo(-9.35,0);
 roofShape.lineTo(0,2.35);
 roofShape.lineTo(9.35,0);
