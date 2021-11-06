import React, { useEffect, useState } from "react";

import { ScrollView } from "react-native";
import { api } from "../../services/api";
import { Message } from "../Message";

import { styles } from "./styles";

import io from "socket.io-client";

type MessagesProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const socket = io(String(api.defaults.baseURL));

let messagesQueue: MessagesProps[] = [];

socket.on("new_message", (message) => {
  messagesQueue.push(message);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessagesProps[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);

        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await api.get<MessagesProps[]>("/messages/last3");

      setCurrentMessages(data);
    };

    loadMessages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message, index) => (
        <Message key={index} data={message} />
      ))}
    </ScrollView>
  );
}
