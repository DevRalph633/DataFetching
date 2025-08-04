import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DataContext } from "../context/DataContext";
import { Post } from "../types/types";

const { width } = Dimensions.get("window");
const numColumns = 3;
const boxSize = (width - 40) / numColumns; // account for paddings & margins

export default function PostsList() {
  const { posts } = useContext(DataContext);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    // Filter products by title when search text changes
    const filtered = posts.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchText, posts]);

  const renderProductBox = ({ item }: { item: Post }) => (
    <View style={styles.box}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductBox}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No products found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  box: {
    width: boxSize,
    height: boxSize + 30,
    margin: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: boxSize - 20,
    height: boxSize - 20,
    resizeMode: "contain",
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },
  noResultsText: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
});
