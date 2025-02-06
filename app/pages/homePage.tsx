import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { specialities, doctors } from "@/utils/data";
import { router } from "expo-router";

const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-700 p-5 rounded-b-2xl">
          {/* Search Inputs */}
          <View className="mt-5 bg-white rounded-lg p-4 shadow-md">
            <TextInput
              placeholder="Search City (Ex: Chennai, etc)"
              className="bg-gray-200 rounded-md p-3 mb-3"
            />
            <TextInput
              placeholder="Search Doctor name, Speciality"
              className="bg-gray-200 rounded-md p-3"
            />
            <TouchableOpacity className="bg-cyan-500 rounded-md p-4 mt-3">
              <Text className="text-center text-white font-semibold">
                Search Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Specialities */}
        <View className="p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-bold">Specialties</Text>
            <Text
              className="text-blue-700"
              onPress={() => router.push("/pages/specialities")}
            >
              View All
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {specialities.slice(0, 5).map((item, index) => (
              <TouchableOpacity
                key={index}
                className="items-center mr-5"
                onPress={() => router.push(`/pages/specialities/${item.url}`)}
              >
                <Image source={item.icon} className="w-16 h-16 mb-2" />
                <Text className="text-center text-sm">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Doctors */}
        <View className="p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-bold">Find Doctors</Text>
            <Text
              className="text-blue-700"
              onPress={() => router.push("/pages/doctor")}
            >
              View All
            </Text>
          </View>

          {doctors.slice(0, 5).map((doctor) => (
            <View
              key={doctor.id}
              className="flex-row bg-white rounded-lg mb-4 p-4 shadow-md"
            >
              <Image
                source={{ uri: doctor.image }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="ml-4 flex-1">
                <Text className="text-base font-bold">{doctor.name}</Text>
                <Text className="text-gray-500">{doctor.specialty}</Text>
                <Text className="text-blue-700">{doctor.location}</Text>
                <Text className="text-gray-700">{doctor.price}</Text>
                <Text className="text-yellow-500">{`⭐ ${doctor.rating}`}</Text>
              </View>
              <TouchableOpacity
                className="bg-cyan-500 rounded-md px-4 py-2 self-center"
                onPress={() => router.push(`/pages/doctor/${doctor.url}`)}
              >
                <Text className="text-white">Book Appointment</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
