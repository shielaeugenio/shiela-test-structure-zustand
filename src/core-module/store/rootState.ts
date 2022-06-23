import create, {GetState, SetState} from "zustand";
import { filterSlice, FilterSlice } from "../../filters-module";

export interface RootState {
    filter: FilterSlice;
}
export type AppSetState = SetState<RootState>;
export type AppGetState = GetState<RootState>;

const rootState = (set: AppSetState, get: AppGetState) => ({
    filter: filterSlice(set, get)
});

export const useAppStore = create(rootState);


/***
 * Note:
 * 1. This is not functional. Build is passing however when you run it there is an error saying filterSlice in Line 11 is undefined
 * 2. How do I pass only a subset of AppSetState<RootState> e.g. for filterSlice, I only want to pass the send that will 
 * set/get only the filter slice from the state. Can I use immer???
 * 
 */