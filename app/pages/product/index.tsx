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
} from "react-native";

export default function Labs() {
  const router = useRouter();

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
