import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassUser } from "../redux/actions";

export const useResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await dispatch(forgotPassUser(data));

      if (typeof response === "string") {
        toast.error(
          "Los datos son incorrectos. Por favor, intenta nuevamente."
        );
      } else {
        reset();
        navigate("/login");
        toast.success("Su nueva contraseña fue enviada", {
          duration: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
  };
};
