import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import apiRequest from "@/services/apiRequest";
import { DoctorType } from "@/utils/dataTypes";
import { useSidebar } from "@/context/SidebarContext";

const Search = () => {
  const { location, option } = useLocalSearchParams();
  const router = useRouter();
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorType[]>([]);
  const { user } = useSidebar();
  // location = lab location | option = doctor name or specialty

  useEffect(() => {
    apiRequest.get("/doctor").then((res: any) => {
      const allDoctors: DoctorType[] = res.data;

      let filtered = allDoctors;

      // Filter by lab location
      if (location) {
        filtered = filtered.filter((doctor) =>
          doctor.Labs.some((lab) =>
            lab.location
              .toLowerCase()
              .includes((location as string).toLowerCase())
          )
        );
      }

      // Filter by doctor name or specialty name
      if (option) {
        const search = (option as string).toLowerCase();

        filtered = filtered.filter(
          (doctor) =>
            `${doctor.user.firstName} ${doctor.user.lastName}`
              .toLowerCase()
              .includes(search) ||
            doctor.Specialties.some((s) =>
              s.name.toLowerCase().includes(search)
            )
        );
      }

      setDoctors(allDoctors);
      setFilteredDoctors(filtered);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {(location || option) && (
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}
            >
              {location && `For Doctor Lab: ${location}`}{" "}
              {option && ` | Specification: ${option}`}
            </Text>
          </View>
        )}
        <View style={{ padding: 20 }}>
          {filteredDoctors.length > 1 ? (
            <View>
              {filteredDoctors.map((doctor) => (
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
                      {doctor.user.firstName + " " + doctor.user.lastName}
                    </Text>
                    <Text style={{ color: "#777" }}>
                      {doctor.Specialties.slice(0, 3).map((item, index) => (
                        <Text key={index}>{item.name} </Text>
                      ))}
                    </Text>
                    <Text style={{ color: "#0077b6" }}>{doctor.location}</Text>
                    <Text>{doctor.price}</Text>
                    <Text>{`⭐ ${doctor.ratings}`}</Text>
                  </View>
                  {user?.role == "Patient" && (
                    <TouchableOpacity
                      onPress={() => router.push(`/pages/doctor/${doctor.id}`)}
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
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text>No Doctors Found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
