import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import Sidebar from "@/components/sidebar";
import apiRequest from "@/services/apiRequest";
import { DoctorType } from "@/utils/dataTypes";
import { useSidebar } from "@/context/SidebarContext";

export default function DoctorPage() {
  const { id }: { id: string } = useLocalSearchParams();
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const { user } = useSidebar();
  useEffect(() => {
    apiRequest.get(`/specialty/${id}`).then((res) => {
      setDoctors(res?.data);
    });
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Search By Doctor", // New title
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  return (
    // <Sidebar title={`Searched By ${specialities[parseInt(id)].name}`}>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          {doctors.map((doctor) => (
            <View key={doctor.id} style={styles.card}>
              <Image
                source={{ uri: doctor.image }}
                style={styles.doctorImage}
              />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>
                  {doctor.user.firstName + " " + doctor.user.lastName}
                </Text>
                <Text style={styles.specialityName}>
                  {doctor.specialtyName}
                </Text>
                <Text style={styles.doctorLocation}>{doctor.location}</Text>
                <Text style={styles.doctorPrice}>{doctor.price}</Text>
                <Text
                  style={styles.doctorRating}
                >{`⭐ ${doctor.ratings}`}</Text>
              </View>
              {user?.role && (
                <TouchableOpacity style={styles.bookButton}>
                  <Text
                    onPress={() => router.push(`/pages/doctor/${doctor.id}`)}
                    style={styles.bookButtonText}
                  >
                    Book Appointment
                  </Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
  },
  wrapper: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  doctorDetails: {
    marginLeft: 10,
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  specialityName: {
    color: "#777",
  },
  doctorLocation: {
    color: "#0077b6",
  },
  doctorPrice: {
    fontSize: 14,
    color: "#444",
  },
  doctorRating: {
    fontSize: 14,
    color: "#444",
  },
  bookButton: {
    backgroundColor: "#00b4d8",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
