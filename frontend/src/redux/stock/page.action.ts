import { PageStateType } from "./page.state";

export function changePage(pageState: PageStateType) {
  return {
    type: "CHANGE_PAGE" as const,
    pageState,
  };
}

export type PageActionType = ReturnType<typeof changePage>;
