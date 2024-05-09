import { ProjectDataStore } from "@/types";
import { create } from "zustand";

const projectDataStore = create<ProjectDataStore>((set) => ({
  projectData: null,
  currentData: null,
  actions: {
    handleProjectData: (v) => set(() => ({ projectData: v })),
    handleCurrentData: (v) =>
      set((d) => {
        const projectData = d.projectData;
        const res = projectData?.find((data) => data.project_code === v);
        return { currentData: res };
      }),
  },
}));

const useProjectData = () => projectDataStore((state) => state.projectData);
const useCurrentData = () => projectDataStore((state) => state.currentData);

const useProjectDataActions = (name: keyof ProjectDataStore["actions"]) =>
  projectDataStore((state) => state.actions[name]);

export { useProjectData, useCurrentData, useProjectDataActions };
