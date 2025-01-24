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
import { specialities } from "@/utils/data";
import { doctors } from "@/utils/data";
import { router } from "expo-router";

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <ScrollView>
        {/* Header */}

        <View
          style={{
            backgroundColor: "#0077b6",
            padding: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          {/* Search Inputs */}
          <View
            style={{
              marginTop: 20,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              elevation: 2,
            }}
          >
            <TextInput
              placeholder="Search City (Ex: Chennai, etc)"
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 8,
                padding: 10,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Search Doctor name, Speciality"
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 8,
                padding: 10,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#00b4d8",
                borderRadius: 8,
                padding: 15,
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Search Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Specialities */}
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Specialties
            </Text>
            <Text
              style={{ color: "#0077b6" }}
              onPress={() => router.push("/pages/specialities/index")}
            >
              View All
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {specialities.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: "center",
                  marginRight: 20,
                }}
                onPress={() => router.push(item.url)}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 64, height: 64, marginBottom: 5 }}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Doctors */}
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
            <Text
              style={{ color: "#0077b6" }}
              onPress={() => router.push("/pages/doctor/index")}
            >
              View All
            </Text>
          </View>
          {doctors.slice(0, 10).map((doctor, index) => (
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
                <Text
                  style={{ color: "white" }}
                  onPress={() => router.push(doctor.url)}
                >
                  Book Appointment
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
