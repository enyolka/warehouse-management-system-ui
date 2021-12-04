import { createTheme} from '@mui/material/styles';
import { colors } from "./palette";


export const theme = createTheme({components:{ 
  MuiButton :{
    styleOverrides:{
      root: {
        height: "3em",
        fontWeight: 560,
         "&.MuiButton-contained": {
          backgroundColor: colors.primary,
          "&Secondary" : {
            backgroundColor: colors.close
          },
          "&Error" : {
            backgroundColor: colors.error
          }
        },
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
  },
  MuiBottomNavigation: {
    styleOverrides: {
      root: {
        height: "auto",
      }
    }
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        width: "10vw",
      },
        label: {
          fontSize: "0.9rem",
          "&.Mui-selected": {
            fontSize: "1.1rem",
            fontWeight: 600,
            // textDecoration: "underline"
          }
        }
    }
  },
}});
