"use client"

import type React from "react"
import { Card, CardContent, Typography, Chip, Box, IconButton, Divider } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useI18n } from "../../hooks/useI18n"

interface DataCardProps {
  data: Record<string, any>
  title: string
  subtitle?: string
  status?: {
    label: string
    color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
  }
  onEdit?: () => void
  onDelete?: () => void
  fields: Array<{
    key: string
    label: string
    format?: (value: any) => React.ReactNode
  }>
}

const DataCard: React.FC<DataCardProps> = ({ data, title, subtitle, status, onEdit, onDelete, fields }) => {
  const { t } = useI18n()

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Box>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {status && <Chip label={status.label} color={status.color} size="small" sx={{ mr: 1 }} />}
            {onEdit && (
              <IconButton size="small" onClick={onEdit} color="primary">
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton size="small" onClick={onDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {fields.map((field, index) => (
          <Box key={field.key} sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {field.label}:
            </Typography>
            <Typography variant="body2">
              {field.format ? field.format(data[field.key]) : data[field.key] || "-"}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default DataCard
