import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import ProductList from '@/components/ProductList';
import { Product } from '@/types/Product';
import productApiService from '@/api/ProductApiService';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productData = await productApiService.fetchProducts(0, 10); // Загружаем 10 продуктов, начиная с позиции 0
                setProducts(productData);
                setLoading(false);
            } catch (error) {
                setError('Ошибка при загрузке продуктов');
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Главная страница
            </Text> */}
            <ProductList />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomePage;
