import { useEffect } from "react"
import useAuthStore from "./stores/useAuthStore"
import AppRouter from "./routes/AppRouter"
import { verifySession } from "./services/auth.service"
import { useState } from "react"

function App() {

  const { setIsAuthenticated, setSessionData } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const data = await verifySession()
      if (data.payload) {
        setIsAuthenticated(true)
        setSessionData(data.payload)
      }
      setLoading(false)
    })()
  }, [setIsAuthenticated, setSessionData])

  if (loading) {
    return null
  }

  return (
    < div className="font-roboto bg-slate-50" >
      <AppRouter />
    </div >

  )
}

export default App
