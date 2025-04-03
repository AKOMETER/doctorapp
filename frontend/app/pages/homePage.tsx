import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import apiRequest from "@/services/apiRequest";
import {
  DoctorType,
  LabType,
  ProductType,
  SpecialtyType,
} from "@/utils/dataTypes";
import { getSpecialtyImage } from "@/utils/helperFunction";
import { useSidebar } from "@/context/SidebarContext";

const HomePage = () => {
  const [name, setName] = useState("");
  const { user } = useSidebar();
  const [specialty, setSpecialty] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [labs, setLabs] = useState([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    apiRequest.get("/specialty").then((res: any) => {
      if (res) setSpecialty(res.data.data);
    });

    apiRequest.get("/doctor").then((res: any) => {
      if (res) setDoctors(res.data.data);
    });

    apiRequest.get("/lab").then((res: any) => {
      if (res) setLabs(res.data.data);
    });

    apiRequest.get("/product").then((res: any) => {
      if (res) setProducts(res.data);
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-700 p-5 rounded-b-2xl">
          {/* Search Inputs */}
          <View className="mt-5 bg-white rounded-lg p-4 shadow-md">
            <TextInput
              placeholder="Search By Doctor name"
              className="bg-gray-200 rounded-md p-3"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/pages/search",
                  params: {
                    name: name,
                  },
                });
              }}
              className="bg-cyan-500 rounded-md p-4 mt-3"
            >
              <Text className="text-center text-white font-semibold">
                Search Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* products */}
        <View className="p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-bold">Prescription</Text>
            <Text
              className="text-blue-700"
              onPress={() => router.push("/pages/product")}
            >
              View All {products.length}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.slice(0, 5).map((item: ProductType, index) => (
              <TouchableOpacity
                key={index}
                className="items-center mr-5"
                onPress={() => router.push(`/pages/product/${item?.id}`)}
              >
                <Image
                  source={{ uri: item?.image }}
                  className="w-16 h-16 mb-2"
                />
                <Text className="text-center text-sm">{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Specialities */}
        <View className="p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-bold">Specialties</Text>
            <Text
              className="text-blue-700"
              onPress={() => router.push("/pages/specialities")}
            >
              View All {specialty.length}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {specialty.slice(0, 5).map((item: SpecialtyType, index) => (
              <TouchableOpacity
                key={index}
                className="items-center mr-5"
                onPress={() => router.push(`/pages/specialities/${item?.id}`)}
              >
                <Image
                  source={getSpecialtyImage(item?.icon)}
                  className="w-16 h-16 mb-2"
                />
                <Text className="text-center text-sm">{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Doctors */}
        <View className="p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-bold">Find Doctors</Text>
            <Text
              className="text-blue-700"
              onPress={() => router.push("/pages/doctor")}
            >
              View All {doctors.length}
            </Text>
          </View>

          {doctors.slice(0, 5).map((doctor: DoctorType) => {
            return (
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
            );
          })}
        </View>

        {/* labs */}
        <View className="p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-bold">Labs</Text>
            <Text
              className="text-blue-700"
              onPress={() => router.push("/pages/lab")}
            >
              View All {labs.length}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {labs.slice(0, 5).map((lab: LabType, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  className="items-center mr-5"
                  onPress={() => router.push(`/pages/lab/${lab?.id}`)}
                >
                  <Image
                    source={{ uri: lab?.image }}
                    className="w-16 h-16 mb-2"
                  />
                  <Text className="text-center text-sm">{lab?.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
