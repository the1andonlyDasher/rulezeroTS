// @src/store.js
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const loc = atomWithStorage("location", "/")

export const imgs = atom<any>([])

