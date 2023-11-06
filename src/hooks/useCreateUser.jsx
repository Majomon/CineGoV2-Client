import { yupResolver } from "@hookform/resolvers/yup";
import cloudinary from "cloudinary-core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { postUser } from "../redux/actions";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([A-Za-z]+\s?){1,18}$/, "Solo letras máx 18 caracteres")
    .required("El nombre es requerido"),
  lastName: yup
    .string()
    .matches(/^([A-Za-z]+\s?){1,18}$/, "Solo letras máx 18 caracteres")
    .required("El apellido es requerido"),
  email: yup
    .string()
    .required("El email es requerido")
    .email("Formato de email incorrecto"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .min(6, "Mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirmación requerida"),
});
export const useCreateUser = () => {
  const dispatch = useDispatch();
  const [uploadedPhoto, setUploadedPhoto] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwds, setShowPwds] = useState(false);
  const cl = new cloudinary.Cloudinary({ cloud_name: "dhlv7gcew" });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });

  const handleUploadPhoto = () => {
    const widget_cloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhlv7gcew",
        uploadPreset: "uploadPreset",
        sources: ["local"],
        resourceType: ["image"],
        clientAllowedFormats: ["image"],
      },
      (err, result) => {
        if (!err && result && result.event === "success") {
          const photoUrl = result.info.secure_url;
          setUploadedPhoto(photoUrl); // Almacenar la URL de la foto subida
          toast("Imagen subida con éxito");
        }
      }
    );

    widget_cloudinary.open();
  };

  useEffect(() => {
    const boton_photo = document.querySelector("#btn-photo");
    boton_photo.addEventListener("click", handleUploadPhoto);
  }, []);

  const onSubmit = async (data) => {
    try {
      // Agregar la URL de la foto al objeto de datos antes de enviarlo
      const userData = {
        ...data,
        image: uploadedPhoto,
      };

      dispatch(postUser(userData));
      reset();
      toast("Usuario creado correctamente");
      navigate("/login");
    } catch (error) {
      toast.error(error, {
        duration: 1000,
      });
    }
  };

  return {
    uploadedPhoto,
    showPwd,
    setShowPwd,
    showPwds,
    setShowPwds,
    cl,
    register,
    handleSubmit,
    errors,
    watch,
    onSubmit,
  };
};
