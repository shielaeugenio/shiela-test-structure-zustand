import create, { SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IFiltersState } from "../models/filter";

const initialState: IFiltersState = {
  filters: [],
};

export const filtersClientState = (set: SetState<IFiltersState>) => ({
  ...initialState,
  onApplyFilters: (newFilters: any) => {
    set((state) => {
      return {
        ...state,
        filters: newFilters,
      };
    });
  },
});

export const useFiltersClientStore = create(
  devtools(filtersClientState, { name: "filters" })
);
