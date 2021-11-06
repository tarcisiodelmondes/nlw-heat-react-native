import React from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  ActivityIndicator,
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>["name"];
  isLoading?: boolean;
};

export function Button({
  title,
  backgroundColor,
  color,
  icon,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      {...rest}
      activeOpacity={0.75}
    >
      {!isLoading ? (
        <>
          <AntDesign size={24} name={icon} style={styles.icon} />
          <Text style={[styles.title, { color }]}>{title}</Text>
        </>
      ) : (
        <ActivityIndicator color={color} />
      )}
    </TouchableOpacity>
  );
}
