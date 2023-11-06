import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { validateForm } from "../../helpers/validationSecurity";
import { logoutUser, putUser } from "../../redux/actions";

function ProfileSecurity() {
  const userData = JSON.parse(window.localStorage.getItem("user"));

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    id: userData.id,
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(user)) {
      Swal.fire({
        title: "Vas a cambiar tu contraseña. ¿Estás seguro?",
        text: "Tendrás que volver a iniciar sesión",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#d33",
        denyButtonText: "Cancelar",
        confirmButtonText: "¡Sí!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(putUser(user));
          dispatch(logoutUser());
          window.localStorage.removeItem("user");
          setUser({
            firstName: "",
            lastName: "",
            email: "",
            image: "",
          });
          Swal.fire(
            "¡Listo!",
            "Modificaste tu contraseña. Vuelve a iniciar sesión",
            "success"
          );
        }
      });
    }
  };

  return (
    <div className="w-full h-full pb-32 md:pb-0">
      <h2 className="h-16 text-gray-50 flex items-center justify-center bg-primary-500  dark:bg-red-700">
        Seguridad
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full px-10 my-10 flex justify-center items-center"
      >
        <div className="w-60 flex flex-col mt-6">
          <div className="w-full h-full my-1 flex flex-col">
            <label>Contraseña anterior:</label>
            <input
              className="w-full h-full p-2 mb-2 border-radius-3 bg-gray-400 rounded-md "
              type="password"
              value={1231112112}
              disabled
            />
          </div>
          <div className="w-full h-full my-1 flex flex-col">
            <label className="labelSecurity" htmlFor="password">
              Nueva contraseña:
            </label>
            <input
              className="w-full h-full p-2 mb-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full h- my-1 flex flex-col">
            <label className="labelSecurity" htmlFor="confirmPassword">
              Confirmar contraseña:
            </label>
            <input
              className="w-full h-full p-2 mb-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="p-4 my-4 rounded-sm bg-primary-600 hover:bg-primary-500 border-radius-3 font-bold text-white shadow-xl shadow-gray-600  dark:shadow-red-600 dark:bg-red-700 hover:dark:bg-red-600"
          >
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSecurity;
