import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav>
      {user ? (
        <button onClick={logout}>Cerrar Sesión</button>
      ) : (
        <a href="/auth">Iniciar Sesión</a>
      )}
    </nav>
  )
}

export default Navbar
