type VideoItem = {
  id: string;
  title: string;
  file: any; // Здесь можно уточнить тип, если используется `require` для локальных файлов.
};
