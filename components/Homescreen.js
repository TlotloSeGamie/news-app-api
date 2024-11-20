import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (searchQuery = "") => {
    try {
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_598157612e5ac2fc28ee5cfebc9a5af1118ca&q=${searchQuery}`
      );
      setArticles(response.data.results);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = () => {
    fetchNews(query);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News App</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search news..."
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.link}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.articleContainer}
            onPress={() => navigation.navigate("Details", { article: item })}
          >
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleSource}>{item.source_id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  articleContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articleSource: { 
    fontSize: 14, 
    color: "gray" 
},
});

export default HomeScreen;
