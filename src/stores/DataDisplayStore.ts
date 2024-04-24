import { dataDisplayStoreType } from "@/types";
import { create } from "zustand";

const dataDisplayStore = create<dataDisplayStoreType>((set) => ({
  dataDisplay: "grid",
  actions: {
    handleDataDisplay: (v) => set(() => ({ dataDisplay: v })),
  },
}));

const useDataDisplay = () => dataDisplayStore((state) => state.dataDisplay);
const useDataDisplayActions = (name: keyof dataDisplayStoreType["actions"]) =>
  dataDisplayStore((state) => state.actions[name]);

export { useDataDisplay, useDataDisplayActions };
