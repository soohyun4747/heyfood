import { create } from 'zustand';

interface DeviceStore {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
}));
