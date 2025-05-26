"use client"

import type React from "react"
import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PeopleIcon from "@mui/icons-material/People"
import CalculateIcon from "@mui/icons-material/Calculate"
import AssessmentIcon from "@mui/icons-material/Assessment"
import SettingsIcon from "@mui/icons-material/Settings"
import PersonIcon from "@mui/icons-material/Person"
import { useI18n } from "../../hooks/useI18n"
import { useIsMobile } from "../../hooks/useMediaQuery"

const drawerWidth = 240

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation()
  const { t } = useI18n()
  const isMobile = useIsMobile()
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const handleToggleSubMenu = (menu: string) => {
    if (openSubMenu === menu) {
      setOpenSubMenu(null)
    } else {
      setOpenSubMenu(menu)
    }
  }

  const menuItems = [
    {
      text: t("sidebar.dashboard"),
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: t("sidebar.offers"),
      icon: <LocalOfferIcon />,
      path: "/ofertas",
    },
    {
      text: t("sidebar.demands"),
      icon: <ShoppingCartIcon />,
      path: "/demandas",
    },
    {
      text: t("sidebar.sellers"),
      icon: <PeopleIcon />,
      path: "/vendedores",
    },
    {
      text: t("sidebar.calculator"),
      icon: <CalculateIcon />,
      path: "/calculadora",
    },
    {
      text: t("sidebar.reports"),
      icon: <AssessmentIcon />,
      path: "/relatorios",
    },
    {
      text: t("sidebar.settings"),
      icon: <SettingsIcon />,
      path: "/configuracoes",
    },
    {
      text: t("sidebar.profile"),
      icon: <PersonIcon />,
      path: "/perfil",
    },
  ]

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={isMobile ? onClose : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar
