// import { useWeightContext } from '@/context/WeightContext';
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList, Image } from 'react-native';

// interface Weights {
//   [key: string]: number[];
// }

// export const WeightSelector: React.FC = () => {
//   const { weight, setWeight } = useWeightContext(); // Используем контекст для веса
//   const [activeTab, setActiveTab] = useState<'tab_1' | 'tab_2'>('tab_1');
//   const screenWidth = Dimensions.get('window').width;

//   const weights: Weights = {
//     tab_1: [2, 2.5, 3, 4, 5],
//     tab_2: [6, 7, 8, 9, 10, 11],
//   };

//   // Переключение вкладок
//   const toggleTab = () => {
//     setActiveTab(activeTab === 'tab_1' ? 'tab_2' : 'tab_1');
//   };

//   // Устанавливаем начальный вес
//   useEffect(() => {
//     setWeight(2);
//   }, []);

//   // Определение ширины элемента с учетом отступов и ширины toggleImage
//   const toggleImageWidth = 24; // Ширина изображения toggleImage
//   const toggleButtonMargin = 10; // Отступ для toggleButton
//   const itemMargin = 10; // Сумма отступов с двух сторон (5 пикселей слева и 5 пикселей справа)
//   const paddingStart = 20; // Отступ в начале списка для видимости первого элемента

//   // Общая доступная ширина для списка элементов
//   const availableWidth = screenWidth - toggleImageWidth - toggleButtonMargin - paddingStart;

//   // Определение количества элементов для расчета ширины
//   const numItemsForCalculation = 6; // Рассчитываем как будто 6 элементов на первой вкладке
//   const numItemsTab2 = 6; // Для второй вкладки 6 элементов

//   // Расчет ширины для стандартных элементов
//   const itemWidthTab1 = (availableWidth - itemMargin * numItemsForCalculation) / numItemsForCalculation;
//   const itemWidthTab2 = (availableWidth - itemMargin * numItemsTab2) / numItemsTab2;

