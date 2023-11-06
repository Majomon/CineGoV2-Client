import React from "react";
import { Toaster } from "react-hot-toast";
import CandyCard from "../../components/CandyCard/CandyCard";
import CandyCarrito from "../../components/CandyCarrito/CandyCarrito";
import CandyCarritoModal from "../../components/CandyCarritoModal/CandyCarritoModal";
import Spinner from "../../components/Spinner/Spinner";
import { useCandyContainer } from "../../hooks/useCandyContainer";

function CandyContainer() {
  const {
    addCart,
    bebidas,
    cafeteria,
    combos,
    golosinas,
    isCartOpen,
    loading,
    pochoclos,
    productCount,
    setIsCartOpen,
    setLoading,
    setProductCount,
    snacks,
  } = useCandyContainer();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen">
          <Toaster />
          <div className="w-full flex flex-col">
            <div className="w-full lg:w-2/3 mt-20 md:mt-28 flex flex-col items-center px-14 pb-14">
              {combos.length ? (
                <>
                  <h2 className="p-2 my-4 bg-primary-600   text-white border-none  text-center text-2xl rounded animate-tambaleo font-bold dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700">
                    Combos
                  </h2>
                  <div className="w-full flex flex-wrap justify-center">
                    {combos.map(({ id, name, description, price, image }) => (
                      <CandyCard
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        price={price}
                        image={image}
                        addCart={() => addCart(name)}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {pochoclos.length ? (
                <>
                  <h2 className="p-2 my-4 bg-primary-600  text-white border-none  text-center text-2xl rounded animate-tambaleo font-bold dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700">
                    Pochoclos
                  </h2>
                  <div className="w-full flex flex-wrap justify-center">
                    {pochoclos.map(
                      ({ id, name, description, price, image }) => (
                        <CandyCard
                          key={id}
                          id={id}
                          name={name}
                          description={description}
                          price={price}
                          image={image}
                          addCart={() => addCart(name)}
                        />
                      )
                    )}
                  </div>
                </>
              ) : null}

              {bebidas.length ? (
                <>
                  <h2 className="p-2 my-4 bg-primary-600  text-white border-none  text-center text-2xl rounded animate-tambaleo font-bold dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700">
                    Bebidas
                  </h2>
                  <div className="w-full flex flex-wrap justify-center">
                    {bebidas.map(({ id, name, description, price, image }) => (
                      <CandyCard
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        price={price}
                        image={image}
                        addCart={() => addCart(name)}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {snacks.length ? (
                <>
                  <h2 className="p-2 my-4 bg-primary-600  text-white border-none  text-center text-2xl rounded animate-tambaleo font-bold dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700">
                    Snacks
                  </h2>
                  <div className="w-full flex flex-wrap justify-center">
                    {snacks.map(({ id, name, description, price, image }) => (
                      <CandyCard
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        price={price}
                        image={image}
                        addCart={() => addCart(name)}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {cafeteria.length ? (
                <>
                  <h2 className="p-2 my-4 bg-primary-600  text-white border-none  text-center text-2xl rounded animate-tambaleo font-bold dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700">
                    Cafeteria
                  </h2>
                  <div className="w-full flex flex-wrap justify-center">
                    {cafeteria.map(
                      ({ id, name, description, price, image }) => (
                        <CandyCard
                          key={id}
                          id={id}
                          name={name}
                          description={description}
                          price={price}
                          image={image}
                          addCart={() => addCart(name)}
                        />
                      )
                    )}
                  </div>
                </>
              ) : null}

              {golosinas.length ? (
                <>
                  <h2 className="p-2 my-4 bg-primary-600 hover:bg-primary-500  text-white border-none  text-center text-2xl rounded animate-tambaleo font-bold dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700">
                    Golosinas
                  </h2>
                  <div className="w-full flex flex-wrap justify-center mb-12">
                    {golosinas.map(
                      ({ id, name, description, price, image }) => (
                        <CandyCard
                          key={id}
                          id={id}
                          name={name}
                          description={description}
                          price={price}
                          image={image}
                          addCart={() => addCart(name)}
                        />
                      )
                    )}
                  </div>
                </>
              ) : null}
            </div>

            {/* Botón de carrito flotante */}
            {!isCartOpen && (
              <button
                className="fixed lg:hidden mt-24 md:mt-32 right-4 sm:right-8  bg-primary-600 hover:bg-primary-500 dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700 text-white font-bold p-2 rounded cursor-pointer z-10"
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
              <CandyCarritoModal
                addCart={addCart}
                productCount={productCount}
                setProductCount={setProductCount}
                setIsCartOpen={setIsCartOpen}
                isCartOpen={isCartOpen}
              />
            )}

            <CandyCarrito
              addCart={addCart}
              productCount={productCount}
              setProductCount={setProductCount}
              setIsCartOpen={setIsCartOpen}
              isCartOpen={isCartOpen}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CandyContainer;
