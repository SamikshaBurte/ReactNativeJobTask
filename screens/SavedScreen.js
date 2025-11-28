import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '../state/AppContext';
import MealListItem from '../components/MealListItem'; // Use the reusable component

const SavedScreen = ({ navigation }) => {
    const { savedItems } = useAppContext(); 

    if (savedItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <MaterialIcons name="heart-broken" size={50} color="#ccc" style={{ marginBottom: 15 }} />
                <Text style={styles.emptyText}>No saved items yet.</Text>
                <Text style={styles.emptySubtitle}>Favorite some meals from the Feed tab!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={savedItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <MealListItem 
                        item={item} 
                        index={index} 
                        navigation={navigation}
                    />
                )}
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 50 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F0F0' },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: 'gray',
    }
});

export default SavedScreen;