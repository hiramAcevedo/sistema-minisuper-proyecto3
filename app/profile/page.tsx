'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  Avatar, 
  Tabs, 
  Tab, 
  Button, 
  TextField, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HistoryIcon from '@mui/icons-material/History';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useAuthStore } from '../../store/authStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ paddingTop: '24px', paddingBottom: '24px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil
    alert('Perfil actualizado correctamente');
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Sección izquierda: Datos del perfil */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Avatar 
                  src={user?.avatar || undefined} 
                  alt={user?.name || 'Usuario'} 
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} 
                />
                <Typography variant="h5" component="h1" gutterBottom>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {user?.email}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'inline-block',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: user?.role === 'admin' ? 'error.light' : 'primary.light',
                    color: user?.role === 'admin' ? 'error.dark' : 'primary.dark',
                  }}
                >
                  {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
                </Typography>
              </Box>
            </Card>

            <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <List component="nav">
                <ListItem sx={{ cursor: 'pointer', bgcolor: tabValue === 0 ? 'action.selected' : undefined }} onClick={() => setTabValue(0)}>
                  <ListItemIcon>
                    <AccountCircleIcon color={tabValue === 0 ? 'primary' : undefined} />
                  </ListItemIcon>
                  <ListItemText primary="Mi Perfil" />
                </ListItem>
                
                <ListItem sx={{ cursor: 'pointer', bgcolor: tabValue === 1 ? 'action.selected' : undefined }} onClick={() => setTabValue(1)}>
                  <ListItemIcon>
                    <ShoppingBasketIcon color={tabValue === 1 ? 'primary' : undefined} />
                  </ListItemIcon>
                  <ListItemText primary="Mis Pedidos" />
                </ListItem>
                
                <ListItem sx={{ cursor: 'pointer', bgcolor: tabValue === 2 ? 'action.selected' : undefined }} onClick={() => setTabValue(2)}>
                  <ListItemIcon>
                    <FavoriteIcon color={tabValue === 2 ? 'primary' : undefined} />
                  </ListItemIcon>
                  <ListItemText primary="Favoritos" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          {/* Sección derecha: Contenido de las pestañas */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="perfil de usuario">
                  <Tab label="Perfil" />
                  <Tab label="Pedidos" />
                  <Tab label="Favoritos" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Datos Personales
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        value={profileForm.name}
                        onChange={handleFormChange}
                        margin="normal"
                      />
                    </Grid>
                    
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleFormChange}
                        margin="normal"
                      />
                    </Grid>
                    
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type="password"
                        placeholder="Introduce para cambiar la contraseña"
                        margin="normal"
                      />
                    </Grid>
                    
                    <Grid size={{ xs: 12 }}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }}
                      >
                        Guardar Cambios
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Historial de Pedidos
                </Typography>
                
                {[1, 2, 3].map((order) => (
                  <Card key={order} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Pedido #{order}00{Math.floor(Math.random() * 100)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(2023, 5 + order, 10 + order).toLocaleDateString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            {order === 1 ? 'Entregado' : order === 2 ? 'En camino' : 'Procesando'}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                          ${(80 * order).toFixed(2)}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Typography variant="body2" color="text.secondary">
                        {order * 2} productos
                      </Typography>
                      
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ mt: 1 }}
                      >
                        Ver detalles
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Productos Favoritos
                </Typography>
                
                {[1, 2, 3, 4].map((favorite) => (
                  <Card key={favorite} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
                    <Box sx={{ display: 'flex', p: 2 }}>
                      <Box sx={{ width: 60, height: 60, bgcolor: 'grey.100', borderRadius: 1, mr: 2 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          Producto favorito {favorite}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Descripción del producto favorito {favorite}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
                            ${(15 * favorite).toFixed(2)}
                          </Typography>
                          <Button 
                            variant="contained" 
                            size="small"
                          >
                            Agregar al carrito
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ProtectedRoute>
  );
} 