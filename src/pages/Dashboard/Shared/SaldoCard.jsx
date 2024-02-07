import { Card, Container, Typography } from '@mui/material';
import React, { useEffect} from 'react';

export const SaldoCard = ({ data }) => {

    let somaEntradas = 0;
    let somaSaidas = 0;
    // Calcula as somas
     if (data) {
         // Calcula as somas
         data.forEach((movimento) => {
         if (movimento.Categoria === "ENTRADA") {
            somaEntradas += movimento.Valor;
         } else if (movimento.Categoria === "SAIDA") {
            somaSaidas += movimento.Valor;
         }
         });
     }
     // Calcula o total
     const total = somaEntradas - somaSaidas;

     useEffect(() => {
     }, [data]);

     return (
         <Container component="div" elevation={2}>
             <Card sx={{ backgroundColor: '#3e85e3', padding: '5px' }}>
                 <Typography textAlign="center" color="white">
                     SALDO ACTUAL <br /> 
                     {new Intl.NumberFormat("pt-ao", {
                         style: "currency",
                         currency: "AOA",
                     }).format(total)}
                 </Typography>
             </Card>
         </Container>
     );
 };
