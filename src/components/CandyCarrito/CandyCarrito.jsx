import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllCartCandy,
  removeOneCartCandy,
  saveCart,
} from "../../redux/actions";
import { useEffect } from "react";
import { GoTrash } from "react-icons/go";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

function CandyCarrito({ addCart, productCount, setProductCount }) {
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const storedCart = window.localStorage.getItem("cart");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const storedMovie = JSON.parse(window.localStorage.getItem("movie"));

  const subtotal = cart.reduce((acc, el) => acc + parseFloat(el.price), 0);
  const servicio = subtotal * 0.1;
  const total = subtotal + servicio;
  // const descuento =
  //   userData?.cinePlus === "Gold"
  //     ? Math.floor(total * 0.8)
  //     : userData?.cinePlus === "Black"
  //     ? Math.floor(total * 0.65)
  //     : total;
  const valueFormatter = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const delRemoveCart = (name, all = false) => {
    if (all) {
      let nombre = cart.find((product) => product.name === name);
      dispatch(removeAllCartCandy(name));
      window.localStorage.removeItem("cart");
      setProductCount(productCount - nombre.count);
      localStorage.setItem("productCount", productCount - nombre.count);
    } else {
      dispatch(removeOneCartCandy(name));
      window.localStorage.removeItem("cart");
      setProductCount(productCount - 1);
      localStorage.setItem("productCount", productCount - 1);
    }
  };

  const handlePay = async () => {
    try {
      if (!cart.length) {
        toast.error("Debes seleccionar un producto", {
          duration: 3000,
        });
        return;
      }
      const { data } = await axios.post("/payment", { cart, userData });
      const items = cart.map((product) => ({
        itemId: product.id,
        showId: product.showId ? product.showId : null,
        price: product.price,
        quantity: product.count,
        type: product.type,
      }));

      const orderPurchase = {
        userId: userData.id,
        items,
        totalPrice: total,
      };
      Swal.fire({
        title: "<h2 style='color: black;'>¿Estás seguro de continuar?</h2>",
        showDenyButton: true,
        cancelButtonColor: "#ef233c",
        confirmButtonColor: "#38b000",
        confirmButtonText: "¡Si, estoy seguro!",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.localStorage.setItem(
            "orderPurchase",
            JSON.stringify(orderPurchase)
          );
          window.localStorage.removeItem("productCount");
          window.localStorage.removeItem("cart");
          window.localStorage.removeItem("movie");
          window.location.href = data.init_point;
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Debes ingresar a tu cuenta primero", {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (storedCart) {
      dispatch(saveCart(JSON.parse(storedCart)));
    }
  }, []);

  useEffect(() => {
    if (cart.length) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div className="w-1/3 absolute opacity-0 lg:opacity-100 sm:absolute  right-6 mt-24 md:mt-32 lg:flex flex-col items-center -z-50 lg:z-10">
      <Toaster />
      <div className="w-10/12 flex flex-col my-4 rounded overflow-hidden shadow-lg bg-primary-50 dark:bg-dark-950 shadow-light-600 dark:shadow-red-600">
        {storedMovie && (
          <div className="w-full flex flex-col items-center">
            <img
              src={storedMovie.image}
              alt={storedMovie.title}
              className="w-full h-[400px]"
            />
            <p className="px-2 py-1 font-bold text-base mb-1 mt-1 text-gray-700 dark:text-white">
              {storedMovie.title}
            </p>
          </div>
        )}
        <div className="px-2 font-bold text-lg mb-1 text-gray-700 dark:text-white">
          Productos seleccionados:
        </div>
        <div className="px-2 py-1">
          <hr />
          {cart?.map((item, index) => (
            <div key={index} className="flex items-center border-b">
              <button
                onClick={() => delRemoveCart(item.name, true)}
                className="rounded-full h-5 w-5 mr-3 ml-1 mt-0 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-semibold transition-colors duration-300"
              >
                <GoTrash className="text-xl mx-1" />
              </button>
              <div className="mr-2 mt-0 text-sm font-bold text-gray-700 dark:text-white">
                {item.count} {item.name}
              </div>
              <div className="flex items-center my-2 ml-auto">
                <p className="mr-1 mt-0 text-sm font-bold text-gray-700 dark:text-white">
                  $ {valueFormatter(item.price)}
                </p>
                <button
                  onClick={() => delRemoveCart(item.name)}
                  className="rounded-full h-6 w-6 ml-1 mr-2 mt-0 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-semibold transition-colors duration-300"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    addCart(item.name);
                  }}
                  className="rounded-full h-6 w-6 ml-1 mr-2 mt-0 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-semibold transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-2 pt-2 font-bold text-sm mb-1 text-gray-700 dark:text-white">
          Subtotal: $ {valueFormatter(subtotal)}
        </div>
        <div className="px-2 font-bold text-sm mb-1 text-gray-700 dark:text-white">
          Cargo por servicio: $ {valueFormatter(servicio)}
        </div>
        <div className="px-2 font-bold text-lg mb-1 text-gray-700 dark:text-white">
          <p>
            TOTAL: <span>$ {valueFormatter(total)}</span>
          </p>
        </div>
        <div className="px-4 py-3 mb-2 flex justify-center items-center">
          <Link to={`${!userData ? "/login" : "/candy"}`}>
            <button
              className=" py-1 px-12 xl:px-24 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded text-xs dark:shadow-lg shadow-lg shadow-light-600  dark:shadow-red-600 dark:bg-red-700"
              onClick={handlePay}
            >
              Comprar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CandyCarrito;
