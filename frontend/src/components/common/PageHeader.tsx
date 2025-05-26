import { Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"

interface PageHeaderProps {
  title: string
  buttonText?: string
  buttonLink?: string
  showAddButton?: boolean
}

const PageHeader = ({ title, buttonText, buttonLink, showAddButton = true }: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      {showAddButton && buttonLink && (
        <Button component={Link} to={buttonLink} variant="contained" color="primary" startIcon={<AddIcon />}>
          {buttonText || "Adicionar"}
        </Button>
      )}
    </Box>
  )
}

export default PageHeader
