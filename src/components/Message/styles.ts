import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 36,
  },
  message: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginBottom: 12,
    lineHeight: 20,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    marginLeft: 16,
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
  },
});
