import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchProducts, Product } from '@/api/productsApi';
import ProductCard from '@/components/ProductCard';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [start, setStart] = useState<number>(0);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const PRODUCTS_PER_PAGE = 10;

    const loadProducts = async (startIndex: number, append: boolean = false) => {
        try {
            setLoadingMore(true);
            const productData = await fetchProducts(startIndex, PRODUCTS_PER_PAGE);

            if (productData.length === 0) {
                setHasMore(false);
            } else {
                if (append) {
                    setProducts((prevProducts) => [...prevProducts, ...productData]);
                } else {
                    setProducts(productData);
                }
            }

            setLoading(false);
            setLoadingMore(false);
        } catch (error) {
            setError('Ошибка при загрузке продуктов');
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        loadProducts(0);
    }, []);

    if (loading && !loadingMore) {
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
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
                <ProductCard product={item} handlePriceClick={() => console.log('Price clicked')} />
            )}
            onEndReached={() => {
                if (hasMore && !loadingMore) {
                    const nextStartIndex = start + PRODUCTS_PER_PAGE;
                    setStart(nextStartIndex);
                    loadProducts(nextStartIndex, true);
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
                loadingMore ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                ) : (
                    !hasMore && (
                        <View style={styles.centered}>
                            <Text>Товары закончились</Text>
                        </View>
                    )
                )
            }
        />
    );
};

// Стили для компонента
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 5,
        paddingTop: 16,
        paddingBottom: 70,
    },
    productCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productCardImgContainer: {
        position: 'relative',
        width: '100%',
        height: 180,
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    productTitle: {
        marginTop: 16,
        minHeight: 48,
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#111',
    },
    pricing: {
        marginBottom: 10,
    },
    pricingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    weight: {
        fontSize: 14,
        color: '#555',
    },
    cost: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111',
    },
    buyButton: {
        backgroundColor: '#111827',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductList;
