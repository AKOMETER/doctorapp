import { specialities } from "@/utils/data";
import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";

export default function Specialities() {
  return (
    <SafeAreaView>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {specialities.map((item) => (
            <View
              key={item.id}
              style={{
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <Image
                source={{ uri: item.icon }}
                style={{ width: 64, height: 64, marginBottom: 5 }}
              />
              <Text>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
