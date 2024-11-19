import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetail = () => {
    const { id } = useSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Детали продукта</Text>
            <Text style={styles.text}>ID: {id}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default ProductDetail;
