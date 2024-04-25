import { ProjectData } from "@/data";
import { ProjectDataStore } from "@/types";
import { create } from "zustand";

const projectDataStore = create<ProjectDataStore>((set) => ({
  projectData: ProjectData,
  currentData: null,
  actions: {
    handleCurrentData: (v) => set(() => ({ currentData: v })),
  },
}));

const useProjectData = () => projectDataStore((state) => state.projectData);
const useCurrentData = () => projectDataStore((state) => state.currentData);

const useProjectDataActions = (name: keyof ProjectDataStore["actions"]) =>
  projectDataStore((state) => state.actions[name]);

export { useProjectData, useCurrentData, useProjectDataActions };
