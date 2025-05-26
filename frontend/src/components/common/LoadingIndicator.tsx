import { CircularProgress, Box, Typography } from "@mui/material"

interface LoadingIndicatorProps {
  message?: string
}

const LoadingIndicator = ({ message = "Carregando..." }: LoadingIndicatorProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  )
}

export default LoadingIndicator
