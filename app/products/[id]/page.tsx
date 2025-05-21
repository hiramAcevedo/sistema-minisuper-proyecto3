'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Box, 
  Typography, 
  Rating, 
  Paper, 
  Grid, 
  Button, 
  ToggleButton, 
  ToggleButtonGroup, 
  TextField, 
  IconButton, 
  Divider,
  Container,
  Stack,
  Card,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useCartStore, CartItem } from '../../../store/cartStore';

// Tipos para variantes
type Variant = {
  id: string;
  name: string;
};

// Tipos para productos
type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  variants: Variant[];
};

// Simulación del fetch de producto por ID
const getProductById = (id: string): Product => {
  return {
    id,
    title: '1 Kilo de Frijoles',
    description: 'Frijoles de alta calidad, seleccionados cuidadosamente para garantizar el mejor sabor en sus platillos.',
    price: 40,
    image: '/dogactually.webp',
    brand: 'genérica',
    rating: 4.0,
    variants: [
      { id: 'v1', name: 'Frijoles bayos' },
      { id: 'v2', name: 'Frijoles Negros' },
      { id: 'v3', name: 'Frijoles peruanos' },
    ]
  };
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Usado React.use para desenvolver los parámetros que ahora son una promesa en Next.js 15
  const resolvedParams = React.use(params);
  const product = getProductById(resolvedParams.id);
  
  const [selectedVariant, setSelectedVariant] = useState<string | null>('v1');
  const [quantity, setQuantity] = useState(2);
  const [anticipateDelivery, setAnticipateDelivery] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const { addItem } = useCartStore();
  
  const handleVariantChange = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: string | null,
  ) => {
    if (newVariant !== null) {
      setSelectedVariant(newVariant);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    const selectedVariantData = product.variants.find(v => v.id === selectedVariant);
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      image: product.image,
      variant: selectedVariantData?.name
    };
    
    addItem(cartItem);
    setOpenSnackbar(true);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Columna izquierda: Información del producto */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>
              
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  marca: {product.brand}
                </Typography>
                <Rating value={product.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {product.rating.toFixed(1)}
                </Typography>
              </Stack>
              
              <Typography variant="h4" component="p" fontWeight="bold" sx={{ mb: 3 }}>
                ${product.price.toFixed(2)}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  Selecciona uno:
                </Typography>
                <ToggleButtonGroup
                  value={selectedVariant}
                  exclusive
                  onChange={handleVariantChange}
                  aria-label="variantes de producto"
                  sx={{ mb: 2 }}
                >
                  {product.variants.map((variant) => (
                    <ToggleButton 
                      key={variant.id} 
                      value={variant.id}
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        mx: 0.5,
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }
                      }}
                    >
                      {variant.name}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  Cantidad: {quantity}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton onClick={decreaseQuantity} size="small" sx={{ border: 1, borderColor: 'grey.300' }}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1">{quantity}</Typography>
                  <IconButton onClick={increaseQuantity} size="small" sx={{ border: 1, borderColor: 'grey.300' }}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Anticipa tu compra
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => setAnticipateDelivery(!anticipateDelivery)}
                    sx={{ 
                      border: 1, 
                      borderColor: 'grey.300',
                      bgcolor: anticipateDelivery ? 'primary.main' : 'transparent',
                      color: anticipateDelivery ? 'white' : 'inherit',
                      '&:hover': {
                        bgcolor: anticipateDelivery ? 'primary.dark' : 'grey.100',
                      }
                    }}
                  >
                    <CalendarTodayIcon />
                  </IconButton>
                </Stack>
                
                {anticipateDelivery && (
                  <TextField
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                )}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Comentarios
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No hay comentarios todavía. ¡Sé el primero en comentar!
              </Typography>
            </Box>
          </Grid>
          
          {/* Columna derecha: Imagen y botones de acción */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  mb: 3, 
                  flex: 1, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  borderRadius: 4,
                  bgcolor: 'grey.100'
                }}
              >
                <Image 
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Paper>
              
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <IconButton 
                  aria-label="añadir al carrito" 
                  sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton 
                  aria-label="entrega a domicilio" 
                  sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
                >
                  <LocalShippingIcon />
                </IconButton>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<DirectionsCarIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    borderRadius: 2,
                    boxShadow: 2
                  }}
                >
                  Comprar directa
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Sección de descripción y detalles */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Descripción
        </Typography>
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Especificaciones
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Peso:</Typography>
            <Typography variant="body1">1 Kilogramo</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Tipo:</Typography>
            <Typography variant="body1">Frijoles</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Origen:</Typography>
            <Typography variant="body1">Nacional</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Almacenamiento:</Typography>
            <Typography variant="body1">Lugar fresco y seco</Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {product.title} agregado al carrito
        </Alert>
      </Snackbar>
    </Container>
  );
} 