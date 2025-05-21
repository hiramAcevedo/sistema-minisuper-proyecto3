'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Badge,
  Stack,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCartStore } from '../../store/cartStore';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, removeItem } = useCartStore();
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100%'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Tu carrito ({totalItems})
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      {items.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4, 
          height: '50vh', 
          textAlign: 'center' 
        }}>
          <ShoppingBagIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Añade productos para comenzar tu compra
          </Typography>
          <Button 
            component={Link} 
            href="/products" 
            variant="outlined" 
            onClick={onClose}
            sx={{ mt: 2 }}
          >
            Ver productos
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
            {items.map((item) => (
              <Box key={item.id} sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    bgcolor: 'grey.100', 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={45}
                      height={45}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" fontWeight="medium" noWrap sx={{ maxWidth: 180 }}>
                        {item.name}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => removeItem(item.id)}
                        sx={{ ml: 1, color: 'text.secondary' }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    {item.variant && (
                      <Typography variant="body2" color="text.secondary">
                        {item.variant}
                      </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </List>
          
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" fontWeight="medium">
                Subtotal
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
              Los impuestos y gastos de envío se calcularán en el checkout
            </Typography>
            
            <Stack spacing={1}>
              <Button 
                component={Link} 
                href="/cart" 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={onClose}
                sx={{ borderRadius: 2 }}
              >
                Ir al carrito
              </Button>
              <Button 
                component={Link} 
                href="/products" 
                variant="outlined" 
                fullWidth
                onClick={onClose}
                sx={{ borderRadius: 2 }}
              >
                Seguir comprando
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Drawer>
  );
} 