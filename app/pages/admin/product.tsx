import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import apiRequest from "@/services/apiRequest";
import NumberInput from "@/components/number_input";
import { ProductType } from "@/utils/dataTypes";

export default function AdminProductScreen() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState<ProductType>({
    name: "",
    image: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await apiRequest.get("/product");
      setProducts(res?.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const openCreateModal = () => {
    setForm({
      name: "",
      image: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
    });
    setEditingId(null);
    setModalVisible(true);
  };

  const openEditModal = (product: ProductType) => {
    setForm(product);
    setEditingId(product.id!);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await apiRequest.put(`/product/${editingId}`, form);
      } else {
        await apiRequest.post("/product", form);
      }
      setModalVisible(false);
      fetchProducts();
    } catch (err) {
      console.error("Save product error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Product", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await apiRequest.delete(`/product/${id}`);
            fetchProducts();
          } catch (err) {
            console.error("Delete product error:", err);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Create New Product" onPress={openCreateModal} />

      {products.map((product) => (
        <View key={product.id} style={styles.card}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
          ) : null}
          <Text style={styles.title}>{product.name}</Text>
          <Text>{product.description}</Text>
          <Text>Description: {product.description}</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => openEditModal(product)}>
              <FontAwesome name="edit" size={20} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(product.id!)}>
              <FontAwesome
                name="trash"
                size={20}
                color="red"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal Form */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {editingId ? "Edit Product" : "Create Product"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={form.name}
            onChangeText={(text) =>
              setForm({ ...form, name: text.trimStart() })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={form.image}
            onChangeText={(text) => setForm({ ...form, image: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
          />

          <NumberInput
            value={form.price}
            onChangeValue={(val) => setForm({ ...form, price: val })}
            float={true}
            placeholder="Enter Price"
          />

          <NumberInput
            value={form.stock}
            placeholder="Enter Stock"
            onChangeValue={(val) => setForm({ ...form, stock: val })}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Category"
            value={form.category}
            onChangeText={(text) => setForm({ ...form, category: text })}
          />

          <View style={styles.modalButtons}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    top: "20%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
