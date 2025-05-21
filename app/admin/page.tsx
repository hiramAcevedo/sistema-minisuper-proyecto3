'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useAuthStore } from '../../store/authStore';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuthStore();
  
  return (
    <ProtectedRoute adminOnly>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Panel de Administración
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bienvenido, {user?.name}. Gestiona tu tienda desde aquí.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {/* Sidebar izquierdo */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6" fontWeight="bold">
                  Menú de Administración
                </Typography>
              </Box>
              <List component="nav">
                <ListItem sx={{ cursor: 'pointer', bgcolor: 'action.selected' }}>
                  <ListItemIcon>
                    <DashboardIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                
                <Link href="/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem sx={{ cursor: 'pointer' }}>
                    <ListItemIcon>
                      <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Productos" />
                  </ListItem>
                </Link>
                
                <ListItem sx={{ cursor: 'pointer' }}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pedidos" />
                </ListItem>
                
                <ListItem sx={{ cursor: 'pointer' }}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clientes" />
                </ListItem>
                
                <ListItem sx={{ cursor: 'pointer' }}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Configuración" />
                </ListItem>
                
                <Divider />
                
                <ListItem sx={{ cursor: 'pointer' }}>
                  <ListItemIcon>
                    <StorefrontIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ver tienda" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          {/* Contenido principal */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={3}>
              {/* Tarjetas de resumen */}
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Total Ventas
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      $1,250.00
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +15% este mes
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Pedidos Nuevos
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      18
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +8 respecto a ayer
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Usuarios Nuevos
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      32
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +5 esta semana
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Productos
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      246
                    </Typography>
                    <Typography variant="body2" color="warning.main">
                      12 con bajo stock
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Tabla de Pedidos Recientes */}
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 3, borderRadius: 2, mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Pedidos Recientes
                    </Typography>
                    <Button variant="outlined" size="small">
                      Ver todos
                    </Button>
                  </Box>
                  
                  <Box sx={{ overflowX: 'auto' }}>
                    <Box component="table" sx={{ minWidth: 650, width: '100%', borderCollapse: 'collapse' }}>
                      <Box component="thead" sx={{ bgcolor: 'grey.100' }}>
                        <Box component="tr">
                          <Box component="th" sx={{ p: 2, textAlign: 'left' }}>Pedido ID</Box>
                          <Box component="th" sx={{ p: 2, textAlign: 'left' }}>Cliente</Box>
                          <Box component="th" sx={{ p: 2, textAlign: 'left' }}>Fecha</Box>
                          <Box component="th" sx={{ p: 2, textAlign: 'left' }}>Estado</Box>
                          <Box component="th" sx={{ p: 2, textAlign: 'right' }}>Total</Box>
                        </Box>
                      </Box>
                      <Box component="tbody">
                        {[
                          { id: 'ORD-5124', customer: 'María García', date: '2023-06-12', status: 'Completado', total: 145.99 },
                          { id: 'ORD-5123', customer: 'Juan Pérez', date: '2023-06-11', status: 'En proceso', total: 89.50 },
                          { id: 'ORD-5122', customer: 'Ana Rodríguez', date: '2023-06-10', status: 'Enviado', total: 220.75 },
                          { id: 'ORD-5121', customer: 'Carlos López', date: '2023-06-09', status: 'Completado', total: 54.25 },
                          { id: 'ORD-5120', customer: 'Luisa Martínez', date: '2023-06-08', status: 'Cancelado', total: 98.00 },
                        ].map((order, index) => (
                          <Box 
                            component="tr" 
                            key={order.id}
                            sx={{ 
                              borderBottom: '1px solid',
                              borderColor: 'divider',
                              '&:last-child': { border: 0 }
                            }}
                          >
                            <Box component="td" sx={{ p: 2 }}>{order.id}</Box>
                            <Box component="td" sx={{ p: 2 }}>{order.customer}</Box>
                            <Box component="td" sx={{ p: 2 }}>{order.date}</Box>
                            <Box component="td" sx={{ p: 2 }}>
                              <Box 
                                sx={{ 
                                  display: 'inline-block',
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: 1,
                                  fontSize: '0.75rem',
                                  fontWeight: 'medium',
                                  bgcolor: 
                                    order.status === 'Completado' ? 'success.light' : 
                                    order.status === 'En proceso' ? 'info.light' :
                                    order.status === 'Enviado' ? 'primary.light' :
                                    'error.light',
                                  color: 
                                    order.status === 'Completado' ? 'success.dark' : 
                                    order.status === 'En proceso' ? 'info.dark' :
                                    order.status === 'Enviado' ? 'primary.dark' :
                                    'error.dark',
                                }}
                              >
                                {order.status}
                              </Box>
                            </Box>
                            <Box component="td" sx={{ p: 2, textAlign: 'right' }}>${order.total.toFixed(2)}</Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ProtectedRoute>
  );
} 