import { useEffect } from "react"
import useAuthStore from "./stores/useAuthStore"
import AppRouter from "./routes/AppRouter"
import { verifySession } from "./services/auth.service"

function App() {

  const { setIsAuthenticated, setSessionData } = useAuthStore()

  useEffect(() => {
    (async () => {
      const data = await verifySession()
      if (data.payload) {
        setIsAuthenticated(true)
        setSessionData(data.payload)
      }
    })()
  }, [setIsAuthenticated, setSessionData])

  return (
    < div className="font-roboto bg-slate-50" >
      <AppRouter />
    </div >

  )
}

export default App
