
import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { isPrime } from '../utils/calculations'; // Prime Logic
import { useAppContext } from '../state/AppContext'; // State Actions/Sync
import { MaterialIcons } from '@expo/vector-icons'; // Icons

const CARD_WIDTH = Dimensions.get('window').width - 20; 

const MealListItem = ({ item, index, navigation }) => {
    const { savedItems, toggleFavorite, removeItemFromFeed } = useAppContext();
    
    const isFavorite = savedItems.some(i => i.id === item.id);
    const isPrimeItem = isPrime(index);

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const animateFavorite = () => {
        toggleFavorite(item); 
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.3, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    const animatedHeight = useRef(new Animated.Value(240)).current; 
    const opacityAnim = useRef(new Animated.Value(1)).current;
    
    const handleDelete = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(animatedHeight, { toValue: 0, duration: 300, useNativeDriver: false }), 
        ]).start(() => {
            removeItemFromFeed(item.id);
        });
    };
    
    const handlePress = () => {
        navigation.navigate('DetailScreen', { item: item });
    };

    return (
        <Animated.View 
            style={[{ height: animatedHeight, opacity: opacityAnim, overflow: 'hidden' }, styles.animatedWrapper]}
        >
            <TouchableOpacity 
                style={[
                    styles.card, 
                    isPrimeItem && styles.primeBorder // REQUIRED: Gold Border
                ]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                {/* Image Display */}
                <Image 
                    source={{ 
                        uri: item.imageUrl ? item.imageUrl : 'https://placehold.co/600x400/CCCCCC/000000?text=No+Image' 
                    }} 
                    style={styles.image} 
                />
                
                <View style={styles.detailsContainer}>
                    
                    {/* Prime Badge Display */}
                    {isPrimeItem && (
                        <View style={styles.primeBadge}>
                            <Text style={styles.primeText}>PRIME DEAL 🥇</Text>
                        </View>
                    )}
                    
                    <View style={styles.textColumn}>
                        {/* Title and Price (Clean UI) */}
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.price}>{item.priceDetails.formatted}</Text> 
                    </View>
                    
                    {/* Delete Icon (Functional replacement for Swipe-to-Delete) */}
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <MaterialIcons name="delete-forever" size={24} color="#D9534F" />
                    </TouchableOpacity>

                    {/* Favorite Icon (with Custom Animation) */}
                    <TouchableOpacity onPress={animateFavorite} style={styles.favoriteButton}>
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <MaterialIcons 
                                name={isFavorite ? 'favorite' : 'favorite-border'} 
                                size={24} 
                                color={isFavorite ? 'tomato' : 'gray'} 
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    animatedWrapper: { marginVertical: 8, marginHorizontal: 10, width: CARD_WIDTH },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        height: 240, 
    },
    primeBorder: { borderWidth: 3, borderColor: 'gold' },
    image: { width: '100%', height: 150, resizeMode: 'cover' },
    detailsContainer: { 
        padding: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    textColumn: { flex: 1, marginRight: 10 },
    primeBadge: { position: 'absolute', top: -15, right: 10, backgroundColor: 'gold', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 15, zIndex: 10 },
    primeText: { color: '#000', fontWeight: '900', fontSize: 10 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    price: { fontSize: 16, color: '#333', fontWeight: '600' },
    favoriteButton: { padding: 5, position: 'absolute', right: 10, top: 10 },
    deleteButton: { padding: 5, position: 'absolute', left: 10, top: 10 },
});

export default MealListItem;