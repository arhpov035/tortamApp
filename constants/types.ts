import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Описание всех маршрутов и их параметров
export type RootStackParamList = {
  VideoList: undefined; // Экран списка видео, без параметров
  VideoPlayer: { video: VideoItem }; // Экран проигрывателя, принимает объект `video`
};

// Тип для элемента видео
export type VideoItem = {
  id: string;
  title: string;
  file: any; // Здесь можно заменить `any` на более строгий тип, если потребуется
};

// Типизация для `useNavigation` (используем в VideoList)
export type VideoListNavigationProp = StackNavigationProp<RootStackParamList, 'VideoList'>;

// Типизация для `useRoute` (используем в VideoPlayerScreen)
export type VideoPlayerRouteProp = RouteProp<RootStackParamList, 'VideoPlayer'>;
