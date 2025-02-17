import { useEffect, useState } from "react"
import useAuthStore from "./stores/useAuthStore"
import AppRouter from "./routes/AppRouter"

function App() {

  const { checkAuth } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        await checkAuth()
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })()
  }, [checkAuth])

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
