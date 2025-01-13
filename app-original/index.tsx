import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import HeadBanner from "@/components/HeadBanner";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { parcels_data } from "@/utils/constants";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";

const Home = () => {
  return (
    <ScrollView scrollEventThrottle={16} bounces={false}>
      <HeadBanner />
      <View className="p-5">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-2xl font-medium">Our Best Doctors</Text>
          <TouchableOpacity>
            <FontAwesome name="cogs" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          {parcels_data?.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex flex-row items-center rounded-lg border-b border-gray-200 px-3 py-5"
              onPress={() => router.push(`/parcel-details/${index}`)}
            >
              <Image
                source={{
                  uri: item?.logo,
                }}
                width={50}
                height={50}
                resizeMode="contain"
                resizeMethod="scale"
                className="rounded-md shadow"
              />
              <View className="flex flex-col ml-3">
                <Text className="text-lg font-medium">{item?.doc_name}</Text>
                <Text className="text-sm text-gray-500">
                  {item.from.split(",")[0]} -  {item.years_experience} Years experince
                </Text>
              </View>
              <View className="ml-auto flex flex-row items-center gap-x-2">
                <Octicons
                  name="dot-fill"
                  size={20}
                  color={item?.status === "Available" ? "green" : "#ff54548c"}
                />
                <Text className="font-medium">{item?.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
