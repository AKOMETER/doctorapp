import { doctors, specialities } from "@/utils/data";
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
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Find Doctors
            </Text>
            <Text style={{ color: "#0077b6" }}>View All</Text>
          </View>
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
  );
}
