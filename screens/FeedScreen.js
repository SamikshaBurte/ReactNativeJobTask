import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppContext } from '../state/AppContext'; 
import MealListItem from '../components/MealListItem'; // The animated item component

const FeedScreen = ({ navigation }) => {
    const { feedItems, isLoading } = useAppContext(); 

    if (isLoading) {
        return <ActivityIndicator size="large" color="#FF6347" style={styles.loading} />;
    }
    
    if (!feedItems || feedItems.length === 0) {
        return (
            <View style={styles.loading}>
                <Text>No meals found. Check API connectivity or try again.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={feedItems}
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
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default FeedScreen;