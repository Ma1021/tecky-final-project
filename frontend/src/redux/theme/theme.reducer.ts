import { initThemeState, ThemeStateType } from "./theme.state";
import { ThemeActionType } from "./theme.action";

export function themeReducer(
  oldState: ThemeStateType = initThemeState,
  action: ThemeActionType
) {
  switch (action.type) {
    case "SWITCH_COLOR_THEME":
      return {
        ...oldState,
        isDark: !action.isDark,
      };
    case "SWITCH_LANGUAGE":
      return {
        ...oldState,
        isChinese: !action.isChinese,
      };
    default:
      return oldState;
  }
}
