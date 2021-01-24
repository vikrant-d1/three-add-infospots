import * as THREE from './node_modules/three/build/three.module.js';

const Infospot = function(scale,url,type,position){
    let infospot,info,sprite;
  switch(type){
      case 'infospot':
      infospot = new THREE.TextureLoader().load(url);
      info = new THREE.SpriteMaterial( { map: infospot } );
      sprite = new THREE.Sprite( info );
      sprite.position.set( parseInt(position[0]),parseInt(position[1]),parseInt(position[2]));
      sprite.scale.set(scale,scale,1);
      return sprite;
      break;
      case 'linkage':
      break;
      case 'video':
      break;
      default:
      console.log('Not provided valid type');
  }
}

export{
    Infospot
}