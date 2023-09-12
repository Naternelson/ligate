import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#f44336'
        }
    },
    typography: {
        h1: {
            fontSize: '5rem', 
        },
        subtitle1: {
            fontSize: '1.5rem'
        }
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                
            }
        }
    }
})

export default theme;