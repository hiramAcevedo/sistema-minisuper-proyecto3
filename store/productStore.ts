import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definición de tipos
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  stock: number;
  discountPercent?: number;
  isOutOfStock?: boolean;
  variant?: string;
};

// Interfaz del store
interface ProductStore {
  products: Product[];
  categories: string[];
  
  // Acciones
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: (limit?: number) => Product[];
  searchProducts: (term: string) => Product[];
}

// Productos iniciales
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Leche Entera',
    price: 24.50,
    image: '/leche1.webp',
    category: 'Lácteos',
    rating: 4.5,
    description: 'Leche entera de alta calidad',
    stock: 50,
    discountPercent: 10
  },
  {
    id: '2',
    name: 'Pan Integral',
    price: 35.00,
    image: '/panela.webp',
    category: 'Panadería',
    rating: 4.3,
    description: 'Pan integral recién horneado',
    stock: 30,
    discountPercent: 5
  },
  {
    id: '3',
    name: 'Huevos',
    price: 48.00,
    image: '/huevo.jpeg',
    category: 'Lácteos',
    rating: 4.8,
    description: 'Huevos frescos de gallinas de corral',
    stock: 100
  },
  {
    id: '4',
    name: 'Manzanas',
    price: 45.50,
    image: '/manzana.avif',
    category: 'Frutas',
    rating: 4.6,
    description: 'Manzanas rojas frescas',
    stock: 80,
    discountPercent: 15
  },
  {
    id: '5',
    name: 'Arroz',
    price: 28.00,
    image: '/arroz.jpg',
    category: 'Abarrotes',
    rating: 4.7,
    description: 'Arroz blanco premium',
    stock: 120
  },
  {
    id: '6',
    name: 'Tortillas',
    price: 18.50,
    image: '/tortillas.jpeg',
    category: 'Abarrotes',
    rating: 4.4,
    description: 'Tortillas de maíz recién hechas',
    stock: 90,
    discountPercent: 8
  },
  {
    id: '7',
    name: 'Crema',
    price: 22.00,
    image: '/creama1.webp',
    category: 'Lácteos',
    rating: 4.2,
    description: 'Crema para cocinar de excelente calidad',
    stock: 60
  },
  {
    id: '8',
    name: 'Jabón para Ropa',
    price: 55.00,
    image: '/jabon_polvo.webp',
    category: 'Limpieza',
    rating: 4.1,
    description: 'Jabón biodegradable para todo tipo de ropa',
    stock: 40,
    discountPercent: 20
  },
  {
    id: '9',
    name: 'Escoba',
    price: 65.00,
    image: '/mini_escoba.jpeg',
    category: 'Hogar',
    rating: 4.9,
    description: 'Escoba resistente y duradera',
    stock: 70
  },
  {
    id: '10',
    name: 'Coca Cola',
    price: 32.00,
    image: '/cocacola.jpg',
    category: 'Bebidas',
    rating: 4.0,
    description: 'Refresco de cola en botella de 2 litros',
    stock: 100,
    discountPercent: 12
  },
  {
    id: '11',
    name: 'Agua Mineral',
    price: 15.00,
    image: '/topochico.jpeg',
    category: 'Bebidas',
    rating: 4.3,
    description: 'Agua mineral natural sin gas',
    stock: 150
  },
  {
    id: '12',
    name: 'Pollo',
    price: 110.00,
    image: '/pollopechuga.jpeg',
    category: 'Carnes',
    rating: 4.7,
    description: 'Pollo entero fresco de granja',
    stock: 25,
    discountPercent: 18
  },
  {
    id: '13',
    name: 'Bistec de Res',
    price: 140.00,
    image: '/bistec.jpg',
    category: 'Carnes',
    rating: 4.8,
    description: 'Bistec de res de primera calidad',
    stock: 15,
    discountPercent: 10
  },
  {
    id: '14',
    name: 'Costillas',
    price: 125.00,
    image: '/costillas.jpeg',
    category: 'Carnes',
    rating: 4.6,
    description: 'Costillas de cerdo para asar',
    stock: 20
  },
  {
    id: '15',
    name: 'Plátano',
    price: 18.00,
    image: '/platano.png',
    category: 'Frutas',
    rating: 4.5,
    description: 'Plátano maduro y fresco',
    stock: 100,
    discountPercent: 5
  },
  {
    id: '16',
    name: 'Sandía',
    price: 35.00,
    image: '/sandia.jpg',
    category: 'Frutas',
    rating: 4.4,
    description: 'Sandía jugosa y dulce',
    stock: 25
  },
  {
    id: '17',
    name: 'Queso para Fundir',
    price: 85.00,
    image: '/quesofundir.jpeg',
    category: 'Lácteos',
    rating: 4.6,
    description: 'Queso ideal para fundir en sus platillos',
    stock: 30,
    discountPercent: 15
  },
  {
    id: '18',
    name: 'Monster Energy',
    price: 38.00,
    image: '/monster.jpg',
    category: 'Bebidas',
    rating: 4.1,
    description: 'Bebida energética Monster',
    stock: 40
  },
  {
    id: '19',
    name: 'Limpiador de Pisos',
    price: 28.00,
    image: '/fabuloso_pisos.jpeg',
    category: 'Limpieza',
    rating: 4.3,
    description: 'Limpiador multiusos con aroma fresco',
    stock: 55,
    discountPercent: 7
  },
  {
    id: '20',
    name: 'Cloro',
    price: 18.50,
    image: '/cloro.webp',
    category: 'Limpieza',
    rating: 4.2,
    description: 'Cloro desinfectante para el hogar',
    stock: 60
  }
];

