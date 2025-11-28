import React, { useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '../state/AppContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const VOWEL_REGEX = /[aeiou]/gi;

const DetailScreen = ({ route, navigation }) => {
    const { item } = route.params; 
    const { toggleFavorite, savedItems } = useAppContext();
    const isFavorite = savedItems.some(i => i.id === item.id);

    const fadeAnim = useRef(new Animated.Value(0)).current; 
    
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false, 
        }).start();
    }, [fadeAnim]);
    
    const vowelCount = item.description ? item.description.match(VOWEL_REGEX)?.length || 0 : 0;
    const descriptionText = item.description || "No detailed instructions were provided for this meal by the API.";

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: item.title,
        });
    }, [navigation, item.title]);

    return (
        <ScrollView style={styles.scrollContainer}>
            {/* Animated view applies the fade-in transition */}
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                
                {/* Image (Shared Element Replacement) */}
                <Image 
                    source={{ 
                        uri: item.imageUrl 
                            ? item.imageUrl 
                            : 'https://placehold.co/600x400/CCCCCC/000000?text=No+Image' 
                    }} 
                    style={styles.image} 
                />

                <View style={styles.content}>
                    <Text style={styles.title}>{item.title}</Text>
                    
                    <View style={styles.headerRow}>
                        <Text style={styles.price}>{item.priceDetails.formatted}</Text>
                         {/* Favorite Button on Detail Screen */}
                         <TouchableOpacity 
                            onPress={() => toggleFavorite(item)}
                            style={styles.favoriteButton}
                        >
                            <MaterialIcons 
                                name={isFavorite ? 'favorite' : 'favorite-border'} 
                                size={32} 
                                color={isFavorite ? 'tomato' : '#ccc'} 
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Full Instructions</Text>
                    <Text style={styles.description}>{descriptionText}</Text>
                    
                    {/* REQUIRED: Show Price Calculation Metrics */}
                    <Text style={styles.label}>Price Calculation Metrics (Required for Video)</Text>
                    <Text style={styles.metrics}>
                        Title Length: {item.title.length} | Vowel Count: {vowelCount}
                    </Text>
                </View>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1 },
    image: { width: '100%', height: SCREEN_HEIGHT * 0.4, resizeMode: 'cover' },
    content: { padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    price: { fontSize: 24, fontWeight: '600', color: 'green' },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#eee' },
    description: { fontSize: 15, lineHeight: 22, color: '#555', textAlign: 'justify' },
    metrics: { fontSize: 14, color: '#777', marginTop: 5 },
    favoriteButton: { padding: 5 }
});

export default DetailScreen;