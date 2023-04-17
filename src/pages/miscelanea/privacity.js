import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';


const theme = createTheme(themeOptions);
var newWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


export const Privacity = () =>{


    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{width: newWidth}}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '50vh' }}
                    >

                    <Grid item xs={8}>
                    <Typography variant={newWidth>500?'h5':'h3'} sx={{mt:2}}>
                        {i18next.t("Privacy Policy")}
                    </Typography>
                    </Grid>   
                    <Grid item xs={8}>
                    <p>Fecha de entrada en vigor: 3 de abril 2020</p>
<p>
En bienesDar.org, deseamos proteger y respetar la privacidad de todos y, por ello, adoptamos las medidas de seguridad requeridas por la normativa aplicable. A continuación, explicaremos cómo y para qué recabamos datos en los formularios de contacto de www.bienesDar.org y www.EduPlat.org. La información proporcionada en ellos es confidencial y solo será revelada en los casos contemplados a continuación. La asociación (Registrada en el registro nacional de asociaciones (Ministerio del Interior) el 25/04/2018 en el GRUPO 1, SECCIÓN 1, Nº 615536
</p><p>
Número de Identificación Fiscal Definitivo: CIF: G99525594), se responsabiliza directamente del tratamiento de tus datos.
</p><p>
En BienesDar.org tratamos la información que se nos facilita con el fin de prestar/recibir el servicio solicitado/ofrecido. Los datos proporcionados se conservarán mientras no se nos solicite el cese de la actividad por parte del interesado o representante legal, se mantenga la relación comercial y/o durante el tiempo necesario para cumplir con las obligaciones legales y atender las posibles responsabilidades que pudieran derivar del cumplimiento de la finalidad para la que los datos fueron recabados. Los datos no se cederán a terceros salvo en los casos en que exista una obligación legal o una necesidad específica (por ejemplo al hacer la inscripción en un evento, se comparten datos con la persona que ha hecho la publicación y, en caso de esta creerlo necesario, con el resto de participantes en la misma). Aquellas personas deseen no compartir ningún dato personal, pueden hacer las comunicaciones a través de un seudónimo e incluso un correo electrónico creado con este avatar para este propósito, comunicando sus datos reales cuando lo consideren oportuno. 
</p><p>
Cualquier persona tiene derecho a obtener información sobre si (y cómo) en BienesDar.org estamos tratando sus datos personales, por lo que puede ejercer sus derechos de acceso, rectificación, supresión y portabilidad de datos y oposición y limitación a su tratamiento a través de nuestro formulario de contacto en www.bienesDar.org o www.EduPlat.org, indicando el tipo de información que solicita (idealmente la fecha de su registro original en nuestra base de datos) y un correo electrónico válido al que tal vez solicitemos otro tipo de información (para asegurarnos su autenticidad como usuario). Asimismo, y especialmente si considera que no ha obtenido satisfacción plena en el ejercicio de sus derechos, podrá presentar una reclamación ante la autoridad nacional de control dirigiéndose a estos efectos a la Agencia Española de Protección de Datos, C/ Jorge Juan, 6 – 28001 Madrid.
</p><p>
Esta política de privacidad es susceptible de ser modificada con fecha posterior a la anteriormente citada para adaptarse a las regulaciones vigentes.
</p>
                    </Grid>
                    
              
              
                </Grid>
                    </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}