import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import LogoGoogle from "../../assets/google_logo.png";
import Spinner from "../../components/Spinner/Spinner";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const {
    errors,
    handleLoginGoogle,
    handleSubmit,
    loading,
    onSubmit,
    register,
    setShowPwd,
    showPwd,
  } = useLogin();
  return (
    <>
      <Toaster />
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full min-h-screen flex justify-center items-center lg:mt-10">
          <form
            className="w-[400px] min-h-[400px] my-20 lg:my-0 m-4 h-full relative flex flex-col p-6 bg-light-50 dark:bg-transparent  rounded  shadow-xl shadow-gray-600  dark:shadow-red-600"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-6 mt-4 border-b">
              <h2 className="w-full flex justify-center">
                Ingresá a tu cuenta
              </h2>
              <button
                type="button"
                className="w-full my-10 px-3 flex rounded justify-center items-center bg-primary-600 hover:bg-primary-500  shadow-lg shadow-light-600  dark:shadow-red-600 dark:bg-red-700 hover:dark:bg-red-600"
                onClick={handleLoginGoogle}
              >
                <img className="w-10" src={LogoGoogle} alt="Logo Google" />
                <p className="text-sm font-bold text-white">
                  Iniciar sesión con Google
                </p>
              </button>
            </div>
            <div className="flex flex-col mb-4">
              <input
                className="py-2 px-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
                type="text"
                placeholder="Ingresa tu email"
                {...register("email", {
                  required: "El email es requerido",
                })}
              />
              {errors.email && (
                <span className="text-red-600 dark:text-red-600 text-base mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <div className="w-full relative">
                <input
                  className="py-2 px-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
                  type={showPwd ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height={"1.5rem"}
                      className="eye-icon"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height={"1.5rem"}
                      className="eye-icon"
                    >
                      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-600 dark:text-red-600 text-base mt-1">
                  {errors.password.message}
                </span>
              )}

              <div className="w-full flex justify-end py-3">
                <Link to="/forgotPassword">
                  <span className="text-primary-600 hover:text-primary-400 dark:text-red-600 hover:dark:text-red-500 text-base">
                    ¿Olvidaste tu contraseña?
                  </span>
                </Link>
              </div>
            </div>

            <button
              className="w-full rounded py-2 px-3 mb-6 bg-primary-600 hover:bg-primary-500 text-white font-bold dark:shadow-xl shadow-lg shadow-light-600  dark:shadow-red-600 dark:bg-red-700 hover:dark:bg-red-600"
              type="submit"
            >
              <p className="text-sm font-bold text-white"> Iniciar Sesión</p>
            </button>
            <div className="w-full flex justify-center space-x-1">
              <p className="text-base text-light-700">¿No tenés cuenta?</p>
              <Link to="/createUser">
                <span className="text-base text-primary-600 hover:text-primary-400 dark:text-red-600 hover:dark:text-red-500 pl-4">
                  Regístrate
                </span>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
