export interface Filling {
    id: number;
    name: string;
    imageUrl?: string;
    description?: string;
    fillingType: string;
    removedImageUrl?: string | null;
  }