import { ReactNode } from "react";
import { ViewStyle, TextStyle, DimensionValue } from "react-native";

export interface IButton {
  children: ReactNode;
  isLoading?: boolean;
  onPress?: () => void;
  width?: DimensionValue;
  height?: number;
  backgroundColor?: string;
  loadingText?: string;
  loadingTextColor?: string;
  loadingTextSize?: number;
  borderRadius?: number;
  gradientColors?: string[];
  style?: ViewStyle;
  loadingTextStyle?: TextStyle;
  withPressAnimation?: boolean;
  animationDuration?: number;
  disabled?: boolean;
  showLoadingIndicator?: boolean;
  renderLoadingIndicator?: () => ReactNode;
  loadingTextBackgroundColor?: string;
}
