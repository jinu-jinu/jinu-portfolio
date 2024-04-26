import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";

export type GLTFType = GLTF & {
  nodes: {
    J: Mesh;
  };
};

export type ModelType = {
  J: Mesh;
};

export type DataDisplayType = "grid" | "list";

export type CardDataType = {
  title: string;
  projectCode: string;
  year: string;
  technology: string;
  titleimage: string;
  images: string[];
};

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

export type ProjectDataStore = {
  projectData: CardDataType[];
  currentData: CardDataType | null;
  actions: {
    handleCurrentData: (v: CardDataType) => void;
  };
};
