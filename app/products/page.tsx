'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Rating,
  Chip,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../../components/ui/ProductCard';
import { Product } from '../../components/ui/ProductCard';

// Datos de ejemplo para productos
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Leche Entera',
    price: 24.50,
    image: '/dogactually.webp',
    category: 'Lácteos',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Pan Integral',
    price: 35.00,
    image: '/dogactually.webp',
    category: 'Panadería',
    rating: 4.3
  },
  {
    id: '3',
    name: 'Huevos',
    price: 48.00,
    image: '/dogactually.webp',
    category: 'Lácteos',
    rating: 4.8
  },
  {
    id: '4',
    name: 'Manzanas',
    price: 45.50,
    image: '/dogactually.webp',
    category: 'Frutas',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Arroz',
    price: 28.00,
    image: '/dogactually.webp',
    category: 'Abarrotes',
    rating: 4.7
  },
  {
    id: '6',
    name: 'Pasta',
    price: 18.50,
    image: '/dogactually.webp',
    category: 'Abarrotes',
    rating: 4.4
  },
  {
    id: '7',
    name: 'Atún en Aceite',
    price: 22.00,
    image: '/dogactually.webp',
    category: 'Conservas',
    rating: 4.2
  },
  {
    id: '8',
    name: 'Jabón para Ropa',
    price: 55.00,
    image: '/dogactually.webp',
    category: 'Limpieza',
    rating: 4.1
  },
  {
    id: '9',
    name: 'Papel Higiénico',
    price: 65.00,
    image: '/dogactually.webp',
    category: 'Hogar',
    rating: 4.9
  },
  {
    id: '10',
    name: 'Refresco de Cola',
    price: 32.00,
    image: '/dogactually.webp',
    category: 'Bebidas',
    rating: 4.0
  },
  {
    id: '11',
    name: 'Agua Mineral',
    price: 15.00,
    image: '/dogactually.webp',
    category: 'Bebidas',
    rating: 4.3
  },
  {
    id: '12',
    name: 'Pollo',
    price: 110.00,
    image: '/dogactually.webp',
    category: 'Carnes',
    rating: 4.7
  }
];

// Categorías disponibles (extraídas de los productos)
const categories = [...new Set(sampleProducts.map(product => product.category))];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtrar productos por categoría y término de búsqueda
  useEffect(() => {
    let result = products;
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" align="center" gutterBottom mb={4}>
        Nuestros Productos
      </Typography>
        
      <Paper 
        elevation={0} 
        sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.paper' }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{ bgcolor: 'background.paper' }}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-select-label">Categoría</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as string)}
                label="Categoría"
              >
                <MenuItem value="">Todas las categorías</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

        {filteredProducts.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 5, 
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'background.paper' 
          }}
        >
          <Typography variant="h5" gutterBottom>
            No se encontraron productos
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
              Intenta cambiar tus filtros o términos de búsqueda.
          </Typography>
          <Button
            variant="contained"
              onClick={() => {
                setSelectedCategory('');
                setSearchTerm('');
              }}
            sx={{ mt: 2 }}
            >
              Ver todos los productos
          </Button>
        </Paper>
        ) : (
        <Grid container spacing={3}>
            {filteredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
            ))}
        </Grid>
        )}
    </Container>
  );
} 