//   const styles = StyleSheet.create({
//     container: {
//       alignItems: 'center',
//       bottom: 15
//     },
//     weightSelectorContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//     },
//     weightList: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingLeft: paddingStart,
//     },
//     weightItem: {
//       backgroundColor: '#f0f0f0',
//       borderRadius: 8,
//       padding: 10,
//       marginHorizontal: itemMargin / 2, // По 5 пикселей с каждой стороны
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: activeTab === 'tab_1' ? itemWidthTab1 : itemWidthTab2, // Ширина элемента в зависимости от активной вкладки
//       height: 60,
//     },
//     weightItemDouble: {
//       width: itemWidthTab1 * 2 + itemMargin, // Элемент "4 кг" в два раза шире, плюс один отступ
//     },
//     activeWeightItem: {
//       backgroundColor: '#FF8C52',
//     },
//     weightText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     kgText: {
//       fontSize: 12,
//       color: '#666',
//     },
//     toggleButton: {
//       marginLeft: toggleButtonMargin, // Добавляем отступ для кнопки справа
//       padding: 10,
//     },
//     toggleImage: {
//       width: toggleImageWidth,
//       height: 24,
//     }
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.weightSelectorContainer}>
//         <FlatList
//           data={weights[activeTab]}
//           keyExtractor={(item) => item.toString()}
//           horizontal
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={[
//                 styles.weightItem,
//                 item === 4 && activeTab === 'tab_1' ? styles.weightItemDouble : {},
//                 weight === item && styles.activeWeightItem,
//               ]}
//               onPress={() => setWeight(item)}
//             >
//               <Text style={styles.weightText}>{item}</Text>
//               <Text style={styles.kgText}>кг</Text>
//             </TouchableOpacity>
//           )}
//           contentContainerStyle={styles.weightList}
//           showsHorizontalScrollIndicator={false}
//         />
//         <TouchableOpacity onPress={toggleTab} style={styles.toggleButton}>
//           <Image
//             source={require('@/assets/images/expand.png')} // Убедитесь, что путь к изображению верный
//             style={styles.toggleImage}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };



import { useWeightContext } from '@/context/WeightContext';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList, Image, Animated } from 'react-native';

interface Weights {
  [key: string]: number[];
}

export const WeightSelector: React.FC = () => {
  const { weight, setWeight } = useWeightContext(); // Используем контекст для веса
  const [activeTab, setActiveTab] = useState<'tab_1' | 'tab_2'>('tab_1');
  const [rotateAnim] = useState(new Animated.Value(0)); // Анимация для поворота кнопки
  const screenWidth = Dimensions.get('window').width;

  const weights: Weights = {
    tab_1: [2, 2.5, 3, 4, 5],
    tab_2: [6, 7, 8, 9, 10, 11],
  };

  // Переключение вкладок
  const toggleTab = () => {
    setActiveTab(activeTab === 'tab_1' ? 'tab_2' : 'tab_1');
    Animated.timing(rotateAnim, {
      toValue: activeTab === 'tab_1' ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Устанавливаем начальный вес
  useEffect(() => {
    setWeight(2);
  }, []);

  // Определение ширины элемента с учетом отступов и ширины toggleImage
  const toggleImageWidth = 24; // Ширина изображения toggleImage
  const toggleButtonMargin = 10; // Отступ для toggleButton
  const itemMargin = 10; // Сумма отступов с двух сторон (5 пикселей слева и 5 пикселей справа)
  const paddingStart = 20; // Отступ в начале списка для видимости первого элемента

  // Общая доступная ширина для списка элементов
  const availableWidth = screenWidth - toggleImageWidth - toggleButtonMargin - paddingStart;

  // Определение количества элементов для расчета ширины
  const numItemsForCalculation = 6; // Рассчитываем как будто 6 элементов на первой вкладке
  const numItemsTab2 = 6; // Для второй вкладки 6 элементов

  // Расчет ширины для стандартных элементов
  const itemWidthTab1 = (availableWidth - itemMargin * numItemsForCalculation) / numItemsForCalculation;
  const itemWidthTab2 = (availableWidth - itemMargin * numItemsTab2) / numItemsTab2;

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Поворот на 180 градусов
  });

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      bottom: 15,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 16,
      marginBottom: 10,
    },
    backButton: {
      fontSize: 16,
      color: 'blue',
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    weightSelectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    weightList: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: paddingStart,
    },
    weightItem: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 10,
      marginHorizontal: itemMargin / 2, // По 5 пикселей с каждой стороны
      alignItems: 'center',
      justifyContent: 'center',
      width: activeTab === 'tab_1' ? itemWidthTab1 : itemWidthTab2, // Ширина элемента в зависимости от активной вкладки
      height: 60,
    },
    weightItemDouble: {
      width: itemWidthTab1 * 2 + itemMargin, // Элемент "4 кг" в два раза шире, плюс один отступ
    },
    activeWeightItem: {
      backgroundColor: '#FF8C52',
    },
    weightText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    kgText: {
      fontSize: 12,
      color: '#666',
    },
    toggleButton: {
      marginLeft: toggleButtonMargin, // Добавляем отступ для кнопки справа
      padding: 10,
    },
    toggleImage: {
      width: toggleImageWidth,
      height: 24,
      transform: [{ rotate: rotateInterpolate }], // Анимация поворота
    },
    rightButton: {
      padding: 10,
    },
    rightButtonText: {
      fontSize: 14,
      color: 'blue',
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.weightSelectorContainer}>
          <FlatList
            data={weights[activeTab]}
            keyExtractor={(item) => item.toString()}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.weightItem,
                  item === 4 && activeTab === 'tab_1' ? styles.weightItemDouble : {},
                  weight === item && styles.activeWeightItem,
                ]}
                onPress={() => setWeight(item)}
              >
                <Text style={styles.weightText}>{item}</Text>
                <Text style={styles.kgText}>кг</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.weightList}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity onPress={toggleTab} style={styles.toggleButton}>
            <Animated.Image
              source={require('@/assets/images/expand.png')} // Убедитесь, что путь к изображению верный
              style={styles.toggleImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
