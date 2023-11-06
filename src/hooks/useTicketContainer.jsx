import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCart,
  getUserById,
  postAllTickets,
  removeAllCart,
  removeOneCart,
  saveCart,
} from "../redux/actions";

export const useTicketContainer = () => {
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const storedMovie = JSON.parse(window.localStorage.getItem("movie"));
  const storeProductCount = localStorage.getItem("productCount");

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
    {
      id: storedMovie.id,
      showId: storedMovie.showId.id,
      idTicket: 3,
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
      idTicket: 4,
      name: "Entrada CineFan",
      image:
        "https://static.cinemarkhoyts.com.ar/Images/TicketTypeImage/1667.png",
      price: 290,
      description: "Incluye 2 entradas + Tarjeta Virtual.",
      type: "show",
    },
  ];

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

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

  const delRemoveCart = (name, all = false, type) => {
    if (all) {
      let nombre = cart.find((product) => product.name === name);
      dispatch(removeAllCart(name));
      window.localStorage.removeItem("cart");
      setProductCount(productCount - nombre.count);
      localStorage.setItem("productCount", productCount - nombre.count);
    } else {
      console.log(type);
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

  return {
    cinefan,
    general,
    storedMovie,
    cart,
    subtotal,
    servicio,
    total,
    handleClick,
    delRemoveCart,
    addToCard,
    productCount,
    setProductCount,
    setIsCartOpen,
    isCartOpen,
    addToCard,
    delRemoveCart,
    handleClick,
  };
};
