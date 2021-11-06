import { StyleSheet } from "react-native";
import { FONTS } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  icon: { marginRight: 12 },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
    textTransform: "uppercase",
  },
});
