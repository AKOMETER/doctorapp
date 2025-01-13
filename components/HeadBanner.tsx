import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";

const specialities = [
  {
    id: 1,
    name: "Dentist",
    icon: "https://img.icons8.com/color/64/tooth.png",
  },
  {
    id: 2,
    name: "Neurologist",
    icon: "https://img.icons8.com/color/64/brain.png",
  },
  {
    id: 3,
    name: "Orthopedic",
    icon: "https://img.icons8.com/color/64/orthopedic.png",
  },
  {
    id: 4,
    name: "Cardiologist",
    icon: "https://img.icons8.com/color/64/heart-health.png",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Zara K",
    speciality: "Dentist",
    location: "Coimbatore, India",
    price: "₹50.00 / per slot",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Waseem Sabra",
    speciality: "Neurologist",
    location: "Cherrybrook, Australia",
    price: "₹2.45 / per slot",
    rating: 4.0,
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

const HomePage = () => {
  const { width } = useWindowDimensions();

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
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            Home
          </Text>

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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Specialities</Text>
            <Text style={{ color: "#0077b6" }}>View All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {specialities.map((item) => (
              <View
                key={item.id}
                style={{
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 64, height: 64, marginBottom: 5 }}
                />
                <Text>{item.name}</Text>
              </View>
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Find Doctors</Text>
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
                <Text style={{ color: "#777" }}>{doctor.speciality}</Text>
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
};

export default HomePage;
