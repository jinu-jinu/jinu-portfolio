import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";

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
  currentPath: string;
  nextPath: string | null;
  pageTransitionWait: boolean;
  pageTransitioning: boolean;
  pageTransitionEnd: boolean;

  actions: {
    handleCurrentPath: (v: string) => void;
    handleNextPath: (v: string) => void;
    handlePageTransitionWait: (v: boolean) => void;
    handlePageTransitioning: (v: boolean) => void;
    handlePageTransitionEnd: (v: boolean) => void;
  };
};
export type CardDataType = {
  uid: string;
  title: string;
  projectCode: string;
  year: string;
  technology: string;
  image: string;
};

export type GLTFType = GLTF & {
  nodes: {
    J: Mesh;
  };
};

export type ModelType = {
  J: Mesh;
};
