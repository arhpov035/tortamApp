import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type VideoItem = {
  id: string;
  title: string;
  file: any; // Теперь здесь `require`
};

const videos: VideoItem[] = [
  { id: '1', title: '1. Загиб руки за спину толчком', file: require('../../assets/videos/video1.mp4') },
  { id: '2', title: '2. Загиб руки за спину нырком', file: require('../../assets/videos/video2.mp4') },
  { id: '3', title: '3. Загиб руки за спину рывком', file: require('../../assets/videos/video3.mp4') },
  { id: '4', title: '4. Загиб руки за спину замком', file: require('../../assets/videos/video4.mp4') },
  { id: '5', title: '5. Рычаг руки через предплечье', file: require('../../assets/videos/video5.mp4') },
];

export default function VideoList() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Список Видео</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/(tabs)/VideoPlayer', // Маршрут на экран VideoPlayer
              params: { video: JSON.stringify({ id: item.id, title: item.title, file: item.file }) }, // Передача параметров
            }}
            style={styles.item}
          >
            <Text style={styles.title}>{item.title}</Text>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
});
