'use client';

import Link from 'next/link';
import { Box, Container, Grid, Typography, IconButton, Stack, Divider } from '@mui/material';

// Iconos simplificados con tamaño controlado
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.049 1.054-.059 1.37-.059 4.04 0 2.669.01 2.986.059 4.04.044.976.207 1.504.344 1.856.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.504-.207 1.856-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.352.3-.88.344-1.856.048-1.054.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.044-.976-.207-1.504-.344-1.856a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.352-.137-.88-.3-1.856-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
  </svg>
);

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom>MiniSuper</Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 2 }}>
              Tu tienda de confianza con los mejores productos y servicios.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                color="inherit" 
                size="small"
                component="a" 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                size="small"
                component="a" 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                size="small"
                component="a" 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>Enlaces</Typography>
            <Stack spacing={1}>
              <Link href="/" passHref>
                <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                  Inicio
                </Typography>
              </Link>
              <Link href="/products" passHref>
                <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                  Productos
                </Typography>
              </Link>
              <Link href="/about" passHref>
                <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                  Quiénes Somos
                </Typography>
              </Link>
              <Link href="/contact" passHref>
                <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                  Contacto
                </Typography>
              </Link>
              <Link href="/faq" passHref>
                <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                  Preguntas Frecuentes
                </Typography>
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>Horarios</Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
              Lunes - Viernes: 8:00 AM - 10:00 PM
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
              Sábado: 8:00 AM - 10:00 PM
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
              Domingo: 8:00 AM - 10:00 PM
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom>Contacto</Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
              <strong>Dirección:</strong> Av. Principal #123, Colonia Centro, Ciudad de México
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
              <strong>Teléfono:</strong> (55) 1234-5678
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
              <strong>Email:</strong> contacto@minisuper.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography variant="body2" align="center" color="inherit" sx={{ opacity: 0.8 }}>
          &copy; {new Date().getFullYear()} MiniSuper. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
} 