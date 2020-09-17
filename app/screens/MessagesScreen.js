import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteActions from "../components/lists/ListItemDeleteActions";

const initialMessages = [
  {
    id: 1,
    title: "Greeting from the little bao bao",
    description:
      "Hello how are you doing? Haven't see you for a long time, is everything going on smooth on your side?",
    image: require("../assets/abu.jpeg"),
  },
  {
    id: 2,
    title: "Secret Message",
    description: "I have loved you for a long time, dont you know that?",
    image: require("../assets/lih-bin.jpeg"),
  },
  {
    id: 3,
    title: "Hello! I am missing binbin and AhBoo.",
    description: "Can you let me see my sweet heart in your next vedio call?",
    image: require("../assets/small-white.jpeg"),
  },
];

function MessageScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteActions onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages(initialMessages);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessageScreen;
