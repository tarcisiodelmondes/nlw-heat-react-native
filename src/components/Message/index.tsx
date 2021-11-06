import React from "react";

import { Text, View } from "react-native";
import { UserPhoto } from "../UserPhoto";
import { MotiView } from "moti";

import { styles } from "./styles";

export type MessageProps = {
  id: string;
  text: string;
  user: { name: string; avatar_url: string };
};

type DataProps = {
  data?: MessageProps;
};

export function Message({ data }: DataProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>{data?.text}</Text>

      <View style={styles.usernameContainer}>
        <UserPhoto image_uri={data?.user.avatar_url} sizes="SMALL" />
        <Text style={styles.userName}>{data?.user.name}</Text>
      </View>
    </MotiView>
  );
}
