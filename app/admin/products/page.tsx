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

// Definición del tipo de producto para administración
type AdminProduct = {
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

// Productos iniciales para el CRUD (basado en los ejemplos existentes)
const initialProducts: AdminProduct[] = [
  {
    id: '1',
    name: 'Leche Entera',
    price: 24.50,
    image: '/dogactually.webp',
    category: 'Lácteos',
    rating: 4.5,
    description: 'Leche entera de alta calidad',
    stock: 50
  },
  {
    id: '2',
    name: 'Pan Integral',
    price: 35.00,
    image: '/dogactually.webp',
    category: 'Panadería',
    rating: 4.3,
    description: 'Pan integral recién horneado',
    stock: 30
  },
  {
    id: '3',
    name: 'Huevos',
    price: 48.00,
    image: '/dogactually.webp',
    category: 'Lácteos',
    rating: 4.8,
    description: 'Huevos frescos de gallinas de corral',
    stock: 100
  },
  {
    id: '4',
    name: 'Manzanas',
    price: 45.50,
    image: '/dogactually.webp',
    category: 'Frutas',
    rating: 4.6,
    description: 'Manzanas rojas frescas',
    stock: 80
  },
  {
    id: '5',
    name: 'Arroz',
    price: 28.00,
    image: '/dogactually.webp',
    category: 'Abarrotes',
    rating: 4.7,
    description: 'Arroz blanco premium',
    stock: 120
  },
];

// Categorías disponibles
const categories = [
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

export default function ProductsAdminPage() {
  // Estado para los productos
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<AdminProduct[]>(initialProducts);
  
  // Estado para el formulario
  const emptyProduct: AdminProduct = {
    id: '',
    name: '',
    price: 0,
    image: '/dogactually.webp',
    category: '',
    rating: 5,
    description: '',
    stock: 0
  };
  
  const [formData, setFormData] = useState<AdminProduct>(emptyProduct);
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
      // Actualizar producto existente
      const updatedProducts = products.map(product => 
        product.id === formData.id ? formData : product
      );
      setProducts(updatedProducts);
      setSnackbarMessage('Producto actualizado correctamente');
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
      };
      setProducts([...products, newProduct]);
      setSnackbarMessage('Producto creado correctamente');
    }
    
    // Reset form
    setFormData(emptyProduct);
    setIsEditing(false);
    setOpenSnackbar(true);
  };

  const handleEdit = (product: AdminProduct) => {
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
      const updatedProducts = products.filter(product => product.id !== deleteId);
      setProducts(updatedProducts);
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
                <TextField
                  fullWidth
                  label="URL de Imagen"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  helperText="Dejar en blanco para usar la imagen por defecto"
                />
                
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
                      <TableCell align="right">${product.price.toFixed(2)}</TableCell>
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