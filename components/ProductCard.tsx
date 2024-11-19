import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { fetchProducts } from '@/api/productsApi';
import { Link } from 'expo-router';
import { Product } from '@/types/Product';

interface ProductCardProps {
    product: Product;
    handlePriceClick: () => void;
}

// Компонент Карточки продукта
const ProductCard: React.FC<ProductCardProps> = ({ product, handlePriceClick }) => {
    return (
        <View style={styles.productCard}>
            {/* Контейнер изображения продукта */}
            <TouchableOpacity style={styles.productCardImgContainer} onPress={() => console.log('Image clicked')}>

                <Link href={`/product/${product.id}`} style={{ flex: 1 }}>
                    <Image
                        source={{ uri: product.image_url }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </Link>
            </TouchableOpacity>

            {/* Название продукта */}
            {/* <Text style={styles.productTitle}>{product.productname}</Text> */}
            <Link href={`/product/${product.id}`} style={styles.productTitle}>{product.productname}</Link>

            {/* Цена продукта */}
            <Text style={styles.price}>{product.price ? `${product.price} Р` : '2200 Р/кг'}</Text>

            {/* Кнопка "Заказать в 1 клик" */}
            <TouchableOpacity style={styles.buyButton} onPress={handlePriceClick}>
                <Text style={styles.buyButtonText}>Заказать</Text>
            </TouchableOpacity>
        </View>
    );
};

// Стили для компонента
const styles = StyleSheet.create({
    productCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '49%', // Чтобы в одну строку помещалось две карточки
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
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        paddingLeft: 5,
        paddingRight: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#10c44c',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
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
        backgroundColor: '#eb249d',
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

export default ProductCard;
