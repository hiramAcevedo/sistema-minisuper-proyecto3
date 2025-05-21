'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Historia de la empresa para el Timeline
const companyHistory = [
  {
    year: '2020',
    title: 'Fundación',
    description: 'MiniSuper abre sus puertas por primera vez con una pequeña tienda local.',
    icon: <StorefrontIcon />,
    color: 'primary' as const
  },
  {
    year: '2021',
    title: 'Expansión',
    description: 'Abrimos nuestra segunda sucursal y lanzamos nuestro servicio de entrega a domicilio.',
    icon: <LocalShippingIcon />,
    color: 'secondary' as const
  },
  {
    year: '2022',
    title: 'Innovación',
    description: 'Implementamos nuestra plataforma de comercio electrónico para compras en línea.',
    icon: <WorkIcon />,
    color: 'success' as const
  },
  {
    year: '2023',
    title: 'Reconocimiento',
    description: 'Recibimos el premio a "Mejor Minisúper del Año" por nuestra calidad y servicio.',
    icon: <StarIcon />,
    color: 'warning' as const
  },
  {
    year: '2024',
    title: 'Actualidad',
    description: 'Continuamos creciendo y mejorando, siempre comprometidos con nuestros clientes.',
    icon: <PeopleIcon />,
    color: 'info' as const
  }
];

export default function About() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight="bold">
          Quiénes Somos
        </Typography>
        
        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Sobre Nosotros
            </Typography>
            <Typography paragraph>
              Somos MiniSuper, una empresa dedicada a brindar productos de alta calidad a precios accesibles.
              Fundada en 2020, hemos crecido rápidamente gracias a nuestra dedicación al servicio al cliente
              y nuestra pasión por ofrecer los mejores productos del mercado.
            </Typography>
            <Typography paragraph>
              Nuestro equipo está formado por profesionales comprometidos con la excelencia y la satisfacción
              del cliente, trabajando cada día para mejorar tu experiencia de compra.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                borderRadius: 3,
                bgcolor: 'grey.100'
              }}
            >
              <Image
                src="/dogactually.webp"
                alt="Equipo MiniSuper"
                width={300}
                height={300}
                style={{ borderRadius: '12px', objectFit: 'cover' }}
              />
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Nuestra Historia
          </Typography>
          <Timeline position="alternate">
            {companyHistory.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                  <Typography variant="h6" component="span" color="text.secondary">
                    {event.year}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color={event.color}>
                    {event.icon}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    {event.title}
                  </Typography>
                  <Typography>{event.description}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 4, height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom color="primary">
                Nuestra Misión
              </Typography>
              <Typography>
                Proveer productos de calidad superior a precios accesibles, ofreciendo una experiencia de compra
                excepcional y contribuyendo positivamente a las comunidades donde operamos.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 4, height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom color="secondary">
                Nuestra Visión
              </Typography>
              <Typography>
                Ser reconocidos como el minisúper líder en calidad, servicio e innovación, 
                expandiendo nuestra presencia mientras mantenemos los valores que nos definen.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Políticas de Calidad
          </Typography>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
            <List>
              {[
                'Seleccionamos rigurosamente a nuestros proveedores para garantizar la calidad de cada producto.',
                'Mantenemos estrictos controles de almacenamiento para preservar la frescura de los alimentos.',
                'Capacitamos continuamente a nuestro personal para ofrecer el mejor servicio.',
                'Implementamos sistemas de mejora continua basados en la retroalimentación de nuestros clientes.',
                'Cumplimos con todas las normativas sanitarias y de seguridad alimentaria.'
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ubicación Física
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                <Typography paragraph variant="h6">
                  Nos encontramos ubicados en:
                </Typography>
                <Typography variant="body1" paragraph>
                  Av. Principal #123<br />
                  Colonia Centro<br />
                  Ciudad de México, CP 12345
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Teléfono:</strong> (55) 1234-5678<br />
                  <strong>Email:</strong> contacto@minisuper.com
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 0, borderRadius: 3, height: '100%', overflow: 'hidden' }}>
                <Box sx={{ width: '100%', height: '100%', minHeight: '250px' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.3615169683976!2d-103.32802462406637!3d20.654866100514205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b23a9bbba80d%3A0xdacdb7fd592feb90!2sCentro%20Universitario%20de%20Ciencias%20Exactas%20e%20Ingenier%C3%ADas%20(CUCEI)!5e0!3m2!1ses-419!2smx!4v1747631817015!5m2!1ses-419!2smx" 
                    width="100%" 
                    height="100%"
                    frameBorder="0"
                    allowFullScreen 
                    loading="lazy" 
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            component={Link} 
            href="/"
            variant="contained" 
            color="primary"
            size="large"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Regresar al Inicio
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 