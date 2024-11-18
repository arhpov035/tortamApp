import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

export default function VideoPlayer() {
  const { video } = useLocalSearchParams();

  if (!video) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Видео не найдено!</Text>
      </View>
    );
  }

  const videoData = JSON.parse(video as string);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{videoData.title}</Text>
      <Video
        source={{ uri: videoData.file }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 300,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
});
