"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ptBR } from "date-fns/locale"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import { I18nProvider } from "./contexts/I18nContext"
import { SnackbarProvider } from "./contexts/SnackbarContext"
import PrivateRoute from "./components/auth/PrivateRoute"
import Layout from "./components/layout/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Vendedores from "./pages/vendedores/Vendedores"
import VendedorForm from "./pages/vendedores/VendedorForm"
import Ofertas from "./pages/ofertas/Ofertas"
import OfertaForm from "./pages/ofertas/OfertaForm"
import Demandas from "./pages/demandas/Demandas"
import DemandaForm from "./pages/demandas/DemandaForm"
import Calculadora from "./pages/calculadora/Calculadora"
import Relatorios from "./pages/relatorios/Relatorios"
import Perfil from "./pages/perfil/Perfil"
import Configuracoes from "./pages/configuracoes/Configuracoes"
import NotFound from "./pages/NotFound"
import PWAUpdateNotification from "./components/pwa/PWAUpdateNotification"
import PWAInstallPrompt from "./components/pwa/PWAInstallPrompt"
import OfflineIndicator from "./components/pwa/OfflineIndicator"
import { useEffect } from "react"
import { clearOldCache } from "./services/offlineStorage"

function App() {
  useEffect(() => {
    // Limpa cache antigo na inicialização
    clearOldCache(7) // 7 dias
  }, [])

  const handlePWAUpdate = () => {
    // Recarrega a página para aplicar a atualização
    window.location.reload()
  }

  return (
    <ThemeProvider>
      <I18nProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <AuthProvider>
            <SnackbarProvider>
              <Router>
                <PWAUpdateNotification onUpdate={handlePWAUpdate} />
                <PWAInstallPrompt />
                <OfflineIndicator />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Layout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="vendedores" element={<Vendedores />} />
                    <Route path="vendedores/novo" element={<VendedorForm />} />
                    <Route path="vendedores/:id" element={<VendedorForm />} />
                    <Route path="ofertas" element={<Ofertas />} />
                    <Route path="ofertas/novo" element={<OfertaForm />} />
                    <Route path="ofertas/:id" element={<OfertaForm />} />
                    <Route path="demandas" element={<Demandas />} />
                    <Route path="demandas/novo" element={<DemandaForm />} />
                    <Route path="demandas/:id" element={<DemandaForm />} />
                    <Route path="calculadora" element={<Calculadora />} />
                    <Route path="relatorios" element={<Relatorios />} />
                    <Route path="perfil" element={<Perfil />} />
                    <Route path="configuracoes" element={<Configuracoes />} />
                  </Route>
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Router>
            </SnackbarProvider>
          </AuthProvider>
        </LocalizationProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
