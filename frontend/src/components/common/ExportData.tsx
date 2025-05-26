"use client"

import type React from "react"
import { useState } from "react"
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemButton,
  List,
  ListItem,
  Typography,
} from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import TableViewIcon from "@mui/icons-material/TableView"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import { useI18n } from "../../hooks/useI18n"

interface ExportDataProps {
  data: any[]
  filename: string
  title?: string
}

const ExportData: React.FC<ExportDataProps> = ({ data, filename, title }) => {
  const { t } = useI18n()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [exportFormat, setExportFormat] = useState<"csv" | "excel" | "pdf">("csv")
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (data.length === 0) return

    // Inicializar campos selecionados com todos os campos disponíveis
    if (data.length > 0 && selectedFields.length === 0) {
      setSelectedFields(Object.keys(data[0]))
    }

    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenDialog = (format: "csv" | "excel" | "pdf") => {
    setExportFormat(format)
    setOpenDialog(true)
    handleClose()
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleToggleField = (field: string) => {
    const currentIndex = selectedFields.indexOf(field)
    const newSelectedFields = [...selectedFields]

    if (currentIndex === -1) {
      newSelectedFields.push(field)
    } else {
      newSelectedFields.splice(currentIndex, 1)
    }

    setSelectedFields(newSelectedFields)
  }

  const handleSelectAllFields = () => {
    if (data.length > 0) {
      if (selectedFields.length === Object.keys(data[0]).length) {
        setSelectedFields([])
      } else {
        setSelectedFields(Object.keys(data[0]))
      }
    }
  }

  const handleExport = () => {
    if (data.length === 0 || selectedFields.length === 0) return

    // Filtrar dados para incluir apenas os campos selecionados
    const filteredData = data.map((item) => {
      const filteredItem: Record<string, any> = {}
      selectedFields.forEach((field) => {
        filteredItem[field] = item[field]
      })
      return filteredItem
    })

    if (exportFormat === "csv") {
      exportCSV(filteredData)
    } else if (exportFormat === "excel") {
      exportExcel(filteredData)
    } else if (exportFormat === "pdf") {
      exportPDF(filteredData)
    }

    handleCloseDialog()
  }

  const exportCSV = (filteredData: any[]) => {
    // Obter cabeçalhos
    const headers = selectedFields

    // Criar conteúdo CSV
    const csvContent = [
      headers.join(","), // Cabeçalhos
      ...filteredData.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Formatar valores especiais
            if (value === null || value === undefined) {
              return ""
            }
            if (typeof value === "string" && value.includes(",")) {
              return `"${value}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    // Criar blob e link para download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportExcel = (filteredData: any[]) => {
    // Simulação de exportação para Excel
    // Em um ambiente real, você usaria uma biblioteca como xlsx
    alert("Exportação para Excel não implementada nesta versão")
  }

  const exportPDF = (filteredData: any[]) => {
    // Simulação de exportação para PDF
    // Em um ambiente real, você usaria uma biblioteca como jspdf
    alert("Exportação para PDF não implementada nesta versão")
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleClick}
        disabled={data.length === 0}
        fullWidth
      >
        {t("common.export")}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleOpenDialog("csv")}>
          <ListItemIcon>
            <TableViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog("excel")}>
          <ListItemIcon>
            <InsertDriveFileIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excel</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog("pdf")}>
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>PDF</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t("export.title")} - {title || filename}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="export-format-label">{t("export.format")}</InputLabel>
            <Select
              labelId="export-format-label"
              value={exportFormat}
              label={t("export.format")}
              onChange={(e) => setExportFormat(e.target.value as "csv" | "excel" | "pdf")}
            >
              <MenuItem value="csv">CSV</MenuItem>
              <MenuItem value="excel">Excel</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="subtitle1" gutterBottom>
            {t("export.selectFields")}
          </Typography>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSelectAllFields}>
                <Checkbox
                  edge="start"
                  checked={data.length > 0 && selectedFields.length === Object.keys(data[0]).length}
                  indeterminate={
                    selectedFields.length > 0 && data.length > 0 && selectedFields.length < Object.keys(data[0]).length
                  }
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={t("export.selectAll")} />
              </ListItemButton>
            </ListItem>

            {data.length > 0 &&
              Object.keys(data[0]).map((field) => (
                <ListItem key={field} disablePadding>
                  <ListItemButton onClick={() => handleToggleField(field)}>
                    <Checkbox edge="start" checked={selectedFields.indexOf(field) !== -1} tabIndex={-1} disableRipple />
                    <ListItemText primary={field} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("common.cancel")}</Button>
          <Button onClick={handleExport} variant="contained" disabled={selectedFields.length === 0}>
            {t("common.export")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExportData
