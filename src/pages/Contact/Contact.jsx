import email from "@emailjs/browser";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import facebook from "../../assets/contacto/facebook.png";
import instagram from "../../assets/contacto/instagram.png";
import marker from "../../assets/location_icon.png";

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [20, 30],
});

const Contact = () => {
  const { VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_PUBLIC_KEY } = import.meta
    .env;
  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sendMessage = (data) => {
    try {
      email.sendForm(
        VITE_SERVICE_ID,
        VITE_TEMPLATE_ID,
        form.current,
        VITE_PUBLIC_KEY
      );
      reset();
      toast.success("Su mensaje se envió correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al enviar su mensaje");
    }
  };

  return (
    <div className="h-full my-20 mx-4 py-10 lg:mx-10 lg:px-10 flex flex-col lg:flex-row gap-6">
      <Toaster />
      <form
        className="sm:mx-10 md:w-8/12 md:mx-auto h-full lg:w-[600px] lg:min-h-[600px] p-2 relative flex flex-col justify-around lg:p-4 bg-light-50 dark:bg-transparent rounded shadow-xl shadow-gray-600  dark:shadow-red-600"
        ref={form}
        onSubmit={handleSubmit(sendMessage)}
      >
        <h2 className="pb-3">Contacto</h2>
        <div className={`flex flex-col ${errors.name ? "mb-0" : "mb-4"}`}>
          <label htmlFor="name">Nombre</label>
          <input
            className="py-2 px-3 rounded w-full"
            name="name"
            type="text"
            placeholder="Ingresa tu nombre"
            {...register("name", {
              required: "El nombre es requerido",
              maxLength: {
                value: 40,
                message: "El nombre no puede tener más de 40 caracteres",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-600 dark:text-red-600 text-base">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className={`flex flex-col ${errors.email ? "mb-0" : "mb-4"}`}>
          <label htmlFor="email">Email</label>
          <input
            className="py-2 px-3 rounded w-full"
            name="email"
            type="email"
            placeholder="Ingresa tu email"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Debe ser un email válido",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-600 dark:text-red-600 text-base">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={`flex flex-col ${errors.message ? "mb-0" : "mb-4"}`}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            className="resize-none overflow-auto py-2 px-3 rounded w-full"
            name="message"
            rows={7}
            placeholder="Déjanos tu mensaje..."
            {...register("message", {
              required: "El mensaje es requerido",
            })}
          ></textarea>
          {errors.message && (
            <span className="text-red-600 dark:text-red-600 text-base">
              {errors.message.message}
            </span>
          )}
        </div>
        <button
          className="w-full rounded py-2 px-3 mt-3 text-white font-semibold bg-primary-600 hover:bg-primary-500  shadow-lg shadow-light-600  dark:shadow-red-600 dark:bg-red-700 hover:dark:bg-red-600"
          type="submit"
        >
          Enviar
        </button>

        <div className="w-full p-2 text-center">
          <h3>Nuestras redes</h3>
          <div className="flex justify-center">
            <Link
              to={"https://www.facebook.com/profile.php?id=100094046721114"}
              target="_blank"
              className="animate-tambaleo"
            >
              <img
                src={facebook}
                alt="facebook"
                className="w-12 ml-10 mr-10 mt-2"
              />
            </Link>
            <Link
              to={"https://www.instagram.com/cinego75/"}
              target="_blank"
              className="animate-tambaleo"
            >
              <img
                src={instagram}
                alt="instagram"
                className="w-12 ml-10 mr-10 mt-2"
              />
            </Link>
          </div>
        </div>
      </form>
      
      <div className="hidden lg:flex w-full min-h-[500px] items-center justify-center rounded shadow-xl shadow-gray-600  dark:shadow-red-600">
        <MapContainer
          className="w-full h-full z-10"
          center={[-34.61315, -58.37723]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-34.61315, -58.37723]} icon={myIcon}></Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Contact;
