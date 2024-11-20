import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from "react-native";

const DetailsScreen = ({ route }) => {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.source}>Source: {article.source_id}</Text>
      <Text style={styles.content}>{article.description || "No description available."}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(article.link)} style={styles.linkButton}>
        <Text style={styles.linkText}>Read Full Article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
},
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 10 
},
  source: { 
    fontSize: 16, color: "gray", 
    marginBottom: 20 
},
  content: { 
    fontSize: 16, 
    lineHeight: 24 
},
  linkButton: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: "#007bff", 
    alignItems: "center" 
},
  linkText: { 
    color: "#fff", 
    fontWeight: "bold" 
},
});

export default DetailsScreen;
