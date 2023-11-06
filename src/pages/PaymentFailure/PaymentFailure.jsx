import { Link } from "react-router-dom";
import PaymentError from "../../assets/payment_error.png";

const PaymentFailure = () => {
  return (
    <div className="w-full h-[80vh] flex mt-20">
      <div className="w-11/12 flex flex-col md:flex-row items-center justify-around mx-auto">
        <div className="w-full flex flex-col justify-center items-center">
          <h1>¡Oh no!</h1>
          <h4>Ha ocurrido un error en el pago.</h4>
          <Link className="mt-6" to="/">
            <h3 className="text-primary-600 hover:text-primary-400  dark:text-red-700 dark:hover:text-red-600">
              Volver a la página principal
            </h3>
          </Link>
        </div>
        <div className="w-full">
          <img
            src={PaymentError}
            alt="Imagen Error"
            className="w-[250px] md:w-[400px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
