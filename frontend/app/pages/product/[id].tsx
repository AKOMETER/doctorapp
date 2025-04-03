import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSidebar } from "@/context/SidebarContext";
import { ProductType } from "@/utils/dataTypes";
import apiRequest from "@/services/apiRequest";
import { showToast } from "@/utils/helperFunction";

export default function DoctorPage() {
  const { user } = useSidebar();
  const { id }: { id: string } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    apiRequest.get(`/product/${id}`).then((res) => {
      setProduct(res?.data);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "Prescription Details",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const increaseQty = () => {
    if (product && quantity < Number(product.stock)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const payload = {
      productId: product.id,
      quantity,
      userId: user?.id,
    };
    apiRequest.post("/cart", payload).then(() => {
      showToast("success", `${product.name} (${quantity}) added to cart.`);
    });
  };

  if (!product) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View className="px-4 pt-4">
          <Image
            source={{ uri: product.image }}
            className="w-full h-60 rounded-xl mb-4"
            resizeMode="cover"
          />

          <Text className="text-xl font-semibold text-gray-800 mb-1">
            {product.name}
          </Text>

          <Text className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </Text>

          <Text className="text-base text-gray-700 mb-4">
            {product.description}
          </Text>

          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-bold text-green-700">
              ₦{product.price}
            </Text>
            <Text className="text-sm text-gray-600">
              Stock: {product.stock}
            </Text>
          </View>

          {/* Quantity Selector */}
          <View className="flex-row items-center justify-between mb-4 border border-gray-300 rounded-xl px-4 py-2">
            <Text className="text-base font-medium text-gray-700">
              Quantity
            </Text>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
                onPress={decreaseQty}
                className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
              >
                <Text className="text-lg font-bold text-gray-800">-</Text>
              </TouchableOpacity>

              <Text className="text-lg font-semibold text-gray-800">
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={increaseQty}
                className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
              >
                <Text className="text-lg font-bold text-gray-800">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-3"
            onPress={handleAddToCart}
          >
            <Text className="text-white text-center font-semibold text-base">
              Add {quantity > 1 ? `${quantity} Items` : "to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
