import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { specialities } from "@/utils/data";
import { router } from "expo-router";

export default function Overview({ doctor, id }: { doctor: any; id: number }) {
  return (
    <View style={styles.container}>
      {/* First Section */}
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.avatarContainer}>
          <MaterialIcons name="person" size={40} color="#fff" />
        </TouchableOpacity>
        <View
          key={doctor.id}
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            marginRight: 5,
            width: "100%",
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
            <Text style={{ color: "#777" }}>{specialities[id].name}</Text>
            <Text style={{ color: "#0077b6" }}>{doctor.location}</Text>
            <Text>{doctor.price}</Text>
            <Text>{`⭐ ${doctor.rating}`}</Text>
          </View>
        </View>
      </View>

      {/* Dotted Line */}
      <View style={styles.dottedLineContainer}>
        <View style={styles.dottedLine}></View>
      </View>

      {/* Second Section */}
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.avatarContainer}>
          <MaterialIcons name="book" size={40} color="#fff" />
        </TouchableOpacity>
        <View
          key={doctor.id}
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            marginRight: 5,
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 400, marginBottom: 10 }}>
            Education
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="check" size={30} color="#00000" />
            <Text style={{ marginLeft: 10 }}>{doctor.education.school}</Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            <Text>{doctor.education.location}</Text>
            <Text>{doctor.education.year}</Text>
          </View>
        </View>
      </View>

      {/* Dotted Line */}
      <View style={styles.dottedLineContainer}>
        <View style={styles.dottedLine}></View>
      </View>

      {/* Third Section */}
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.avatarContainer}>
          <MaterialIcons name="engineering" size={40} color="#fff" />
        </TouchableOpacity>
        <View
          key={doctor.id}
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            marginRight: 5,
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 400, marginBottom: 10 }}>
            Services
          </Text>

          <View style={{ marginLeft: 40 }}>
            {doctor.service.map((item: string, index: number) => {
              return (
                <Text style={{ margin: 2 }} key={index}>
                  {item}
                </Text>
              );
            })}
          </View>
        </View>
      </View>

      {/* Dotted Line */}
      <View style={styles.dottedLineContainer}>
        <View style={styles.dottedLine}></View>
      </View>

      {/* Fourth Section */}
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.avatarContainer}>
          <MaterialIcons name="book" size={40} color="#fff" />
        </TouchableOpacity>
        <View
          key={doctor.id}
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            marginRight: 5,
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 400, marginBottom: 10 }}>
            Work And Experience
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="check" size={30} color="#00000" />
            <Text style={{ marginLeft: 10 }}>{doctor.experience.name}</Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            <Text>{doctor.experience.location}</Text>
            <Text>{doctor.experience.year}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => router.push(`/pages/appointments?id=${id}`)}
      >
        <Button
          onPress={() => router.push(`/pages/appointments?id=${id}`)}
          title="Book Appointment"
          color="#0000"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00b4d8",
    padding: 15,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  dottedLineContainer: {
    marginLeft: 30,
  },
  dottedLine: {
    width: 1,
    height: 50,
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: "#aaa",
    transform: [{ rotate: "0deg" }],
  },
});
