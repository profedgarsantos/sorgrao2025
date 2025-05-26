"use client"

import type React from "react"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Divider,
  ListItemIcon,
  Avatar,
  Tooltip,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../hooks/useTheme"
import { useI18n } from "../../hooks/useI18n"
import LanguageSelector from "./LanguageSelector"

interface HeaderProps {
  toggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth()
  const { mode, toggleTheme } = useTheme()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget)
  }

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
    handleMenuClose()
  }

  const handleProfile = () => {
    navigate("/perfil")
    handleMenuClose()
  }

  const handleSettings = () => {
    navigate("/configuracoes")
    handleMenuClose()
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          SorGrao
        </Typography>

        <Tooltip title={mode === "light" ? t("common.darkMode") : t("common.lightMode")}>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>

        <LanguageSelector />

        <Tooltip title={t("common.notifications")}>
          <IconButton color="inherit" onClick={handleNotificationsOpen} sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleNotificationsClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              width: 320,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleNotificationsClose}>
            <Typography variant="subtitle2">{t("notifications.newOffer")}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleNotificationsClose}>
            <Typography variant="subtitle2">{t("notifications.newDemand")}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleNotificationsClose}>
            <Typography variant="subtitle2">{t("notifications.expiringOffer")}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate("/notificacoes")}>
            <Typography variant="body2" color="primary" align="center" sx={{ width: "100%" }}>
              {t("notifications.viewAll")}
            </Typography>
          </MenuItem>
        </Menu>

        <Tooltip title={t("common.account")}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            {user?.avatar ? (
              <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
            ) : (
              <AccountCircleIcon />
            )}
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
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            {t("sidebar.profile")}
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            {t("sidebar.settings")}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {t("auth.logout")}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
