// @src/store.js
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import * as THREE from "three"

export const loc = atomWithStorage("location", "/")
export const cursor = atomWithStorage("cursor", "default")
export const imgs = atom<any>([])
export const totalLoad = atom<any>(false)
export const curObject = atom<any>([undefined])
export const listView = atom<any>(true)
export const atomSort = atom<any>("descending")
export const atomField = atom<any>("date")
export const atomResult = atom<any>(undefined)


const manager = new THREE.LoadingManager();



export const loadManager = atom<any>(manager)
