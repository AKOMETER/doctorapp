import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { parcels_data } from "@/utils/constants";
import Octicons from "@expo/vector-icons/Octicons";

const ParcelDetails = () => {
  const { _id } = useLocalSearchParams();

  const parcel = parcels_data[Number(_id)];

  return (
    <ScrollView scrollEventThrottle={16} bounces={false}>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View className="px-5 flex flex-col gap-y-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View className="flex flex-row items-center gap-x-5">
            <FontAwesome6 name="people-carry-box" size={30} color="black" />
            <Text className="text-3xl font-medium">Doctor ID {parcel.id}</Text>
          </View>

          <View className="bg-[#5151ff] rounded-xl w-full p-5">
            <View className="flex flex-row items-center w-full">
              <View className="min-w-[40%]">
                <Text className="text-white">Location</Text>
                <Text className="text-white text-lg font-medium">
                  {parcel.from.split(",")[0]}
                </Text>
              </View>
              <View className="min-w-[20%] flex flex-col justify-center items-center">
                <FontAwesome6 name="truck-ramp-box" size={24} color="white" />
                <Text className="text-white font-bold text-lg">
                  {parcel.Patients}
                </Text>
              </View>
              <View className="min-w-[40%]">
                <Text className="text-white text-right">Years Experience</Text>
                <Text className="text-white text-right text-lg font-medium">
                  {parcel.years_experience} Yrs
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center w-full mt-14">
              <View className="w-1/3">
                <Text className="text-white font-medium">Type</Text>
                <Text className="text-white font-bold text-xl">
                  {parcel.employment_period} 
                </Text>
              </View>
              <View className="w-1/3">
                <Text className="text-white font-medium text-center">
                Designation
                </Text>
                <Text className="text-white font-bold text-xl text-center">
                  {parcel.Designation}
                </Text>
              </View>
              <View className="w-1/3">
                <Text className="text-white font-medium text-right">
                  Status
                </Text>
                <Text className="text-white font-bold text-xl text-right">
                  {parcel.status}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text className="text-3xl font-semibold">About Doctor</Text>
            <View className="flex flex-col mt-5">
              {parcel.aboutdoctor.reverse().map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row gap-x-3 border-l-2 border-slate-300 ml-2 pb-5"
                >
                  <View className="-ml-2">
                    <Octicons
                      name="dot-fill"
                      size={25}
                      color={index == 0 ? "green" : "#a9cfff"}
                    />
                  </View>
                  <View>
                    <Text className="text-xl font-semibold">
                      {/* {item.info} */}
                    </Text>
                    <View className="flex flex-row items-center justify-start gap-x-3">
                      <Text className="text-lg font-medium">
                       {/* {item.experience} */}
                      </Text>
                      {/* <Octicons name="dot-fill" size={10} color="black" /> */}
                      <Text className="text-lg font-medium">
                        
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ParcelDetails;
