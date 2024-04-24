import { LoadingStoreType } from "@/types";
import { create } from "zustand";

const loadingStore = create<LoadingStoreType>((set) => ({
  isAssetDownloaded: false,
  isLoading: true,
  actions: {
    handleLoading: (v) => set(() => ({ isLoading: v })),
    handleAssetDownload: (v) => set(() => ({ isAssetDownloaded: v })),
  },
}));

const useIsLoading = () => loadingStore((state) => state.isLoading);
const useIsAssetDownloaded = () => loadingStore((state) => state.isAssetDownloaded);
const useLoadingActions = (name: keyof LoadingStoreType["actions"]) =>
  loadingStore((state) => state.actions[name]);

export { useIsLoading, useIsAssetDownloaded, useLoadingActions };
