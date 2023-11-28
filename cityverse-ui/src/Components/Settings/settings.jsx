import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { Suspense, lazy } from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from '@mui/material/AppBar'



// const Epi = lazy(() => import('./EPI/Epi'));
// const Indices = lazy(() => import('./Indices/Indices'));
// const Info = lazy(() => import('./Info/Info'));
// const Sinistres = lazy(() => import('./Sinistres/Sinistres'));
const AccountProfile = lazy(() => import('./accountProfile'));
const PersonalDetails = lazy(() => import('./personalDetails'))

const AntTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#0000',
  },
})

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    color: "#000000",
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      color: "#08089C",
      opacity: 1,
    },
    "&.Mui-selected": {
      backgroundColor: "#F0F5FB",
      borderRadius: "0px 0px 0px 0px",
      color: "#08089C",
      fontWeight: theme.typography.fontWeightBold,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#08089C",
    },
  })
); 
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box width='100%' sx={{ p: 0.25 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}


export default function Settings() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
<div>
<Box disableGutters width='100%' component='main'>
  <AppBar position='static' style={{ background: '#fff' }}>
    <AntTabs
      value={value}
      onChange={handleChange}
      variant='fullWidth'
      centered
    >
       <AntTabs
          value={value}
          onChange={handleChange}
        >
          {/* <AntTab label={"Accounts and Profiles"} {...a11yProps(0)} /> */}
          <AntTab label="Personal details" {...a11yProps(0)} />
          <AntTab label="Language" {...a11yProps(1)} />
         
        </AntTabs>   
    </AntTabs>
  </AppBar>
  <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {/* <TabPanel value={value} index={0}>
          <Suspense fallback=
              {<div style={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:'center',height:"100vh",width:"100%"}}>
                <CircularProgress
                  color="success"
                  disableShrink
                  sx={{
                    animationDuration: "550ms",
                  }}
                  size={60}
                  thickness={2}
                />
              </div>}>
              <AccountProfile/>
            </Suspense>
            
          </TabPanel> */}
           <TabPanel value={value} index={0} dir={theme.direction}>
           <Suspense fallback=
              {<div style={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:'center',height:"100vh",width:"100%"}}>
                <CircularProgress
                  color="success"
                  disableShrink
                  sx={{
                    animationDuration: "550ms",
                  }}
                  size={60}
                  thickness={2}
                />
              </div>}>
             <PersonalDetails />
            </Suspense>
           
          </TabPanel>  
          <TabPanel value={value} index={1} dir={theme.direction}>
           <Suspense fallback=
              {<div style={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:'center',height:"100vh",width:"100%"}}>
                <CircularProgress
                  color="success"
                  disableShrink
                  sx={{
                    animationDuration: "550ms",
                  }}
                  size={60}
                  thickness={2}
                />
              </div>}>
              <>Language</>
            </Suspense>
           
          </TabPanel>  
        </SwipeableViews>
</Box>
</div>
  );
}
