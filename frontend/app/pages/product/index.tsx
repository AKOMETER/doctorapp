import apiRequest from "@/services/apiRequest";
import { ProductType } from "@/utils/dataTypes";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Labs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: "",
    option: "",
  });
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    apiRequest.get("/product").then((res: any) => {
      if (res) setProducts(res?.data);
    });
  }, []);

  return (
    // <Sidebar title="All Specialist">
    <SafeAreaView className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-blue-700 p-5 rounded-b-2xl">
          {/* Search Inputs */}
          <View className="mt-5 bg-white rounded-lg p-4 shadow-md">
            {/* <TextInput
              placeholder="Search Location (Ex: Chennai, etc)"
              className="bg-gray-200 rounded-md p-3 mb-3"
              value={formData.location}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, location: text }))
              }
            /> */}
            <TextInput
              placeholder="Search By Prescription name"
              className="bg-gray-200 rounded-md p-3"
              value={formData.option}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, option: text }))
              }
            />
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/pages/search",
                  params: {
                    location: formData.location,
                    option: formData.option,
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

        <View className="flex flex-wrap flex-row justify-center gap-4">
          {products.map((item: ProductType) => (
            <TouchableOpacity
              key={item.id}
              className="items-center mr-2"
              onPress={() => router.push(`/pages/specialities/${item.id}`)}
            >
              <View key={item.id} className="items-center w-24 mb-4">
                <Image
                  source={{ uri: item.image }}
                  className="w-16 h-16 mb-2"
                />
                <Text className="text-center text-sm font-medium">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </Sidebar>
  );
}
