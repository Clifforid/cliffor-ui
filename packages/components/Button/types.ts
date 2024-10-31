import type { Ref, Component } from "vue";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type NativeType = "button" | "reset" | "submit";
export type ButtonSize = "large" | "default" | "small";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  loadingIcon?: string;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
}

export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonEmits {
  (e: "click", value: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}
