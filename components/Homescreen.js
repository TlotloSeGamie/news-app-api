import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
    Linking,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsArticle = ({ article }) => {
    const { title, url, urlToImage, description } = article;

    return (
        <View style={styles.newsArticle}>
            <Image source={{ uri: urlToImage || 'https://via.placeholder.com/150' }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>{title}</Text>
            <Text style={styles.newsDescription}>{description}...</Text>
            <TouchableOpacity onPress={() => Linking.openURL(url)}>
                <Text style={styles.readMore}>Read more</Text>
            </TouchableOpacity>
        </View>
    );
};

const NewsApp = () => {
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [loading, setLoading] = useState(false);

    const categories = ['general', 'sports', 'technology', 'business', 'politics', 'entertainment', 'health', 'science'];

    useEffect(() => {
        fetchNews();
    }, [selectedCategory]);

    const fetchNews = async () => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=594e7c65a0394c01b9b99a1399d9d896`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setNews(data.articles || []);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.categoryTabs}>
                {categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.tab,
                            selectedCategory === category ? styles.activeTab : null,
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={styles.tabText}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={news}
                    renderItem={({ item }) => <NewsArticle article={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f4f4f9' },
    categoryTabs: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 },
    tab: { margin: 5, padding: 10, borderRadius: 20, backgroundColor: '#ddd' },
    activeTab: { backgroundColor: '#007bff' },
    tabText: { fontSize: 16, color: '#333' },
    newsArticle: { marginBottom: 20, padding: 15, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
    newsImage: { width: '100%', height: 180, borderRadius: 10, marginBottom: 10 },
    newsTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    newsDescription: { fontSize: 14, color: '#777', marginVertical: 5 },
    readMore: { color: '#007bff', fontSize: 14, marginVertical: 5 },
});

export default NewsApp;

