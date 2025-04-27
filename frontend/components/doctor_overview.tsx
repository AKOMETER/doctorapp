import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { specialities } from "@/utils/data";
import { router } from "expo-router";
import { DoctorType } from "../utils/dataTypes";
import { useSidebar } from "@/context/SidebarContext";
export default function Overview({
  doctor,
}: {
  doctor: DoctorType | undefined;
}) {
  if (!doctor) {
    return;
  }
  const { user } = useSidebar();

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* First Section */}
        <View className="flex-row items-center gap-5 p-5">
          <TouchableOpacity className="w-16 h-16 rounded-full bg-green-500 justify-center items-center border-2 border-gray-300 shadow-md">
            <MaterialIcons name="person" size={40} color="#fff" />
          </TouchableOpacity>
          <View className="flex-row bg-white rounded-lg p-4 shadow-md flex-1">
            <Image
              source={{ uri: doctor?.image }}
              className="w-20 h-20 rounded-lg"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold">
                {doctor.user?.firstName + " " + doctor.user?.lastName}
              </Text>
              {doctor.Specialties.map((specialty) => {
                return <Text className="text-gray-600">{specialty.name}</Text>;
              })}
              <Text className="text-blue-600">{doctor.location}</Text>
              <Text className="text-green-500 font-bold">${doctor.price}</Text>
              <Text>{`⭐ ${doctor.ratings}`}</Text>
            </View>
          </View>
        </View>

        {/* Section Divider */}
        <View className="ml-10 border-l-2 border-dotted border-gray-300 h-12" />

        {/* Information Sections */}
        {[
          {
            title: "Education",
            icon: "school",
            data: JSON.parse(String(doctor.education)),
            isArray: false,
          },
          {
            title: "Work Experience",
            icon: "work",
            data: JSON.parse(String(doctor.experience)),
            isArray: false,
          },
          {
            title: "Services",
            icon: "engineering",
            data: JSON.parse(String(doctor.service)),
            isArray: true,
          },
        ].map((section, index) => (
          <View key={index} className="flex-row items-center gap-5 mt-5 px-5">
            <TouchableOpacity className="w-16 h-16 rounded-full bg-blue-500 justify-center items-center border-2 border-gray-300 shadow-md">
              <MaterialIcons
                name={section.icon as any}
                size={40}
                color="#fff"
              />
            </TouchableOpacity>
            <View className="bg-white rounded-lg p-4 shadow-md flex-1">
              <Text className="text-xl font-semibold mb-2">
                {section.title}
              </Text>
              {Array.isArray(section.data) ? (
                <View className="ml-4">
                  {section.data.map((item, i) => (
                    <Text key={i} className="my-1 text-gray-700">
                      {item}
                    </Text>
                  ))}
                </View>
              ) : (
                <View className="ml-4">
                  {section.isArray ? (
                    <></>
                  ) : (
                    <View>
                      <Text>{section.data.name || section.data.school}</Text>
                      <Text className="text-gray-500">
                        {section.data.location}
                      </Text>
                      <Text className="text-gray-500">{section.data.year}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Book Appointment Button */}
      {user?.role == "Patient" && (
        <TouchableOpacity
          className="absolute bottom-0 left-0 right-0 bg-cyan-500 p-4 items-center shadow-lg"
          onPress={() => router.push(`/pages/appointments?id=${doctor.id}`)}
        >
          <Text className="text-white text-lg font-semibold">
            Book Appointment
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
