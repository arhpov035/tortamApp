import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, useWindowDimensions, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Product } from '@/types/Product';
import { useWeightContext, WeightProvider } from '@/context/WeightContext';
import productApiService from '@/api/ProductApiService';
import { WeightSelector } from '@/components/WeightSelector';
import RenderHTML from 'react-native-render-html';
import { CONFIG } from '@/config';

import { FillingSlider } from '@/components/FillingSlider';


const pricePerKg = CONFIG.PRICE_TORT_KG;
const pricePerKgAbove4 = CONFIG.PRICE_TORT_OT_4_KG;

const ProductDetail = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter(); // Для управления навигацией
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { weight, setWeight } = useWeightContext();
    const [totalPrice, setTotalPrice] = useState<number | null>(pricePerKg * 2);

    const { width } = useWindowDimensions();


    // Загружаем данные продукта
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedProduct = await productApiService.fetchProductById(Number(id));
                setProduct(fetchedProduct);
            } catch (err) {
                setError('Не удалось загрузить данные продукта');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        if (weight) {
            setTotalPrice(weight * pricePerKg);
        }
    }, [weight]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FF8C52" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* Верхняя панель с кнопкой "Назад" */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    Цена:
                    <Text style={styles.priceText}>
                        {product?.price ? product.price : totalPrice} ₽
                    </Text>
                </Text>
                {/* Кнопка, прижатая вправо */}
                <TouchableOpacity onPress={() => console.log('Заказать нажата')} style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Заказать</Text>
                </TouchableOpacity>
            </View>

            {/* Основное содержимое */}
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{product?.productname}</Text>
                {/* Основная информация о продукте */}
                <View style={styles.content}>
                    {product?.image_url && (
                        <Image
                            source={{ uri: product.image_url }}
                            style={[styles.productImage, { width: width * 0.9, height: width * 0.9 }]} // Адаптация ширины и высоты
                            resizeMode="contain"
                        />
                    )}


                </View>

                {/* Описание продукта с HTML */}
                <RenderHTML
                    contentWidth={width}
                    source={{ html: product?.description || '<p>No description</p>' }}
                />
            </ScrollView>

            {/* Компонент выбора веса */}

            <WeightSelector />
            <FillingSlider />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingBottom: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    backButton: {
        marginRight: 10,
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#007BFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        marginBottom: 16,
        borderRadius: 8, // Закругленные углы, если нужно
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        // marginBottom: 10,
    },
    priceText: {
        color: '#22c859',
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: '#FF1493', // Ярко-розовый цвет
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8, // Закругленные углы
    },
    orderButtonText: {
        color: '#FFFFFF', // Белый текст
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default ProductDetail;
