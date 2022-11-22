export function changeColorTheme(isDark: boolean) {
  return {
    type: "SWITCH_COLOR_THEME" as const,
    isDark,
  };
}

export function changeLanguage(isChinese: boolean) {
  return {
    type: "SWITCH_LANGUAGE" as const,
    isChinese,
  };
}

export type ThemeActionType =
  | ReturnType<typeof changeColorTheme>
  | ReturnType<typeof changeLanguage>;
