export interface Product {
    id?: number;
    productname: string;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl: string;
    description: string;
    image_url: string;
    slug: string;
    price: number;
    productCategories: ProductCategory[];
    userId?: number;
    is_active?: boolean;
    sort_order?: number;
    creationDate?: string;
    change_date?: string;
    categoryIds?: number[];
    imageUrls?: string[];
    productAttributes: ProductAttribute[];
  }
  
  export interface ProductImage {
    id?: number;
    product_id: number;
    image_url: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Category {
    id?: number;
    slug: string;
    categoryName: string;
    IsCommon: boolean;
    UserID?: number;
    is_active?: boolean;
    sort_order?: number;
    ParentID?: number;
    imageURL?: string;
    Description?: string;
    creation_date?: string;
    change_date?: string;
  }
  
  export interface ProductCategory {
    id?: number;
    ProductID: number;
    CategoryID: number;
    category: Category;
    is_active?: boolean;
    sort_order?: number;
    creation_date?: string;
    change_date?: string;
  }
  
  
  export interface Attribute {
    id?: number;
    attributeName: string;
    attributeType: string;
    isCommon: boolean;
    userId?: number; // Так как user может быть undefined, делаем его необязательным
    isActive: boolean;
    sortOrder: number;
    creationDate: string; // Используем строку для даты, т.к. в JS/TS даты обычно передаются в виде строк
    changeDate: string;
    children?: Attribute[];
    categoryIds?: number[];
    attributeValues?: AttributeValue[];
  }
  
  export interface AttributeValue {
    id: number;
    value: string;
    attributeId: number;
  }
  
  
  export interface ProductAttribute {
    id?: number;
    ProductID: number;
    attribute: Attribute; // Обновите, чтобы включить объект Attribute
    attributeValue: string;
    is_active?: boolean;
    sort_order?: number;
    creation_date?: string;
    change_date?: string;
  }
  