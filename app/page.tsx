'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Stack,
  Chip,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useCartStore, CartItem } from '../store/cartStore';

// Imágenes para el carousel
const carouselImages = [
  {
    src: '/dogactually.webp',
    alt: 'Promoción de apertura',
    title: '¡Bienvenidos a MiniSuper!',
    subtitle: 'Encuentra todo lo que necesitas en un solo lugar',
  },
  {
    src: '/dogactually.webp',
    alt: 'Productos frescos',
    title: 'Productos frescos todos los días',
    subtitle: 'Calidad garantizada en frutas y verduras',
  },
  {
    src: '/dogactually.webp',
    alt: 'Entrega a domicilio',
    title: 'Entrega a domicilio',
    subtitle: 'Recibe tus compras sin salir de casa',
  }
];

// Productos destacados
const featuredProducts = [
  {
    id: '1',
    title: 'Leche Entera',
    price: 24.50,
    image: '/dogactually.webp',
    discount: 10
  },
  {
    id: '4',
    title: 'Manzanas',
    price: 45.50,
    image: '/dogactually.webp',
    discount: 20
  },
  {
    id: '12',
    title: 'Pollo',
    price: 110.00,
    image: '/dogactually.webp',
    discount: 15
  },
  {
    id: '7',
    title: 'Atún en Aceite',
    price: 22.00,
    image: '/dogactually.webp',
    discount: 5
  }
];

// Componente de Carousel
const Carousel = ({ images }: { images: typeof carouselImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box 
      sx={{
        position: 'relative',
        height: {xs: '300px', md: '500px'},
        overflow: 'hidden',
        borderRadius: 4,
        mb: 6
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            bgcolor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={300}
            style={{ objectFit: 'contain' }}
          />
          <Box 
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: 4,
              color: 'white'
            }}
          >
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
              {image.title}
            </Typography>
            <Typography variant="h6">
              {image.subtitle}
            </Typography>
          </Box>
        </Box>
      ))}
      
      <Box 
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 12,
              height: 12,
              bgcolor: index === currentIndex ? 'primary.main' : 'white',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Componente de tarjeta de producto destacado
const FeaturedProductCard = ({ product }: { product: typeof featuredProducts[0] }) => {
  const { addItem } = useCartStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const discountedPrice = product.price - (product.price * product.discount / 100);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: discountedPrice,
      quantity: 1,
      image: product.image,
    };
    
    addItem(cartItem);
    setOpenSnackbar(true);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  return (
    <>
      <Card sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
        <CardActionArea component={Link} href={`/products/${product.id}`}>
          <Box sx={{ position: 'relative', pt: '100%', bgcolor: 'grey.50' }}>
            <CardMedia
              component="div"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={150}
                style={{ objectFit: 'contain' }}
              />
            </CardMedia>
            
            {product.discount > 0 && (
              <Chip
                label={`-${product.discount}%`}
                color="error"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  fontWeight: 'bold'
                }}
              />
            )}
          </Box>
          
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom noWrap>
              {product.title}
            </Typography>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                ${discountedPrice.toFixed(2)}
              </Typography>
              
              {product.discount > 0 && (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </CardActionArea>
        
        <Box sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<ShoppingCartIcon />} 
            sx={{ borderRadius: 2 }}
            onClick={handleAddToCart}
          >
            Agregar
          </Button>
        </Box>
      </Card>
      
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
    </>
  );
};

export default function Home() {
  return (
    <Box>
      {/* Hero section con carousel */}
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        <Carousel images={carouselImages} />
        
        {/* Sección de ventajas */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                height: '100%',
                borderRadius: 3,
                bgcolor: 'primary.light',
                color: 'white'
              }}
            >
              <StorefrontIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Amplio surtido
              </Typography>
              <Typography variant="body2">
                Todo lo que necesitas en un solo lugar
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                height: '100%',
                borderRadius: 3,
                bgcolor: 'success.light',
                color: 'white'
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Precios bajos
              </Typography>
              <Typography variant="body2">
                Ofertas y promociones todos los días
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                height: '100%',
                borderRadius: 3,
                bgcolor: 'info.light',
                color: 'white'
              }}
            >
              <DeliveryDiningIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Entrega rápida
              </Typography>
              <Typography variant="body2">
                Tus productos en menos de 60 minutos
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                height: '100%',
                borderRadius: 3,
                bgcolor: 'warning.light',
                color: 'white'
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Fácil compra
              </Typography>
              <Typography variant="body2">
                Proceso de compra sencillo y seguro
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Sección de productos destacados */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Productos destacados
            </Typography>
            <Button 
              component={Link} 
              href="/products" 
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Ver todos
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {featuredProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 6, sm: 6, md: 3 }}>
                <FeaturedProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Banner promocional */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            borderRadius: 3, 
            mb: 8,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            ¡50% de descuento en tu primera compra!
          </Typography>
          <Typography variant="h6" paragraph>
            Usa el código BIENVENIDO50 al finalizar tu compra
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            component={Link}
            href="/products"
            sx={{ 
              mt: 2, 
              bgcolor: 'white', 
              color: '#FE6B8B', 
              fontWeight: 'bold',
              px: 4,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            Comprar ahora
          </Button>
        </Paper>
        
        {/* Sección de categorías */}
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom mb={4}>
            Explora por categorías
          </Typography>
          
          <Grid container spacing={2}>
            {['Lácteos', 'Frutas', 'Carnes', 'Abarrotes', 'Bebidas', 'Limpieza'].map((category) => (
              <Grid key={category} size={{ xs: 6, sm: 4, md: 2 }}>
                <Paper 
                  component={Link} 
                  href={`/products?category=${category}`}
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                    color: 'text.primary',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    },
                    display: 'block'
                  }}
                >
                  <Typography variant="h6" component="h3">
                    {category}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
} 