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


export const loadManager = atom<any>(manager)
