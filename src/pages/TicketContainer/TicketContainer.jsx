import React from "react";
import { Toaster } from "react-hot-toast";
import Ticket from "../../components/Ticket/Ticket";
import TicketModal from "../../components/TicketModal/TicketModal";
import TicketWeb from "../../components/TicketWeb/TicketWeb";
import { useTicketContainer } from "../../hooks/useTicketContainer";

const TicketContainer = () => {
  const {
    addToCard,
    cart,
    cinefan,
    delRemoveCart,
    general,
    handleClick,
    isCartOpen,
    productCount,
    servicio,
    setIsCartOpen,
    setProductCount,
    storedMovie,
    subtotal,
    total,
  } = useTicketContainer();
  
  return (
    <div className="w-full min-h-[90vh] mt-24 md:my-28 flex flex-col lg:flex-row">
      <Toaster />
      <div className="w-full lg:w-2/3 flex flex-col items-center">
        <div className="flex flex-col  items-center justify-center">
          <div className="w-full flex flex-col items-center mb-10 ">
            <h4 className="mb-4">Sumate a cineFan</h4>
            <div className="flex flex-col md:flex-row">
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
          </div>
          <div className="w-full flex flex-col items-center mb-10">
            <h4 className="mb-4">General</h4>
            <div className="flex flex-col md:flex-row">
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
        <button
          className="w-60  lg:hidden my-2 py-3 px-10 xl:px-24 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-sm text-xs dark:shadow-lg shadow-lg shadow-light-600  dark:shadow-red-600 dark:bg-red-700"
          onClick={handleClick}
        >
          Siguiente
        </button>
      </div>

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

      {/* Botón de carrito flotante */}
      {!isCartOpen && (
        <button
          className="fixed lg:hidden mt-4 md:mt-2 right-4 sm:right-8  bg-primary-600 hover:bg-primary-500 dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700 text-white font-bold p-2 rounded cursor-pointer z-10"
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
    </div>
  );
};

export default TicketContainer;
