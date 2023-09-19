// @src/store.js
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import * as THREE from "three"

export const loc = atomWithStorage("location", "/")
export const cursor = atomWithStorage("cursor", "default")
export const imgs = atom<any>([])
export const totalLoad = atom<any>(false)
export const curObject = atom<any>([undefined])



const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onLoad = () => {console.log("finished")}

// manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
// 	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
// };

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

export const loadManager = atom<any>(manager)
