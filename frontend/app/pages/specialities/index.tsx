import Sidebar from "@/components/sidebar";
import { specialities } from "@/utils/data";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function Specialities() {
  const router = useRouter();
  return (
    // <Sidebar title="All Specialist">
    <SafeAreaView className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-wrap flex-row justify-center gap-4">
          {specialities.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="items-center mr-2"
              onPress={() => router.push(`/pages/specialities/${item.id}`)}
            >
              <View key={item.id} className="items-center w-24 mb-4">
                <Image source={item.icon} className="w-16 h-16 mb-2" />
                <Text className="text-center text-sm font-medium">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </Sidebar>
  );
}
