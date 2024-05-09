import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";

export type ModelType = {
  J: Mesh;
};

export type GLTFType = GLTF & {
  nodes: ModelType;
};

export type DataDisplayType = "grid" | "list";

export type dataDisplayElement = EventTarget & {
  dataset: {
    display: DataDisplayType;
  };
};

export type dataDisplayStoreType = {
  dataDisplay: DataDisplayType;
  actions: {
    handleDataDisplay: (v: DataDisplayType) => void;
  };
};

export type themeStoreType = {
  theme: "dark" | "light";
  actions: {
    handleTheme: (v: "dark" | "light") => void;
  };
};

export type LoadingStoreType = {
  isAssetDownloaded: boolean;
  isLoading: boolean;
  actions: {
    handleLoading: (v: boolean) => void;
    handleAssetDownload: (v: boolean) => void;
  };
};

export type PathStoreType = {
  prevPath: string | null;
  currentPath: string;
  nextPath: string | null;
  pageTransitionWait: boolean;
  pageTransitioning: boolean;
  pageTransitionEnd: boolean;

  actions: {
    handlePrevPath: (v: string) => void;
    handleCurrentPath: (v: string) => void;
    handleNextPath: (v: string) => void;
    handlePageTransitionWait: (v: boolean) => void;
    handlePageTransitioning: (v: boolean) => void;
    handlePageTransitionEnd: (v: boolean) => void;
  };
};

export type ProjectDataType = {
  description: string;
  id: string;
  name: string;
  project_code: string;
  project_images: { url: string }[];
  project_main_image: { url: string }[];
  technologies: string;
  year: number;
  idx: number;
  link: string;
};

export type ProjectDataStore = {
  projectData: ProjectDataType[] | null;
  currentData: ProjectDataType | null;
  actions: {
    handleProjectData: (v: ProjectDataType[]) => void;
    handleCurrentData: (v: string) => void;
  };
};

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: ProjectDataType;
      };
    };
  };
};
