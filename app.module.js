import * as THREE from './node_modules/three/build/three.module.js';
import {Infospot} from './infospot.module.js';

 function AppInit(){
     
    let camera, scene, renderer,object,object2;

			let isUserInteracting = false,
				onPointerDownMouseX = 0, onPointerDownMouseY = 0,
				lon = 0, onPointerDownLon = 0,
				lat = 0, onPointerDownLat = 0,
				phi = 0, theta = 0;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );
				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
				scene = new THREE.Scene();
				const geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );
				const texture = new THREE.TextureLoader().load( './assets/images/slide-2.jpg' );
				const material = new THREE.MeshBasicMaterial( { map: texture } );
				const mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );
			   
				 let infospot = [Infospot(30,'./assets/icon/info.png','infospot',[300, 30, 200]),
				                 Infospot(30,'./assets/icon/info.png','infospot',[200, 200, 100]),
				                 Infospot(30,'./assets/icon/info.png','infospot',[300, 30, 300]),
				                Infospot(30,'./assets/icon/info.png','infospot',[200, 300, 100]),
								 Infospot(30,'./assets/icon/info.png','infospot',[100, 30, 200])];
								 
				infospot.forEach(function(data,i){
					scene.add( data );
				 })
				
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				container.style.touchAction = 'none';
				container.addEventListener( 'pointerdown', onPointerDown, false );
				document.addEventListener( 'wheel', onDocumentMouseWheel, false );

				document.addEventListener( 'dragover', function ( event ) {
					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';

				}, false );

				document.addEventListener( 'dragenter', function () {

					document.body.style.opacity = 0.5;

				}, false );

				document.addEventListener( 'dragleave', function () {

					document.body.style.opacity = 1;

				}, false );

				document.addEventListener( 'drop', function ( event ) {

					event.preventDefault();

					const reader = new FileReader();
					reader.addEventListener( 'load', function ( event ) {
						material.map.image.src = event.target.result;
						material.map.needsUpdate = true;
					}, false );
					reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
					document.body.style.opacity = 1;
				}, false );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onPointerDown( event ) {
				if ( event.isPrimary === false ) return;

				isUserInteracting = true;

				onPointerDownMouseX = event.clientX;
				onPointerDownMouseY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

				document.addEventListener( 'pointermove', onPointerMove, false );
				document.addEventListener( 'pointerup', onPointerUp, false );

			}

			function onPointerMove( event ) {

				if ( event.isPrimary === false ) return;

				lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon;
				lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat;

			}

			function onPointerUp() {

				if ( event.isPrimary === false ) return;

				isUserInteracting = false;

				document.removeEventListener( 'pointermove', onPointerMove );
				document.removeEventListener( 'pointerup', onPointerUp );

			}

			function onDocumentMouseWheel( event ) {

				const fov = camera.fov + event.deltaY * 0.05;

				camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );

				camera.updateProjectionMatrix();

			}

			function animate() {

				requestAnimationFrame( animate );
				update();
				renderer.render( scene, camera );


			}


		
			function update() {
				if ( isUserInteracting === false ) {
					lon += 0.1;
				}

				lon += 0.1;
				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.MathUtils.degToRad( 90 - lat );
				theta = THREE.MathUtils.degToRad( lon );

				const x = 500 * Math.sin( phi ) * Math.cos( theta );
				const y = 500 * Math.cos( phi );
				const z = 500 * Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( x, y, z );

				
			}

}

export{AppInit};