import React from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

import LogoSvg from "../../assets/logo.svg";
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "../../hooks/auth";

export function Header() {
  const { singOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.logoutButton}>
        {user && (
          <TouchableOpacity onPress={singOut} activeOpacity={0.75}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        )}

        <UserPhoto image_uri={user?.avatar_url} />
      </View>
    </View>
  );
}