// Categorías disponibles
const initialCategories = [
  'Lácteos', 
  'Panadería', 
  'Frutas', 
  'Verduras', 
  'Abarrotes', 
  'Conservas', 
  'Limpieza', 
  'Hogar', 
  'Bebidas', 
  'Carnes'
];

// Crear store con persistencia
export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      categories: initialCategories,
      
      // Añadir un nuevo producto
      addProduct: (product) => {
        const currentProducts = get().products;
        
        // Si no hay ID, generar uno
        if (!product.id) {
          const maxId = Math.max(...currentProducts.map(p => parseInt(p.id) || 0));
          product.id = (maxId + 1).toString();
        }
        
        // Verificar si el producto está agotado
        product.isOutOfStock = product.stock <= 0;
        
        set({ products: [...currentProducts, product] });
      },
      
      // Actualizar un producto existente
      updateProduct: (id, updatedProduct) => {
        const currentProducts = get().products;
        
        // Verificar si el producto está agotado
        updatedProduct.isOutOfStock = updatedProduct.stock <= 0;
        
        set({
          products: currentProducts.map(product => 
            product.id === id ? { ...updatedProduct, id } : product
          )
        });
      },
      
      // Eliminar un producto
      deleteProduct: (id) => {
        const currentProducts = get().products;
        set({
          products: currentProducts.filter(product => product.id !== id)
        });
      },
      
      // Obtener un producto por su ID
      getProductById: (id) => {
        return get().products.find(product => product.id === id);
      },
      
      // Obtener productos por categoría
      getProductsByCategory: (category) => {
        return category 
          ? get().products.filter(product => product.category === category)
          : get().products;
      },
      
      // Obtener productos destacados (con descuentos o los primeros n productos)
      getFeaturedProducts: (limit?: number) => {
        const products = get().products;
        
        // Primero buscamos productos con descuento
        const discountedProducts = products.filter(product => product.discountPercent && product.discountPercent > 0);
        
        // Si hay suficientes productos con descuento, los devolvemos
        if (discountedProducts.length >= (limit || 4)) {
          return discountedProducts.slice(0, limit || 4);
        }
        
        // Si no hay suficientes con descuento, agregamos productos normales hasta alcanzar el límite
        const normalProducts = products.filter(product => !product.discountPercent || product.discountPercent === 0);
        const result = [...discountedProducts];
        
        // Rellenamos el resto con productos normales
        const remaining = (limit || 4) - discountedProducts.length;
        if (remaining > 0 && normalProducts.length > 0) {
          result.push(...normalProducts.slice(0, remaining));
        }
        
        return result;
      },
      
      // Buscar productos por término
      searchProducts: (term) => {
        const searchTerm = term.toLowerCase();
        return get().products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      }
    }),
    {
      name: 'minisuperweb-products', // nombre para localStorage
    }
  )
);
