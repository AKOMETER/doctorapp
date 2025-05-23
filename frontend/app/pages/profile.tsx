import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useSidebar } from "@/context/SidebarContext";
import { updateUser } from "@/services/auth";
import { useNavigation, useRouter } from "expo-router";
import Sidebar from "@/components/sidebar";
import { showToast } from "@/utils/helperFunction";
import Toast from "react-native-toast-message";
import PatientMedicalProfile from "@/components/PatientMedicalProfile";

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  profileImage?: string | null;
}

export default function Profile() {
  const { user, setUser } = useSidebar();
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
    },
  });
  const navigation = useNavigation();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || null
  );

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showToast(
          "error",
          "Permission Denied",
          "Allow access to gallery to upload images"
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("mobile", user.mobile || "");
    }
  }, [user, setValue, router]);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setValue("profileImage", result.assets[0].uri);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("mobile", data.mobile);

      if (profileImage) {
        formData.append("profileImage", {
          uri: profileImage,
          type: "image/jpeg",
          name: "profile.jpg",
        } as any);
      }

      const response = await updateUser(user?.id || 0, formData);
      if (response?.status == 200) {
        setUser(response?.data.user);
        showToast(
          "success",
          response?.data.msg || "Profile updated successfully"
        );
      }
    } catch (error) {
      showToast("error", "Failed to update profile.");
    }
  };

  return (
    // <Sidebar title="User Profile">
    <View className="flex-1 p-5 bg-white">
      <TouchableOpacity
        onPress={handleSelectImage}
        className="self-center mb-5 w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} className="w-full h-full" />
        ) : (
          <Text className="text-white font-bold">Select Image</Text>
        )}
      </TouchableOpacity>

      <View className="mb-5 space-y-3">
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border  m-3  border-gray-300 rounded p-3"
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border  m-3  border-gray-300 rounded p-3"
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          name="mobile"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 m-3 rounded p-3"
              placeholder="Mobile"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className=" p-4 rounded flex items-center"
        style={{ backgroundColor: "#1f5b92" }}
      >
        <Text className="text-white font-bold">Update Profile</Text>
      </TouchableOpacity>

      {user?.role == "Patient" && <PatientMedicalProfile />}
      <Toast />
    </View>
    // </Sidebar>
  );
}
