import create, { GetState, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ApplicationsState {
  pageSize: number;
  selectedPage: number;
}

const initialState: ApplicationsState = {
  pageSize: 5,
  selectedPage: 1,
};

interface ApplicationsStore extends ApplicationsState {
  onPageChanged: (newPage: number) => void;
}

type ApplicationsSetState = SetState<ApplicationsState>;
type ApplicationsGetState = GetState<ApplicationsStore>;

export const applicationsClientState = (
  set: ApplicationsSetState,
  get: ApplicationsGetState
) => ({
  ...initialState,
  onPageChanged: (newPage: number) => {
    set((state) => {
      return {
        ...state,
        selectedPage: newPage,
      };
    });
  },
});

export const useApplicationsClientStore = create(
  devtools(applicationsClientState, { name: "applications" })
);
