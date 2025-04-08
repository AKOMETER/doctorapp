import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from "react-native";
import { useSidebar } from "@/context/SidebarContext";
import apiRequest from "@/services/apiRequest";
import { CartItemType } from "@/utils/dataTypes";
import { showToast } from "@/utils/helperFunction";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const { user, isUserLoggedIn, setIsUserLoggedIn } = useSidebar();
  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState<CartItemType[]>(isUserLoggedIn.cart || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!user) return;
    apiRequest.get(`/cart/${user?.id}`).then((res) => {
      if (res?.data) setCart(res?.data);
    });
  }, []);

  const updateQuantity = (index: number, type: "inc" | "dec") => {
    const updated = [...cart];
    if (type === "inc") updated[index].quantity += 1;
    else if (type === "dec" && updated[index].quantity > 1)
      updated[index].quantity -= 1;
    setCart(updated);
  };

  const getTotal = () => {
    return cart.reduce(
      (sum: any, item: any) => sum + item.Product.price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    console.log("here is it ");
    const total = getTotal();

    console.log(
      "parseInt(user.amount) < total)",
      parseInt(user.amount) < total
    );
    if (parseInt(user.amount) < total) {
      showToast(
        "error",
        "Insufficient Funds",
        "You do not have enough balance."
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    const router = useRouter();

    const payload = {
      cartItems: cart,
      amount: total,
      userId: user.id,
    };
    console.log("payload", payload);

    apiRequest
      .post("/order/checkout", payload)
      .then((res) => {
        const newAmount = user.amount - total;
        setIsUserLoggedIn({ ...isUserLoggedIn, cart: [], amount: newAmount });

        showToast("success", "Success", "Order placed successfully!");
        setModalVisible(false);

        setTimeout(() => {
          router.push("/");
        }, 1000);
        console.log("try");
      })
      .catch((err) => {
        console.log("catch");
        showToast(
          "error",
          "Error",
          "Something went wrong while placing order."
        );
      })
      .finally(() => {
        console.log("finally");
        setLoading(false);
      });
  };

  const renderItem = ({ item, index }: any) => (
    <View className="flex-row justify-between items-center mb-4 p-4 border rounded-xl bg-white shadow">
      <View>
        <Text className="text-base font-semibold">{item.Product.name}</Text>
        <Text className="text-sm text-gray-500">£{item.Product.price}</Text>
      </View>

      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          className="bg-red-100 px-3 py-1 rounded"
          onPress={() => updateQuantity(index, "dec")}
        >
          <Text className="text-red-600 font-bold">-</Text>
        </TouchableOpacity>

        <Text className="text-base font-bold">{item.quantity}</Text>

        <TouchableOpacity
          className="bg-green-100 px-3 py-1 rounded"
          onPress={() => updateQuantity(index, "inc")}
        >
          <Text className="text-green-600 font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-4">
      <FlatList
        data={cart}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            Your cart is empty
          </Text>
        }
      />

      {cart.length > 0 && (
        <View className="mt-6">
          <Text className="text-right text-lg font-bold mb-3">
            Total: £ {getTotal() || 0}
          </Text>

          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 mb-4"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Checkout Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <Text className="text-xl font-bold mb-4 text-center">
              Confirm Payment
            </Text>

            <View className="mb-3">
              <Text className="text-base mb-1 text-gray-600">
                Wallet Balance:
              </Text>
              <Text className="text-lg font-semibold mb-2">
                £ {user.amount || 0}
              </Text>

              <Text className="text-base mb-1 text-gray-600">Total Cost:</Text>
              <Text className="text-lg font-semibold">£ {getTotal()}</Text>
            </View>

            <View className="flex-row justify-between mt-6 space-x-3">
              <TouchableOpacity
                className="bg-gray-300 rounded-xl py-3 flex-1"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-center font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`rounded-xl py-3 flex-1 ${
                  loading ? "bg-gray-400" : "bg-green-600"
                }`}
                onPress={() => handleCheckout()}
                disabled={loading}
              >
                <Text className="text-white text-center font-semibold">
                  {loading ? "Processing..." : "Confirm & Pay"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
}
