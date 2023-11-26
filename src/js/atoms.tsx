import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import * as THREE from "three"

export const loc = atomWithStorage("location", "/")
export const cursor = atomWithStorage("cursor", "default")
export const imgs = atom<any>([])
export const cursorText = atom<any>("more info")
export const totalLoad = atom<any>(false)
export const curObject = atom<any>([undefined])
export const listView = atom<any>(true)
export const atomSort = atom<any>("descending")
export const atomField = atom<any>("date")
export const atomResult = atom<any>(undefined)
export const atomState = atom<any>({
    query: "",
    list: undefined,
})


const manager = new THREE.LoadingManager();



export const loadManager = atom<any>(manager)
