export function placeOrder() {
  return {
    type: "PLACE_ORDER" as const,
  };
}

export function closePosition() {
  return {
    type: "CLOSE_POSITION" as const,
  };
}

export type AccountActionType =
  | ReturnType<typeof placeOrder>
  | ReturnType<typeof closePosition>;
