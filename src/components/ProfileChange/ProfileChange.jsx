import React, { useEffect, useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { logoutUser, putUser } from "../../redux/actions";
import { validateField } from "../../helpers/validateProfile";

function ProfileChange() {
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    id: userData.id,
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState("");

  useEffect(() => {
    if (!userData.password) {
      setDisabled(true);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    setError((prevError) => ({
      ...prevError,
      [name]: validateField(name, value),
    }));
  }

  const handleUploadPhoto = () => {
    const widget_cloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhyqgl7ie",
        uploadPreset: "a2i0wk5f",
        sources: ["local"],
        resourceType: ["image"],
        clientAllowedFormats: ["image"],
      },
      (err, result) => {
        if (!err && result && result.event === "success") {
          const image = result.info.secure_url;
          setUploadedPhoto(image); // Almacenar la URL de la foto subida
          toast("Imagen subida con éxito");
        }
      }
    );

    widget_cloudinary.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savePic = {
      ...user,
      image: uploadedPhoto,
    };
    if (user.firstName || user.lastName || user.email || savePic.image) {
      Swal.fire({
        title: "Vas a modificar tus datos. ¿Estás seguro?",
        text: "Tendrás que volver a iniciar sesión",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#d33",
        denyButtonText: "Cancelar",
        confirmButtonText: "¡Sí!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(putUser(savePic));
          dispatch(logoutUser());
          window.localStorage.removeItem("user");
          setUser({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            image: "",
          });
          Swal.fire(
            "Listo!",
            "Modificaste tus datos. Volve a iniciar sesion",
            "success"
          ).then(() => {
            window.location.href = "/login";
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hiciste ninguna modificación!",
      });
    }
  };

  return (
    <div className="w-full h-full pb-24">
      <h2 className="w-full  text-gray-50 flex items-center justify-center h-16 bg-primary-500  dark:bg-red-700">
        Perfil
      </h2>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {/* Imagen */}
        <div className="w-full h-full flex flex-col items-center my-6">
          <img
            className="w-36 h-36 rounded-full"
            src={uploadedPhoto || userData.image}
            alt="Profile"
          />
          {!disabled && (
            <button
              type="button"
              id="btn-photo"
              onClick={handleUploadPhoto}
              className="bg-primary-600 hover:bg-primary-500 text-center px-4 mt-4 py-2 rounded-md font-bold text-white  shadow-xl shadow-gray-600  dark:shadow-red-600 dark:bg-red-700 hover:dark:bg-red-600"
            >
              Cambiar
            </button>
          )}
        </div>
        <div className="w-full flex flex-col items-center px-10 sm:px-20 ">
          {/* Nombre y apellido */}
          <div className="w-full flex flex-col lg:flex-row lg:space-x-10">
            <div className="w-full relative flex flex-col mb-2">
              <label className="mb-2 " htmlFor="firstName">
                Nombre:
              </label>
              <input
                className={`p-2 mb-2 rounded-md ${
                  disabled
                    ? "bg-light-200 placeholder:text-light-400 dark:bg-slate-900"
                    : "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
                }`}
                type="text"
                name="firstName"
                value={user.firstName}
                placeholder={userData.firstName}
                onChange={handleChange}
                disabled={disabled}
              />
              {!disabled && !error.firstName && (
                <div className="absolute top-10 right-1">
                  <BiCheckCircle className="text-3xl text-green-500" />
                </div>
              )}
              {error.firstName && (
                <div className="flex items-center">
                  <BiErrorCircle className="text-3xl text-red-600" />
                  <span className="text-base ml-1">{error.firstName}</span>
                </div>
              )}
            </div>
            <div className="w-full relative flex flex-col mb-2">
              <label className="mb-2" htmlFor="lastName">
                Apellido:
              </label>
              <input
                className={`p-2 mb-2 rounded-md ${
                  disabled
                    ? "bg-light-200 placeholder:text-light-400 dark:bg-slate-900"
                    : "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
                }`}
                type="text"
                name="lastName"
                value={user.lastName}
                placeholder={userData.lastName}
                onChange={handleChange}
                disabled={disabled}
              />
              {!disabled && !error.lastName && (
                <div className="absolute top-10 right-1">
                  <BiCheckCircle className="text-3xl text-green-500" />
                </div>
              )}
              {error.lastName && (
                <div className="flex items-center">
                  <BiErrorCircle className="text-3xl text-red-600" />
                  <span className="text-base ml-1">{error.lastName}</span>
                </div>
              )}
            </div>
          </div>
          {/* Email y cine */}
          <div className="w-full flex flex-col lg:flex-row lg:space-x-10">
            <div className="w-full relative flex flex-col mb-2">
              <label className="mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className={`p-2 mb-2 rounded-md ${
                  disabled
                    ? "bg-light-200 placeholder:text-light-400 dark:bg-slate-900"
                    : "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-lg focus:shadow-primary-500 dark:focus:ring-red-700 dark:focus:shadow-red-700"
                }`}
                type="text"
                name="email"
                value={user.email}
                placeholder={userData.email}
                onChange={handleChange}
                disabled={disabled}
              />
              {!disabled && !error.email && (
                <div className="absolute top-10 right-1">
                  <BiCheckCircle className="text-3xl text-green-500" />
                </div>
              )}
              {error.email && error.email !== "" && (
                <div className="flex items-center">
                  <BiErrorCircle className="text-3xl text-red-600" />
                  <span className="text-base ml-1">{error.email}</span>
                </div>
              )}
            </div>
            <div className="w-full relative flex flex-col mb-2">
              <label className="mb-2" htmlFor="cinePlus">
                CinePlus:
              </label>
              <input
                className="p-2 rounded-md bg-light-200 dark:bg-slate-900 placeholder:text-light-400 placeholder:font-semibold dark:placeholder:text-lig"
                type="text"
                name="cinePlus"
                value={user.cinePlus}
                placeholder={userData.cinePlus}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
        </div>
        {!disabled && (
          <button
            className="w-40 mt-10 py-2 text-gray-50 bg-primary-600 hover:bg-primary-500  rounded-md font-bold shadow-xl shadow-gray-600  dark:shadow-red-600 dark:bg-red-700 hover:dark:bg-red-600"
            type="submit"
            disabled={disabled}
          >
            Guardar
          </button>
        )}
      </form>
    </div>
  );
}

export default ProfileChange;
