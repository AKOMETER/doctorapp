import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "react-native-image-picker";
import { useSidebar } from "@/context/SidebarContext";
import { updateUser } from "@/services/auth";
import { useNavigation, useRouter } from "expo-router";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  profileImage?: string | null;
}

export default function Profile() {
  const { user } = useSidebar();
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    },
  });
  const navigation = useNavigation();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || null
  );

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
      setValue("mobile", user.mobile || "");
    }
  }, [user, setValue, router]);

  useEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const handleSelectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,
        maxHeight: 512,
        quality: 1,
      },
      (response) => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.length
        ) {
          const selectedImage = response.assets[0];
          setProfileImage(selectedImage.uri || null);
          setValue("profileImage", selectedImage.uri || null);
        }
      }
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);

      if (profileImage) {
        formData.append("profileImage", {
          uri: profileImage,
          type: "image/jpeg",
          name: "profile.jpg",
        } as unknown as Blob);
      }

      const response = await updateUser(user?.id || 0, formData);
      if (response) {
        Alert.alert(
          "Successful",
          response.msg || "Profile updated successfully"
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error?.response?.data?.msg || "Failed to update profile."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSelectImage}
        style={styles.avatarContainer}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarPlaceholder}>Select Image</Text>
        )}
      </TouchableOpacity>
      <View style={styles.form}>
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
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
              style={styles.input}
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
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
              style={styles.input}
              placeholder="Mobile"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    textAlign: "center",
    lineHeight: 100,
    color: "#fff",
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
