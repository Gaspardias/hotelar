// Dashboard.js
import React, { useEffect } from 'react';
import EntradasAreaChart from './Shared/EntradasAreaChart';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEntradas, getCountEntradas, getEntradasChart } from '../../redux/actions/entradaActions';
import { Box, Button, Card, CardContent,TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Search } from '@mui/icons-material';
import * as Yup from "yup";
import { EntradasCard } from './Shared/EntradasCard';
import { SaidasCard } from './Shared/SaidasCard';
import { getAllSaidas, getSaidasSum } from '../../redux/actions/saidaActions';
import SaidasAreaChart from './Shared/SaidasAreaChart';
import CountEntradas from './Shared/CountEntradas';


let initialValues = {
  // ... outros valores iniciais
  dataInicial: '2023-01-01',
  dataFinal: new Date(),
  operador: ""
};

const entradaSchema = Yup.object().shape({
  // ... outros campos de validação
  //operador: Yup.string().required("Campo Requerido"),
  dataInicial: Yup.date().required("Campo obrigatório"),
  dataFinal: Yup.date().required("Campo obrigatório").min(Yup.ref('dataInicial'), "A data final deve ser depois da data inicial"),
});

const Dashboard = () => {

  const dispatch = useDispatch()

  const getAllEntradasChartStore = useSelector((state) => state.getAllEntradasChartStore)
  const {entradas = []} = getAllEntradasChartStore;

  const getAllEntradaStore = useSelector((state) => state.getAllEntradaStore)
  const {entradas: entradasCard = []} = getAllEntradaStore;

  const getSaidasSumStore = useSelector((state) => state.getSaidasSumStore)
  const {saidas = []} = getSaidasSumStore;

  const getAllSaidaStore = useSelector((state) => state.getAllSaidaStore)
  const {saidas: saidasCard = []} = getAllSaidaStore

  useEffect(() => {
    dispatch(getEntradasChart(initialValues.dataInicial, initialValues.dataFinal, initialValues.operador))
    dispatch(getAllEntradas(initialValues.dataInicial, initialValues.dataFinal, initialValues.operador));
    dispatch(getSaidasSum(initialValues.dataInicial, initialValues.dataFinal, initialValues.operador))
    dispatch(getAllSaidas(initialValues.dataInicial, initialValues.dataFinal, initialValues.operador))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, initialValues.dataInicial, initialValues.dataFinal, initialValues.operador])
  
  
  return (
    <>
      <Card elevation={1} sx={{ margin:"0.1rem", maxWidth:"100%"}}>
        <Box  component="div" sx={{display:"flex", flexDirection:"column", padding:"0.2rem"}}>
            <Formik
                initialValues={initialValues} 
                onSubmit={(values) => {
                  initialValues = values;
                  dispatch(getEntradasChart(values.dataInicial, values.dataFinal, values.operador))
                }} 
                validationSchema={entradaSchema}>
              {({ errors, touched }) => (
                <Form >
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    name="dataInicial"
                    label="Data Inicial"
                    type="date"
                    id="dataInicial"
                    autoComplete="current-dataInicial"
                    sx={{margin:"0.1rem"}}
                    error={errors.dataInicial && touched.dataInicial}
                    />
                  <ErrorMessage
                    name="dataInicial"
                    component="div"
                    className="error-message"
                  />
              
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    name="dataFinal"
                    label="Data Final"
                    type="date"
                    id="dataFinal"
                    sx={{margin:"0.1rem"}}
                    autoComplete="current-dataFinal"
                    error={errors.dataFinal && touched.dataFinal}
                  />
                  <ErrorMessage
                    name="dataFinal"
                    component="div"
                    className="error-message"
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    name="operador"
                    id="operador"
                    sx={{margin:"0.1rem"}}
                    autoComplete="current-operador"
                    error={errors.operador && touched.operador}
                  />
                  <ErrorMessage
                    name="operador"
                    component="div"
                    className="error-message"
                  />
              
                  <Button type="submit" variant="contained" sx={{minHeight:"3.5rem"}}>
                      PROCURAR <Search />
                  </Button>
                </Form>
              )}
            </Formik>
        </Box>
      </Card >
      <Card elevation={1} sx={{ margin:"0.1rem", maxWidth:"100%"}}>
        <Box component="div" sx={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          <CardContent sx={{maxWidth:"80%", maxHeight:"360px"}}>
            <EntradasCard data={entradasCard}/>
          </CardContent>
          <CardContent sx={{maxWidth:"23%"}}>
            <SaidasCard data={saidasCard}/>
          </CardContent>
        </Box>
        <Box sx={{marginLeft:"1.5rem",display:"flex", flex:"left", flexDirection: "row", flexWrap:"wrap"}}>
          <CardContent sx={{maxWidth:"70%", maxHeight:"100%"}}>
            <EntradasAreaChart data={entradas}/>
          </CardContent>
          <CardContent sx={{maxWidth:"70%", maxHeight:"100%"}}>
            <CountEntradas data={entradas}/>
          </CardContent>
          <CardContent sx={{maxWidth:"70%", maxHeight:"100%"}}>
            <SaidasAreaChart data={saidas}/>
          </CardContent> 
        </Box>
      </Card>
    </>
  );
};

export default Dashboard;
