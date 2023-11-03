import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import cinego_blanco from "../../assets/cinego_blanco.png";
import cinego_negro from "../../assets/cinego_negro.png";
import { useAuth } from "../../context/authContext";
import { logoutUser } from "../../redux/actions";
import ModalProfile from "../ModalProfile/ModalProfile";

const options = [
  { name: "Cartelera", to: "/" },
  { name: "Candy", to: "/candy" },
  { name: "CinePlus", to: "/cineplus" },
  { name: "Contacto", to: "/contact" },
];

function Navbar({ theme, setTheme }) {
  const location = useLocation();
  const [activeModal, setActiveModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      await logout();
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("movie");
      window.localStorage.removeItem("cart");
      window.localStorage.removeItem("productCount");
      setActiveMenu(!activeMenu);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Cerraste sesión exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    setActiveModal(false);
  }, [location]);

  return (
    <nav className="w-full h-[10vh] fixed flex justify-between items-center bg-slate-300 dark:bg-black z-50 shadow-md dark:shadow-sm dark:shadow-white/50">
      <div className="w-full lg:w-80 lg:ml-4 order-0 flex items-center justify-center lg:justify-start">
        <Link to="/">
          {theme === "dark" ? (
            <img className="w-36" src={cinego_blanco} alt="CineGO" />
          ) : (
            <img className="w-36" src={cinego_negro} alt="CineGO" />
          )}
        </Link>
      </div>

      {/* Botones */}
      <div className="w-3/4 h-full hidden md:flex justify-center items-center mt-2 space-x-10 order-2">
        {options.map((option, index) => (
          <Link key={index} to={option.to}>
            <p
              className={`text-base ${
                location.pathname === option.to
                  ? "text-primary-500 border-b-2 border-primary-500 dark:text-red-500 hover:text-primary-700 dark:hover:text-red-700 dark:border-red-700"
                  : "text-gray-900 hover:text-gray-600 dark:hover:text-red-700"
              }`}
            >
              {option.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Menu Responsive */}
      <div className="w-full h-full md:hidden flex  justify-end mr-2 order-3">
        {activeMenu ? (
          <button onClick={() => setActiveMenu(!activeMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-10 h-10 stroke-primary-600  dark:stroke-red-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => setActiveMenu(!activeMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-10 h-10 stroke-primary-600 dark:stroke-red-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Modal de menu hamburguesa */}
      {activeMenu && (
        <div className="absolute md:hidden w-full min-h-screen top-[10vh] flex bg-black/50">
          <div className="w-full h-[90vh] bg-slate-200  dark:bg-gray-800 flex flex-col justify-between items-center animate-menuBurgerActivated ease-in-out">
            {!userData || Object.entries(userData).length === 0 ? (
              <Link
                to="/login"
                onClick={() => setActiveMenu(!activeMenu)}
                className="w-full h-full flex justify-center items-center border-primary-600 dark:border-red-700 border-t-2  border-b-2 "
              >
                <p
                  className={`text-base ${
                    location.pathname === "/login"
                      ? "text-primary-500 dark:text-gray-100 text-[1.5rem] font-semibold hover:text-yellow-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Login / Registro
                </p>
              </Link>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center  border-gray-900  border-t-2 border-b-2">
                <Link
                  to={`${userData.isAdmin ? "/dashboard" : "/profile"}`}
                  onClick={() => setActiveMenu(!activeMenu)}
                >
                  <p
                    className={`text-base ${
                      location.pathname === "/profile"
                        ? "text-primary-500 dark:text-primary-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Tu perfil
                  </p>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex justify-center items-center gap-1"
                >
                  <span className="text-red-600 dark:text-red-600">
                    Cerrar Sesión
                  </span>
                </button>
              </div>
            )}

            {/* Opciones */}
            {options.map((option, index) => (
              <Link
                key={index}
                to={option.to}
                onClick={() => setActiveMenu(!activeMenu)}
                className="w-full h-full flex justify-center items-center border-primary-600 dark:border-red-700 border-b-2 "
              >
                <p
                  className={`text-base ${
                    location.pathname === option.to
                      ? "text-primary-700 dark:text-gray-100 text-[1.5rem] font-semibold hover:text-yellow-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {option.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="w-full lg:w-96 h-full flex  justify-center md:justify-end items-center md:mr-8 md:mt-2 order-2">
        <div className="mx-4 hidden lg:flex justify-center">
          {!userData || Object.entries(userData).length === 0 ? (
            <Link to="/login">
              <p
                className={`text-base ${
                  location.pathname === "/login"
                    ? "text-primary-500 border-b-2 dark:text-red-500 hover:text-primary-700 dark:hover:text-red-700 dark:border-red-700"
                    : "text-gray-900 hover:text-gray-600 dark:hover:text-red-700"
                }`}
              >
                Ingresar
              </p>
            </Link>
          ) : (
            <button
              className="flex justify-center items-center"
              onClick={() => setActiveModal(!activeModal)}
            >
              <span className="text-sm mr-2">
                {userData.firstName} {userData.lastName}
              </span>
              <img
                className="w-6 h-6 rounded-full"
                src={userData.image}
                alt={userData.firstName}
              />
            </button>
          )}
          {activeModal && (
            <ModalProfile setActiveModal={setActiveModal} userData={userData} />
          )}
        </div>

        {/* Toogle Theme */}
        <div>
          <button
            onClick={toggleTheme}
            className={theme === "light" ? "block" : "hidden"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-6 h-6 stroke-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </button>
          <button
            onClick={toggleTheme}
            className={theme === "dark" ? "block" : "hidden"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-red-700"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
