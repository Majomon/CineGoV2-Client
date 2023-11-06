import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";
import { loginUser } from "../redux/actions";

export const useLogin = () => {
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const [showPwd, setShowPwd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginWithGoogle, loading, setLoading } = useAuth();

  const onSubmit = (data) => {
    setLoading(true);
    try {
      dispatch(loginUser(data));
      window.localStorage.removeItem("movie");
      window.localStorage.removeItem("cart");
      window.localStorage.removeItem("productCount");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      window.localStorage.removeItem("movie");
      window.localStorage.removeItem("cart");
      window.localStorage.removeItem("productCount");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.email) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Iniciaste sesión exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  }, [userData]);

  return {
    showPwd,
    setShowPwd,
    register,
    handleSubmit,
    errors,
    reset,
    loading,
    onSubmit,
    handleLoginGoogle,
  };
};
