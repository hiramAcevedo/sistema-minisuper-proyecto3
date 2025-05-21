'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Typography, 
  Container, 
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
  Chip,
  Tabs,
  Tab,
  Divider,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SearchIcon from '@mui/icons-material/Search';

// Estructura para FAQs con categorías
const faqCategories = [
  {
    name: 'General',
    icon: <HelpOutlineIcon />,
    items: [
      {
        question: '¿Cuáles son los horarios de atención?',
        answer: 'Nuestro horario de atención es de lunes a domingo de 8:00 AM a 10:00 PM.',
        icon: <AccessTimeIcon color="primary" />
      },
      {
        question: '¿Cómo puedo reportar un problema con mi pedido?',
        answer: 'Puedes reportar cualquier problema con tu pedido llamando a nuestro servicio al cliente al (55) 1234-5678, enviando un correo a soporte@minisuper.com o visitándonos en tienda. Atenderemos tu caso lo antes posible.',
        icon: <SupportAgentIcon color="primary" />
      }
    ]
  },
  {
    name: 'Pedidos y Envíos',
    icon: <LocalShippingIcon />,
    items: [
      {
        question: '¿Realizan envíos a domicilio?',
        answer: 'Sí, realizamos envíos a domicilio dentro de un radio de 5 km desde nuestra ubicación. El costo del envío varía según la distancia.',
        icon: <LocalShippingIcon color="primary" />
      },
      {
        question: '¿Puedo hacer pedidos por teléfono o en línea?',
        answer: 'Sí, puedes realizar pedidos a través de nuestra página web, por teléfono llamando al (55) 1234-5678 o vía WhatsApp.',
        icon: <ShoppingBasketIcon color="primary" />
      }
    ]
  },
  {
    name: 'Pagos y Promociones',
    icon: <PaymentIcon />,
    items: [
      {
        question: '¿Cuáles son los métodos de pago aceptados?',
        answer: 'Aceptamos efectivo, tarjetas de crédito/débito, transferencias bancarias y pagos a través de aplicaciones móviles como PayPal y Mercado Pago.',
        icon: <PaymentIcon color="primary" />
      },
      {
        question: '¿Tienen programa de lealtad o descuentos?',
        answer: 'Sí, contamos con un programa de lealtad. Por cada compra acumulas puntos que puedes canjear por descuentos en futuras compras. Además, tenemos promociones especiales los días martes y jueves.',
        icon: <LoyaltyIcon color="primary" />
      }
    ]
  },
  {
    name: 'Productos y Devoluciones',
    icon: <AssignmentReturnIcon />,
    items: [
      {
        question: '¿Cuál es la política de devoluciones?',
        answer: 'Aceptamos devoluciones dentro de las 24 horas posteriores a la compra, siempre y cuando el producto esté en perfecto estado y se presente el comprobante de compra.',
        icon: <AssignmentReturnIcon color="primary" />
      },
      {
        question: '¿Ofrecen productos orgánicos o especiales?',
        answer: 'Sí, contamos con una sección de productos orgánicos, sin gluten, veganos y para dietas especiales. Puedes consultar la disponibilidad en tienda o en nuestra página web.',
        icon: <ShoppingBasketIcon color="primary" />
      }
    ]
  }
];

export default function FAQ() {
  const [currentTab, setCurrentTab] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Preguntas Frecuentes
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
          </Typography>
        </Box>

        {/* Buscador */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Busca en nuestras preguntas frecuentes o explora por categorías
          </Typography>
        </Paper>

        {/* Categorías en pestañas */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            {faqCategories.map((category, index) => (
              <Tab 
                key={index} 
                label={category.name} 
                icon={category.icon} 
                iconPosition="start"
              />
            ))}
          </Tabs>

          {faqCategories.map((category, categoryIndex) => (
            <Box 
              key={categoryIndex} 
              role="tabpanel"
              hidden={currentTab !== categoryIndex}
              sx={{ transition: 'all 0.3s ease' }}
            >
              {currentTab === categoryIndex && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h2" fontWeight="medium">
                      {category.name}
                    </Typography>
                    <Chip 
                      label={`${category.items.length} preguntas`} 
                      size="small" 
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  {category.items.map((item, itemIndex) => (
                    <Accordion 
                      key={itemIndex}
                      expanded={expanded === `${categoryIndex}-${itemIndex}`}
                      onChange={handleAccordionChange(`${categoryIndex}-${itemIndex}`)}
                      sx={{ 
                        mb: 2, 
                        borderRadius: '8px',
                        overflow: 'hidden',
                        '&:before': { display: 'none' }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ 
                          '&.Mui-expanded': { 
                            minHeight: 56,
                            bgcolor: 'primary.light',
                            color: 'white'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 2, display: 'flex' }}>
                            {item.icon}
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: expanded === `${categoryIndex}-${itemIndex}` ? 'bold' : 'medium',
                              fontSize: '1.1rem'
                            }}
                          >
                            {item.question}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ bgcolor: 'background.paper', p: 3 }}>
                        <Typography variant="body1">
                          {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Sección de ayuda adicional */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: 3,
            bgcolor: 'primary.light',
            color: 'white'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                ¿No encontraste lo que buscabas?
              </Typography>
              <Typography variant="body1" paragraph>
                Si tienes alguna pregunta adicional, no dudes en contactarnos. Nuestro equipo de atención al cliente está disponible para ayudarte con cualquier duda.
              </Typography>
              <Button 
                component={Link} 
                href="/contact"
                variant="contained" 
                color="primary"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'background.paper' }
                }}
              >
                Contáctanos
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <SupportAgentIcon sx={{ fontSize: 80, opacity: 0.9 }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Botón de regreso */}
        <Box sx={{ textAlign: 'center' }}>
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
    </Box>
  );
} 