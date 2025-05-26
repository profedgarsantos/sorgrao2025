import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { config } from "./config/environment"

async function startApp() {
  // Inicializar mock de API em ambiente de desenvolvimento
  if (config.environment === "development" && process.env.REACT_APP_MOCK_API === "true") {
    const { worker } = await import("./mocks/browser")
    await worker.start({
      onUnhandledRequest: "bypass",
    })
    console.log("🔶 Mock API Server running")
  }

  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )

  reportWebVitals()
}

startApp()
