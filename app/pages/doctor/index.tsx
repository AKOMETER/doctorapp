import Sidebar from "@/components/sidebar";
import { doctors, specialities } from "@/utils/data";
import { useRouter } from "expo-router";
import React from "react";
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
  return (
    // <Sidebar title="View All Doctors">
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          {doctors.map((doctor) => (
            <View
              key={doctor.id}
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 10,
                padding: 10,
                elevation: 2,
              }}
            >
              <Image
                source={{ uri: doctor.image }}
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {doctor.name}
                </Text>
                <Text style={{ color: "#777" }}>
                  {specialities[doctor.specialty].name}
                </Text>
                <Text style={{ color: "#0077b6" }}>{doctor.location}</Text>
                <Text>{doctor.price}</Text>
                <Text>{`⭐ ${doctor.rating}`}</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push(`/pages/doctor/${doctor.url}`)}
                style={{
                  backgroundColor: "#00b4d8",
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "white" }}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </Sidebar>
  );
}
