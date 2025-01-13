import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSearchParams } from "expo-router";

const SearchResults = () => {
  const { query } = useSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Search Results for "{query}"</Text>
      {/* Replace with actual search results */}
      <Text>No results found.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
});

export default SearchResults;
