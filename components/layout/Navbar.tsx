'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Container,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import CartDrawer from '../ui/CartDrawer';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  
  // Estados de Zustand
  const { totalItems } = useCartStore();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();

  // Sincronizar el carrito con el usuario autenticado
  useEffect(() => {
    // Ejecutar la lógica de sincronización
    const { userId, setUserId } = useCartStore.getState();
    
    if (isAuthenticated && user && userId !== user.id) {
      setUserId(user.id);
    } else if (!isAuthenticated && userId !== null) {
      setUserId(null);
    }
  }, [isAuthenticated, user]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
  
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCartDrawerOpen(true);
  };

  // Enlaces de navegación
  const navLinks = [
    { title: 'Inicio', path: '/' },
    { title: 'Productos', path: '/products' },
    { title: 'Quiénes Somos', path: '/about' },
    { title: 'Preguntas Frecuentes', path: '/faq' },
    { title: 'Contacto', path: '/contact' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        color="primary"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          boxShadow: 3,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: { xs: 1, md: 1.5 } }}>
            {/* Logo con imagen */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1
              }}
            >
              <Link 
                href="/" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  textDecoration: 'none' 
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                    <Image 
                      src="/dogactually.webp"
                      alt="MiniSuper Logo"
                      width={40}
                      height={40}
                      style={{ 
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                      priority
                    />
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="div" 
                    sx={{ fontWeight: 'bold', color: 'white' }}
                  >
                    MiniSuper
                  </Typography>
                </Box>
              </Link>
            </Box>

            {/* Enlaces de navegación en pantallas medianas y grandes */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  style={{ textDecoration: 'none' }}
                >
                  <Button 
                    color="inherit" 
                    sx={{ 
                      mx: 0.5,
                      fontSize: '1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    {link.title}
                  </Button>
                </Link>
              ))}
              
              {/* Botón de carrito de compras con badge */}
              <IconButton 
                color="inherit"
                aria-label="carrito de compras"
                sx={{ ml: 1 }}
                onClick={handleCartClick}
              >
                <Badge badgeContent={totalItems} color="error" max={99}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Botón de usuario/login */}
              {isAuthenticated ? (
                <>
                  <IconButton 
                    color="inherit"
                    aria-label="perfil de usuario"
                    onClick={handleMenuClick}
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      src={user?.avatar || undefined} 
                      alt={user?.name || 'Usuario'} 
                      sx={{ width: 32, height: 32 }} 
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem sx={{ pointerEvents: 'none' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {user?.name}
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ pointerEvents: 'none', color: 'primary.main' }}>
                      <Typography variant="body2">
                        {isAdmin ? 'Administrador' : 'Cliente'}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <MenuItem onClick={handleMenuClose}>
                        Mi Perfil
                      </MenuItem>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <MenuItem onClick={handleMenuClose}>
                          Panel de Admin
                        </MenuItem>
                      </Link>
                    )}
                    <MenuItem onClick={handleLogout}>
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outlined" 
                    color="inherit"
                    startIcon={<PersonIcon />}
                    sx={{ 
                      ml: 1,
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </Box>

            {/* Botón de menú móvil */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              {/* Carrito para móvil */}
              <IconButton 
                color="inherit"
                aria-label="carrito de compras"
                sx={{ mr: 1 }}
                onClick={handleCartClick}
              >
                <Badge badgeContent={totalItems} color="error" max={99}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              
              <IconButton 
                color="inherit" 
                aria-label="menu"
                onClick={toggleDrawer}
              >
                {/* Icono de menú hamburguesa nativo de MUI */}
                <span style={{fontSize: 28, fontWeight: 'bold'}}>≡</span>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menú móvil (Drawer) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '300px',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleDrawer}>
            <span style={{fontSize: 28, fontWeight: 'bold'}}>×</span>
          </IconButton>
        </Box>
        
        {/* Información de usuario en móvil */}
        {isAuthenticated && (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <Avatar 
              src={user?.avatar || undefined} 
              alt={user?.name || 'Usuario'} 
              sx={{ width: 40, height: 40, mr: 2 }} 
            />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
              <Typography variant="body2">
                {isAdmin ? 'Administrador' : 'Cliente'}
              </Typography>
            </Box>
          </Box>
        )}
        
        <List>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={toggleDrawer}
            >
              <ListItem 
                sx={{
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <ListItemText primary={link.title} />
              </ListItem>
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={toggleDrawer}
              >
                <ListItem 
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                  }}
                >
                  <ListItemText primary="Mi Perfil" />
                </ListItem>
              </Link>
              
              {isAdmin && (
                <Link
                  href="/admin"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={toggleDrawer}
                >
                  <ListItem 
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                  >
                    <ListItemText primary="Panel de Admin" />
                  </ListItem>
                </Link>
              )}
              
              <ListItem 
                onClick={() => {
                  logout();
                  toggleDrawer();
                }}
                sx={{
                  cursor: 'pointer',
                  color: 'error.main',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            </>
          ) : (
            <Link
              href="/login"
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={toggleDrawer}
            >
              <ListItem 
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  mt: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'primary.dark' } 
                }}
              >
                <ListItemText primary="Iniciar Sesión" />
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>
      
      {/* Drawer del carrito de compras */}
      <CartDrawer 
        open={cartDrawerOpen} 
        onClose={() => setCartDrawerOpen(false)} 
      />
      
      {/* Espacio para evitar que el contenido quede detrás del AppBar */}
      <Toolbar />
    </>
  );
} 