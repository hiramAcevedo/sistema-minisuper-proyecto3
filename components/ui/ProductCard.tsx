'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  CardActionArea,
  Rating,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCartStore, CartItem } from '../../store/cartStore';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  discountPercent?: number;
  isOutOfStock?: boolean;
  variant?: string;
};

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { id, name, price, image, rating, category, discountPercent, isOutOfStock } = product;

  const originalPrice = price;
  const discountedPrice = discountPercent ? price * (1 - discountPercent / 100) : price;
  const hasDiscount = discountPercent && discountPercent > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) return;
    
    const cartItem: CartItem = {
      id,
      name,
      price: discountedPrice,
      quantity: 1,
      image,
      variant: product.variant
    };
    
    addItem(cartItem);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }
        }}
      >
        <Link href={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardActionArea>
            <Box
              sx={{
                position: 'relative',
                height: compact ? 140 : 200,
                backgroundColor: 'grey.100',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <Image
                src={image}
                alt={name}
                width={compact ? 100 : 160}
                height={compact ? 100 : 160}
                style={{
                  objectFit: 'contain'
                }}
              />
              
              {/* Badges */}
              {hasDiscount && (
                <Chip
                  label={`-${discountPercent}%`}
                  color="error"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    fontWeight: 'bold'
                  }}
                />
              )}
              
              {isOutOfStock && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    p: 0.5,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Agotado
                  </Typography>
                </Box>
              )}
            </Box>
            
            <CardContent sx={{ flexGrow: 1, p: compact ? 1.5 : 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {category}
              </Typography>
              
              <Typography 
                variant={compact ? "body1" : "h6"} 
                component="h2" 
                fontWeight="medium"
                sx={{
                  mb: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {name}
              </Typography>
              
              {!compact && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating 
                    value={rating} 
                    precision={0.5} 
                    size="small" 
                    readOnly 
                  />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    ({rating})
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
                <Typography 
                  variant={compact ? "h6" : "h5"} 
                  component="span" 
                  fontWeight="bold"
                  color={hasDiscount ? "error.main" : "text.primary"}
                >
                  ${discountedPrice.toFixed(2)}
                </Typography>
                
                {hasDiscount && (
                  <Typography 
                    variant="body2" 
                    component="span" 
                    sx={{ ml: 1, textDecoration: 'line-through' }}
                    color="text.secondary"
                  >
                    ${originalPrice.toFixed(2)}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
        
        <CardActions sx={{ p: compact ? 1 : 2, pt: 0 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            fullWidth
            size={compact ? "small" : "medium"}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            sx={{
              borderRadius: 6,
              textTransform: 'none'
            }}
          >
            {isOutOfStock ? 'Agotado' : 'Agregar'}
          </Button>
        </CardActions>
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
          {name} agregado al carrito
        </Alert>
      </Snackbar>
    </>
  );
} 