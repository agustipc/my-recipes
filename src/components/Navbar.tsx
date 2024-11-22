import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav>
      {user ? (
        <button onClick={logout}>Cerrar Sesión</button>
      ) : (
        <a href="/login">Iniciar Sesión</a>
      )}
    </nav>
  )
}

export default Navbar
