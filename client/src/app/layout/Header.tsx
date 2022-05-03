import { AppBar, Box, Button, IconButton, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode,handleThemeChange} : Props){
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{mb:2}}>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            
            </IconButton>
            <Switch checked={darkMode} onChange={handleThemeChange} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Store
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        </Box>
    )
}