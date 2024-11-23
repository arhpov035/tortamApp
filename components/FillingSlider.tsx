import { useFillingContext } from '@/context/FillingContext';
import { Filling } from '@/types/Filling';
import React, { useRef } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

export const FillingSlider: React.FC = () => {
    const { fillings, setActiveSlideId } = useFillingContext();
    const screenWidth = Dimensions.get('window').width;
    const carouselRef = useRef<ICarouselInstance>(null); // Убрали <Filling>

    console.log("fillings: ", JSON.stringify(fillings, null, 2));

    if (!fillings || fillings.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Нет данных для отображения</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Filling }) => {
        return (
            <View style={styles.slide}>
                {item.imageUrl ? (
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text>Изображение отсутствует</Text>
                    </View>
                )}
                <View style={styles.overlay}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </View>
        );
    };

    const handleNext = () => {
        carouselRef.current?.next();
        console.log("next");
        
    };

    const handlePrev = () => {
        carouselRef.current?.prev();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                <Text style={styles.arrowText}>{"<"}</Text>
            </TouchableOpacity>

            <Carousel
                ref={carouselRef}
                loop={true}
                width={screenWidth - 100} // Уменьшили ширину карусели для стрелок
                height={250}
                data={fillings}
                scrollAnimationDuration={1000}
                renderItem={renderItem}
                onSnapToItem={(index) => {
                    setActiveSlideId(fillings[index]?.id);
                }}
            />

            <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                <Text style={styles.arrowText}>{">"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide: {
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    placeholder: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    arrowButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
    },
    arrowText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
