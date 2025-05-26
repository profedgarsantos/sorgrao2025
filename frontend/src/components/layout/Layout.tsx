import type React from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { EnvironmentIndicator } from "../common/EnvironmentIndicator"
import { Box } from "@mui/material"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
      <EnvironmentIndicator />
    </Box>
  )
}
