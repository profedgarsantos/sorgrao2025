import { Typography, Button, Container, Box } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Página não encontrada
        </Typography>
        <Typography variant="body1" paragraph>
          A página que você está procurando não existe ou foi removida.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" size="large">
          Voltar para o Dashboard
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
