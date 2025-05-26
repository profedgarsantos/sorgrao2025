import { Alert, AlertTitle, Box } from "@mui/material"

interface ErrorMessageProps {
  message: string
  title?: string
}

const ErrorMessage = ({ message, title = "Erro" }: ErrorMessageProps) => {
  return (
    <Box sx={{ my: 2 }}>
      <Alert severity="error">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  )
}

export default ErrorMessage
