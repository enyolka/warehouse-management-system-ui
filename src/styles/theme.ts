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
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        minWidth: 1020,
        maxWidth: 1200,
        maxHeight: "75vh",
        overflowY: "auto",
      }
    }
  }
}});
