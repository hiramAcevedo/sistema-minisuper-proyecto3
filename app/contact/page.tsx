'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Typography, 
  Container, 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  MenuItem,
  Divider,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Snackbar,
  IconButton,
  Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';

// Iconos simplificados con tamaño controlado (igual que en el Footer)
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

// Agregamos un icono de WhatsApp
const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de envío
    setTimeout(() => {
      console.log('Formulario enviado:', formData);
      setIsSubmitted(true);
      setIsLoading(false);
      setOpenSnackbar(true);
      // Resetear el formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Estamos aquí para ayudarte. No dudes en comunicarte con nosotros para cualquier consulta o sugerencia.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                  Información de Contacto
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Nos encantaría escuchar de ti. Utiliza cualquiera de estos medios para comunicarte con nosotros.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
                    <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Dirección
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Av. Principal #123, Colonia Centro<br />
                        Ciudad de México, CP 12345
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Teléfono
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        (55) 1234-5678
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        contacto@minisuper.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Horario
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lunes a Domingo: 8:00 AM - 10:00 PM
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Síguenos en redes sociales
                  </Typography>
                  <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                    <IconButton color="primary" aria-label="Facebook">
                      <FacebookIcon />
                    </IconButton>
                    <IconButton color="info" aria-label="Twitter">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton color="error" aria-label="Instagram">
                      <InstagramIcon />
                    </IconButton>
                    <IconButton color="success" aria-label="WhatsApp">
                      <WhatsAppIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {isSubmitted ? (
                <Box sx={{ textAlign: 'center', py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Alert 
                    severity="success" 
                    variant="filled" 
                    sx={{ mb: 3, width: '100%' }}
                  >
                    ¡Mensaje enviado con éxito!
                  </Alert>
                  <Typography variant="h6" paragraph>
                    Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleResetForm}
                    startIcon={<SendIcon />}
                  >
                    Enviar otro mensaje
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                    Envíanos un mensaje
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          id="name"
                          name="name"
                          label="Nombre completo"
                          value={formData.name}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          id="email"
                          name="email"
                          label="Correo electrónico"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      fullWidth
                      required
                      id="subject"
                      name="subject"
                      label="Asunto"
                      select
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="">Selecciona un asunto</MenuItem>
                      <MenuItem value="Consulta general">Consulta general</MenuItem>
                      <MenuItem value="Soporte técnico">Soporte técnico</MenuItem>
                      <MenuItem value="Sugerencia">Sugerencia</MenuItem>
                      <MenuItem value="Reclamación">Reclamación</MenuItem>
                      <MenuItem value="Otro">Otro</MenuItem>
                    </TextField>

                    <TextField
                      fullWidth
                      required
                      id="message"
                      name="message"
                      label="Mensaje"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      margin="normal"
                    />

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        sx={{ px: 4 }}
                      >
                        {isLoading ? 'Enviando...' : 'Enviar mensaje'}
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            href="/"
            variant="outlined"
            color="primary"
            size="large"
          >
            Regresar al Inicio
          </Button>
        </Box>
      </Container>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        message="Mensaje enviado con éxito"
      />
    </Box>
  );
} 