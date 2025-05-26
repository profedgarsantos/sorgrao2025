import { Box, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"

interface EmptyStateProps {
  title: string
  description?: string
  actionText?: string
  actionLink?: string
  showAction?: boolean
}

const EmptyState = ({
  title,
  description,
  actionText = "Adicionar",
  actionLink,
  showAction = true,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 1,
        my: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      {showAction && actionLink && (
        <Button component={Link} to={actionLink} variant="contained" startIcon={<AddIcon />}>
          {actionText}
        </Button>
      )}
    </Box>
  )
}

export default EmptyState
