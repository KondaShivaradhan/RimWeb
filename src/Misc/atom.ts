import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { UserRecord } from "./interfaces";


export const statusAtom = atom({
    status: '',
});
export const recordsAtom = atom<UserRecord[]>([])
export const Appversion = atom("1.2.3");
export const tagsAtom = atom([] as string[]);

  
