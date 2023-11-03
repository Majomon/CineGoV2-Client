import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Ticket from "../../components/Ticket/Ticket";
import TicketModal from "../../components/TicketModal/TicketModal";
import {
  addCart,
  getUserById,
  postAllTickets,
  removeAllCart,
  removeOneCart,
  saveCart,
} from "../../redux/actions";
import TicketWeb from "../../components/TicketWeb/TicketWeb";

const TicketContainer = () => {
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const storedMovie = JSON.parse(window.localStorage.getItem("movie"));
  const cart = useSelector((state) => state.cart);
  const storeProductCount = localStorage.getItem("productCount");
  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const tickets = [
    {
      id: storedMovie.id,
      showId: storedMovie.showId.id,
      idTicket: 1,
      name: "Entrada General",
      image:
        "https://static.cinemarkhoyts.com.ar/Images/TicketTypeImage/1687.png",
      price: 200,
      description:
        "Entrada Promocional No acumulable con otras promociones. Lunes y martes.",
      type: "show",
    },
    {
      id: storedMovie.id,
      showId: storedMovie.showId.id,
      idTicket: 2,
      name: "Entrada CineFan",
      image:
        "https://static.cinemarkhoyts.com.ar/Images/TicketTypeImage/1667.png",
      price: 290,
      description: "Incluye 2 entradas + Tarjeta Virtual.",
      type: "show",
    },
  ];

  const cinefan = tickets.filter((ticket) => ticket.name === "Entrada CineFan");
  const general = tickets.filter((ticket) => ticket.name === "Entrada General");

  const addToCard = (name) => {
    if (productCount >= 10) {
      toast.dismiss();
      toast.error("Has alcanzado el límite de 10 productos en tu carrito.", {
        duration: 3000,
      });
      return;
    }
    dispatch(addCart(name));
    toast.dismiss();
    toast.success("Producto agregado al carrito", {
      duration: 2000,
    });
    localStorage.setItem("productCount", productCount + 1);
    setProductCount(productCount + 1);
  };

  const delRemoveCart = (name, all = false) => {
    if (all) {
      let nombre = cart.find((product) => product.name === name);

      dispatch(removeAllCart(name));
      window.localStorage.removeItem("cart");
      setProductCount(productCount - nombre.count);
      localStorage.setItem("productCount", productCount - nombre.count);
    } else {
      dispatch(removeOneCart(name));
      window.localStorage.removeItem("cart");
      setProductCount(productCount - 1);
      localStorage.setItem("productCount", productCount - 1);
    }
  };

  const handleClick = () => {
    if (!userData) {
      navigate("/login");
    }
    if (!cart.length) {
      toast.error("Agrega elementos al carrito");
    } else {
      navigate("/candy");
    }
  };

  const subtotal = cart.reduce((acc, el) => acc + parseFloat(el.price), 0);
  const servicio = subtotal * 0.1;
  const total = subtotal + servicio;
  // const descuento =
  //   userData?.cinePlus === "Gold"
  //     ? Math.round(total * 0.8)
  //     : userData?.cinePlus === "Black"
  //     ? Math.round(total * 0.65)
  //     : total;

  useEffect(() => {
    dispatch(postAllTickets(tickets));
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      dispatch(saveCart(JSON.parse(storedCart)));
    }
  }, []);

  useEffect(() => {
    if (userData?.id) {
      dispatch(getUserById(userData.id));
    }
    if (storeProductCount) {
      setProductCount(Number(storeProductCount));
    }
  }, []);

  useEffect(() => {
    if (cart.length) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div className="w-full min-h-screen mt-14 flex flex-col lg:flex-row">
      <Toaster />
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="flex flex-col md:flex-row md:mt-40 items-center justify-center mt-6 lg:mt-20">
          <div className="w-full flex flex-col items-center mb-10">
            <h4 className="mb-4">Sumate a cineFan</h4>
            {cinefan?.map(({ idTicket, name, description, price, image }) => (
              <Ticket
                key={idTicket}
                idTicket={idTicket}
                name={name}
                description={description}
                price={price}
                image={image}
                addToCard={() => addToCard(name)}
              />
            ))}
          </div>
          <div className="w-full flex flex-col items-center mb-10">
            <h4 className="mb-4">General</h4>
            {general?.map(({ idTicket, name, description, price, image }) => (
              <Ticket
                key={idTicket}
                idTicket={idTicket}
                name={name}
                description={description}
                price={price}
                image={image}
                addToCard={() => addToCard(name)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Botón de carrito flotante */}
      {!isCartOpen && (
        <button
          className="fixed lg:hidden top-16  right-4 sm:right-8  bg-primary-600 hover:bg-primary-500 dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700 text-white font-bold p-2 rounded cursor-pointer z-10"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
              <path d="M17 17H6V3H4" />
              <path d="m6 5l14 1l-1 7H6" />
            </g>
          </svg>
        </button>
      )}

      {isCartOpen && (
        <TicketModal
          storedMovie={storedMovie}
          cart={cart}
          subtotal={subtotal}
          servicio={servicio}
          total={total}
          handleClick={handleClick}
          delRemoveCart={delRemoveCart}
          addToCard={addToCard}
          productCount={productCount}
          setProductCount={setProductCount}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
        />
      )}

      <TicketWeb
        storedMovie={storedMovie}
        cart={cart}
        subtotal={subtotal}
        servicio={servicio}
        total={total}
        handleClick={handleClick}
        delRemoveCart={delRemoveCart}
        addToCard={addToCard}
        productCount={productCount}
        setProductCount={setProductCount}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
      />
    </div>
  );
};

export default TicketContainer;
