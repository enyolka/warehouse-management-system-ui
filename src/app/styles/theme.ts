import { createTheme} from '@mui/material/styles';
import { colors } from "./palette";


export const theme = createTheme({components:{ 
  MuiButton :{
  styleOverrides:{
    root: {
      "&.MuiButton-contained": {
        backgroundColor: colors.primary
      }
    }
  }
}}});
