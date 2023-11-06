import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addCartCandy, getCandy, getUserById } from "../redux/actions";

export const useCandyContainer = () => {
  const storeProductCount = window.localStorage.getItem("productCount");
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.allCandy);
  const [productCount, setProductCount] = useState(0);

  const candyProduct = products.filter((active) => active.activeCandy === true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const combos = candyProduct.filter(
    (product) => product.category === "combos"
  );
  const pochoclos = candyProduct.filter(
    (product) => product.category === "pochoclos"
  );
  const bebidas = candyProduct.filter(
    (product) => product.category === "bebidas"
  );
  const snacks = candyProduct.filter(
    (product) => product.category === "snacks"
  );
  const cafeteria = candyProduct.filter(
    (product) => product.category === "cafeteria"
  );
  const golosinas = candyProduct.filter(
    (product) => product.category === "golosinas"
  );

  const addCart = (name) => {
    if (productCount >= 10) {
      toast.dismiss(); // Limpiar la alerta existente si hay alguna
      toast.error("Has alcanzado el límite de 10 productos en tu carrito.", {
        duration: 3000,
      });
      return;
    }
    dispatch(addCartCandy(name));
    toast.dismiss(); // Limpiar la alerta existente si hay alguna
    toast.success("Producto agregado al carrito", {
      duration: 2000,
    });

    localStorage.setItem("productCount", productCount + 1);
    setProductCount(productCount + 1);
  };

  useEffect(() => {
    if (userData?.id) {
      dispatch(getUserById(userData.id));
    }
    if (products.length === 0) {
      dispatch(getCandy()).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    if (storeProductCount) {
      setProductCount(Number(storeProductCount));
    }
  }, []);
  return {
    loading,
    setLoading,
    combos,
    pochoclos,
    bebidas,
    snacks,
    cafeteria,
    golosinas,
    addCart,
    productCount,
    setProductCount,
    isCartOpen,
    setIsCartOpen,
  };
};
