import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from '@/components/ProductCard';
import CustomModal from './CustomModal';
import { TextInputMask } from 'react-native-masked-text';
import PhoneOrderApi from '@/api/PhoneOrderApi';
import { PhoneOrder } from '@/types/PhoneOrderApi';
import { normalizePhoneNumber } from '@/utils/normalizePhoneNumber';
import { Product } from '@/types/Product';
import productApiService from '@/api/ProductApiService';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [start, setStart] = useState<number>(0);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const PRODUCTS_PER_PAGE = 10;

    const loadProducts = async (startIndex: number, append: boolean = false) => {
        try {
            setLoadingMore(true);
            // const productData = await fetchProducts(startIndex, PRODUCTS_PER_PAGE);
            const productData = await productApiService.fetchProducts(startIndex, PRODUCTS_PER_PAGE);

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

    const handleOrderClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
    };

    const handlePhoneChange = (text: string) => {
        setPhone(text);
        if (phoneError) setPhoneError(null);
    };

    const handleFormSubmit = async () => {
        if (!phone || phone.length < 18) { // Проверка корректности номера
            setPhoneError('Введите корректный номер телефона');
            return;
        }



        const formattedPhone = normalizePhoneNumber(phone);
        console.log('Product ID:', selectedProduct?.id);
        console.log('Phone:', formattedPhone);

        const newOrder: PhoneOrder = {
            productId: Number(selectedProduct?.id) || 0, // Устанавливаем значение по умолчанию, если id не определен
            phoneNumber: formattedPhone,
            status: 'Pending',
        };

        try {
            const createdOrder = await PhoneOrderApi.createPhoneOrder(newOrder);
            console.log('Order created:', createdOrder);
        } catch (error) {
            console.error('Error creating order:', error);
        }

        // Закрытие модального окна и очистка состояния
        setPhone('');
        handleModalClose();
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
        <>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    // <ProductCard product={item} handlePriceClick={() => console.log('Price clicked')} />
                    <ProductCard
                        product={item}
                        handlePriceClick={() => handleOrderClick(item)}
                    />
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

            <CustomModal visible={isModalVisible} onClose={handleModalClose}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Номер телефона:</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{ mask: '+7 (999) 999-99-99' }}
                        value={phone}
                        onChangeText={handlePhoneChange}
                        keyboardType="phone-pad"
                        style={[styles.input, phoneError ? styles.inputError : null]}
                        placeholder="+7 (___) ___-__-__"
                    />
                    {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                    <Text style={styles.submitButtonText}>Отправить</Text>
                </TouchableOpacity>
            </CustomModal>

        </>
    );
};

// Стили для компонента
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        // justify-content: space-between;
        justifyContent: "space-between",
    },
    listContent: {
        paddingHorizontal: 10, // Поля для всего списка
        paddingTop: 16,
        paddingBottom: 70,
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
        gap: '7px',
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
    formContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductList;
