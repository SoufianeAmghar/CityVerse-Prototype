import { createTheme} from '@mui/material/styles';


const Theme = createTheme({
  typography: {
   "fontFamily": "\"Arial\", sans-serif",
   "fontSize": 13.1,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500,
   button: {
    fontSize: '13px',
   }
  }
});

export default Theme;

