import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { fetchProducts, Product } from '@/api/productsApi';

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
                <Image
                    source={{ uri: product.image_url }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Название продукта */}
            <Text style={styles.productTitle}>{product.productname}</Text>

            {/* Цена продукта */}
            <Text style={styles.price}>{product.price ? `${product.price} Р` : '2500 Р/кг'}</Text>

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
