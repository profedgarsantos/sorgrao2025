"use client"

import type React from "react"
import { useState } from "react"
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import TranslateIcon from "@mui/icons-material/Translate"
import { useI18n } from "../../hooks/useI18n"
import type { Language } from "../../contexts/I18nContext"

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useI18n()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    handleMenuClose()
  }

  const languageNames = {
    "pt-BR": "Português",
    "en-US": "English",
    es: "Español",
  }

  return (
    <>
      <Tooltip title="Idioma">
        <IconButton color="inherit" onClick={handleMenuOpen} sx={{ mr: 1 }}>
          <TranslateIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
        {Object.entries(languageNames).map(([langCode, langName]) => (
          <MenuItem
            key={langCode}
            onClick={() => handleLanguageChange(langCode as Language)}
            selected={language === langCode}
          >
            {langName}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSelector
