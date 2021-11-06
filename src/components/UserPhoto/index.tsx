import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

type UserPhotoProps = {
  image_uri: string | undefined;
  sizes?: "SMALL" | "NORMAL";
};

const SIZES = {
  SMALL: { containerSize: 32, avatarSize: 28 },
  NORMAL: { containerSize: 48, avatarSize: 42 },
};

import avatarImg from "../../assets/avatar.png";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme";

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({ image_uri, sizes = "NORMAL" }: UserPhotoProps) {
  const { avatarSize, containerSize } = SIZES[sizes];

  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        },
      ]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
    >
      <Image
        source={{ uri: image_uri || AVATAR_DEFAULT }}
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
      />
    </LinearGradient>
  );
}
