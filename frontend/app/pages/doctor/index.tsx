import Sidebar from "@/components/sidebar";
import { useSidebar } from "@/context/SidebarContext";
import apiRequest from "@/services/apiRequest";
import { DoctorType } from "@/utils/dataTypes";

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function Doctor() {
  const router = useRouter();
  const { user } = useSidebar();
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  useEffect(() => {
    apiRequest.get("/doctor").then((res: any) => {
      if (res) setDoctors(res.data.data);
    });
  }, []);
  return (
    // <Sidebar title="View All Doctors">
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          {doctors.map((doctor) => (
            <View
              key={doctor.id}
              className="flex-row bg-white rounded-lg mb-4 p-4 shadow-md"
            >
              <Image
                source={{
                  uri: doctor.image,
                }}
                style={{ width: 100, height: 100 }}
              />
              <View className="ml-4 flex-1">
                <Text className="text-base font-bold">
                  {doctor?.user?.firstName + " " + doctor?.user?.lastName}
                </Text>
                <Text className="text-gray-500">
                  {doctor.Specialties.slice(0, 3).map((item) => {
                    return <Text key={item?.id}>{item?.name} </Text>;
                  })}
                </Text>
                <Text className="text-blue-700">{doctor.location}</Text>
                <Text className="text-gray-700">${doctor.price}</Text>
                <Text className="text-yellow-500">{`⭐ ${doctor.ratings}`}</Text>
              </View>
              {user?.role == "Patient" && (
                <TouchableOpacity
                  className="bg-cyan-500 rounded-md px-4 py-2 self-center"
                  onPress={() => router.push(`/pages/doctor/${doctor.id}`)}
                >
                  <Text className="text-white">Book Appointment</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </Sidebar>
  );
}
