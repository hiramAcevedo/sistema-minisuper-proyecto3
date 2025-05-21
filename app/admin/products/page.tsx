'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  Alert,
  Snackbar,
  Avatar,
  SelectChangeEvent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import { useProductStore, Product } from '../../../store/productStore';

export default function ProductsAdminPage() {
  // Usar el store global de productos
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProductStore();
  
  // Estado para la UI
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Estado para el formulario
  const emptyProduct: Product = {
    id: '',
    name: '',
    price: 0,
    image: '/dogactually.webp',
    category: '',
    rating: 5,
    description: '',
    stock: 0,
    discountPercent: 0
  };
  
  const [formData, setFormData] = useState<Product>(emptyProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar productos
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  // Manejadores para el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Actualizar producto existente usando la función del store
      updateProduct(formData.id, formData);
      setSnackbarMessage('Producto actualizado correctamente');
    } else {
      // Crear nuevo producto usando la función del store
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
      };
      addProduct(newProduct);
      setSnackbarMessage('Producto creado correctamente');
    }
    
    // Reset form
    setFormData(emptyProduct);
    setIsEditing(false);
    setOpenSnackbar(true);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      // Eliminar producto usando la función del store
      deleteProduct(deleteId);
      setOpenDialog(false);
      setDeleteId(null);
      setSnackbarMessage('Producto eliminado correctamente');
      setOpenSnackbar(true);
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setFormData(emptyProduct);
    setIsEditing(false);
  };

  return (
    <ProtectedRoute adminOnly>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Link href="/admin" style={{ textDecoration: 'none', marginRight: 2 }}>
            <IconButton color="primary" aria-label="volver">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {isEditing ? 'Editar Producto' : 'Gestión de Inventario'}
          </Typography>
        </Box>

        {/* Formulario de producto */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  {isEditing ? `Editando: ${formData.name}` : 'Nuevo Producto'}
                </Typography>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Nombre del Producto"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  required
                  label="Precio"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="Descuento (%)"
                  name="discountPercent"
                  type="number"
                  value={formData.discountPercent || 0}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-label">Categoría</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category}
                    onChange={handleSelectChange}
                    label="Categoría"
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  required
                  label="Stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="image-label">Imagen</InputLabel>
                  <Select
                    labelId="image-label"
                    name="image"
                    value={formData.image}
                    onChange={handleSelectChange}
                    label="Imagen"
                  >
                    <MenuItem value="/dogactually.webp">Imagen por defecto</MenuItem>
                    <MenuItem value="/leche1.webp">Leche</MenuItem>
                    <MenuItem value="/panela.webp">Pan</MenuItem>
                    <MenuItem value="/huevo.jpeg">Huevos</MenuItem>
                    <MenuItem value="/manzana.avif">Manzanas</MenuItem>
                    <MenuItem value="/arroz.jpg">Arroz</MenuItem>
                    <MenuItem value="/tortillas.jpeg">Tortillas</MenuItem>
                    <MenuItem value="/creama1.webp">Crema</MenuItem>
                    <MenuItem value="/jabon_polvo.webp">Jabón</MenuItem>
                    <MenuItem value="/mini_escoba.jpeg">Escoba</MenuItem>
                    <MenuItem value="/cocacola.jpg">Coca Cola</MenuItem>
                    <MenuItem value="/topochico.jpeg">Agua</MenuItem>
                    <MenuItem value="/pollopechuga.jpeg">Pollo</MenuItem>
                    <MenuItem value="/bistec.jpg">Bistec</MenuItem>
                    <MenuItem value="/costillas.jpeg">Costillas</MenuItem>
                    <MenuItem value="/platano.png">Plátano</MenuItem>
                    <MenuItem value="/sandia.jpg">Sandía</MenuItem>
                    <MenuItem value="/quesofundir.jpeg">Queso</MenuItem>
                    <MenuItem value="/monster.jpg">Monster</MenuItem>
                    <MenuItem value="/fabuloso_pisos.jpeg">Limpiador</MenuItem>
                    <MenuItem value="/cloro.webp">Cloro</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
                
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={formData.image || '/dogactually.webp'}
                    alt="Vista previa"
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Vista previa de la imagen
                  </Typography>
                </Box>
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color={isEditing ? "primary" : "success"}
                    startIcon={isEditing ? <EditIcon /> : <AddIcon />}
                    size="large"
                  >
                    {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                  </Button>
                  
                  {isEditing && (
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Lista de productos */}
        <Paper elevation={0} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold">
              Lista de Productos ({filteredProducts.length})
            </Typography>
            
            <TextField
              placeholder="Buscar productos..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" py={3}>
                        No se encontraron productos
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Avatar 
                          src={product.image || '/dogactually.webp'}
                          alt={product.name}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell align="right">
                        {product.discountPercent ? (
                          <Box>
                            <Typography 
                              component="span" 
                              sx={{ 
                                textDecoration: 'line-through', 
                                color: 'text.secondary', 
                                fontSize: '0.8rem',
                                mr: 1
                              }}
                            >
                              ${product.price.toFixed(2)}
                            </Typography>
                            <Typography component="span" color="error.main" fontWeight="bold">
                              ${(product.price * (1 - product.discountPercent/100)).toFixed(2)}
                            </Typography>
                          </Box>
                        ) : (
                          `$${product.price.toFixed(2)}`
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ 
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 'medium',
                          bgcolor: product.stock > 10 ? 'success.light' : product.stock > 0 ? 'warning.light' : 'error.light',
                          color: product.stock > 10 ? 'success.dark' : product.stock > 0 ? 'warning.dark' : 'error.dark',
                        }}>
                          {product.stock}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <IconButton 
                            color="primary" 
                            size="small"
                            onClick={() => handleEdit(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => handleDelete(product.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        {/* Diálogo de confirmación de eliminación */}
        <Dialog
          open={openDialog}
          onClose={cancelDelete}
        >
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete}>Cancelar</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Snackbar para notificaciones */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity="success" 
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ProtectedRoute>
  );
} 