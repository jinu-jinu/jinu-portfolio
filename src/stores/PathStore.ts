import { PathStoreType } from "@/types";
import { create } from "zustand";

/*
  경로 변경과 관련된 상태를 관리하는 스토어

  경로 변경 === 페이지 변경, 페이지가 변경된다는 것은 페이지 트랜지션 애니메이션이 실행됌
  경로와 페이지 트랜지션에 관련된 상태를 함께 묶는게 좋다
*/
const pathStore = create<PathStoreType>((set) => ({
  prevPath: null,
  currentPath: "/",
  nextPath: null,
  pageTransitionWait: true,
  pageTransitioning: false,
  pageTransitionEnd: false,
  actions: {
    handlePrevPath: (v) => set(() => ({ prevPath: v })),
    handleCurrentPath: (v) => set(() => ({ currentPath: v })),
    handleNextPath: (v) => set(() => ({ nextPath: v })),
    handlePageTransitionWait: (v) => set(() => ({ pageTransitionWait: v })),
    handlePageTransitioning: (v) => set(() => ({ pageTransitioning: v })),
    handlePageTransitionEnd: (v) => set(() => ({ pageTransitionEnd: v })),
  },
}));

const usePrevPath = () => pathStore((state) => state.prevPath);
const useCurrentPath = () => pathStore((state) => state.currentPath);
const useNextPath = () => pathStore((state) => state.nextPath);
const usePageTransitionWait = () => pathStore((state) => state.pageTransitionWait);
const usePageTransitioning = () => pathStore((state) => state.pageTransitioning);
const usePageTransitionEnd = () => pathStore((state) => state.pageTransitionEnd);

const usePathActions = (name: keyof PathStoreType["actions"]) =>
  pathStore((state) => state.actions[name]);

export {
  usePrevPath,
  useCurrentPath,
  useNextPath,
  usePageTransitionWait,
  usePageTransitioning,
  usePageTransitionEnd,
  usePathActions,
};
