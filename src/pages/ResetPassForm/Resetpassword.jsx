import { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import { useResetPassword } from "../../hooks/useResetPassword";

const Resetpassword = () => {
  const { errors, handleSubmit, loading, onSubmit, register } =
    useResetPassword();

  return (
    <>
      <Toaster />
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full min-h-screen flex justify-center items-center pt-12">
          <form
            className="w-[400px] h-full relative flex flex-col p-6 bg-light-50 dark:bg-transparent rounded shadow-xl shadow-gray-600  dark:shadow-red-600 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="w-full flex justify-center mb-6 mt-4">
              Ingresa tus datos
            </h2>
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
                <span className="text-red-600 dark:text-red-600 text-base mt-2">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <input
                className="py-2 px-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
                type="firstName"
                placeholder="Ingresa tu nombre"
                {...register("firstName", {
                  required: "El nombre es requerido",
                })}
              />
              {errors.firstName && (
                <span className="text-red-600 dark:text-red-600 text-base mt-2">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <button
              className="w-full rounded py-2 px-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700 hover:dark:bg-red-600"
              type="submit"
            >
              Resetear contraseña
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Resetpassword;
