import React, { useState } from "react";

import { Keyboard, TextInput, View } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleSendMessage() {
    setSendingMessage(true);

    const messageFormatted = message.trim();

    if (messageFormatted.length === 0) return;

    await api.post("/messages", { message: messageFormatted });

    setSendingMessage(false);
    setMessage("");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />
      <Button
        title="ENVIAR MENSAGEM"
        color={COLORS.WHITE}
        disabled={!message.trim() || sendingMessage}
        isLoading={sendingMessage}
        backgroundColor={COLORS.PINK}
        onPress={handleSendMessage}
      />
    </View>
  );
}
