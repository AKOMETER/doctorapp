import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { useSidebar } from "@/context/SidebarContext"; // Assuming the context is here
import { updateUser } from "@/services/auth";

// Define the structure of the user data
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  profileImage?: string | null;
}

// Define the structure of the form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country: string;
  state: string;
  city: string;
  address: string;
  profileImage?: string | null;
}

export default function Profile() {
  const { user } = useSidebar(); // Get user data from context
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
  });

  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || null
  );

  // Populate form fields with user data
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
      setValue("mobile", user.mobile || "");
      setValue("country", user.country || "");
      setValue("state", user.state || "");
      setValue("city", user.city || "");
      setValue("address", user.address || "");
    }
  }, [user, setValue]);

  // Handle image selection
  const handleSelectImage = () => {
    console.log("kjfdskjf");
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
          setValue("profileImage", selectedImage.uri || null); // Update form data with the selected image
        }
      }
    );
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("address", data.address);

      if (profileImage) {
        formData.append("profileImage", {
          uri: profileImage,
          type: "image/jpeg",
          name: "profile.jpg",
        } as unknown as Blob); // Cast to Blob to satisfy TypeScript
      }

      const response = await updateUser(user?.id || 0, formData); // Use user ID
      if (response) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully!",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update profile.",
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar Component */}
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

      {/* Form Fields */}
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
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="State"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="City"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      {/* Submit Button */}
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
