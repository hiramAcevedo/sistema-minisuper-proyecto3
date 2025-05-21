'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuthStore, authenticateUser } from '../../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isAdmin } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Comprobar si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      redirectUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  
  // Función para redireccionar al usuario según su rol o página guardada
  const redirectUser = () => {
    // Verificar si hay una ruta guardada en sessionStorage
    const savedRoute = sessionStorage.getItem('redirectAfterLogin');
    
    if (savedRoute) {
      // Limpiar la ruta guardada
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(savedRoute);
    } else {
      // Redireccionar según el rol
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el error al cambiar los datos
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      // Intentar autenticar con los datos proporcionados
      const user = authenticateUser(formData.email, formData.password);
      
      if (user) {
        // Almacenar el usuario autenticado en el store
        login(user);
        // La redirección se manejará en el useEffect
      } else {
        setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
      }
      
      setIsLoading(false);
    }, 1000); // Simular retardo de red
  };

  // Información de demostración para simplificar el inicio de sesión
  const demoAccounts = [
    { type: 'Administrador', email: 'admin@minisuperweb.com', password: 'admin123' },
    { type: 'Usuario', email: 'usuario@minisuperweb.com', password: 'usuario123' }
  ];

  const fillDemoCredentials = (type: 'Administrador' | 'Usuario') => {
    const account = demoAccounts.find(acc => acc.type === type);
    if (account) {
      setFormData({
        email: account.email,
        password: account.password
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Iniciar Sesión
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ingresa tus credenciales para acceder a tu cuenta
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Cuentas de demostración
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => fillDemoCredentials('Administrador')}
            color="primary"
          >
            Como Administrador
          </Button>
          <Button
            variant="outlined"
            onClick={() => fillDemoCredentials('Usuario')}
            color="secondary"
          >
            Como Cliente
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          ¿No tienes una cuenta? <Link href="/register" style={{ color: 'primary.main' }}>Regístrate</Link>
        </Typography>
      </Paper>
    </Container>
  );
} 