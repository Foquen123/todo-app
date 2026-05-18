import { create } from 'zustand';

interface ILayoutState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export const useLayoutStore = create<ILayoutState>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (value: boolean) => {
    set({ isSidebarOpen: value });
  },
}));
