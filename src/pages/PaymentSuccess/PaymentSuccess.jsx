import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaymentSuccessImage from "../../assets/payment_success.png";
import { postPurchases } from "../../redux/actions";

const PaymentSuccess = () => {
  const purchase = JSON.parse(window.localStorage.getItem("orderPurchase"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postPurchases(purchase));
  }, []);

  return (
    <div className="w-full h-[80vh] flex mt-20">
      <div className="w-11/12 flex flex-col md:flex-row items-center justify-around mx-auto">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="mb-2">¡Felicidades!</h1>
          <h4>Tu compra se ha completado correctamente.</h4>
          <Link className="mt-6" to="/">
            <h3 className="text-primary-600 hover:text-primary-400  dark:text-red-700 dark:hover:text-red-600">Volver a la página principal</h3>
          </Link>
        </div>
        <div className="w-full">
          <img
            src={PaymentSuccessImage}
            alt="Imagen Compra"
            className="w-[250px] md:w-[400px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
