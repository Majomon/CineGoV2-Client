import Cart from "../Cart/Cart";

function TicketModal({
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
}) {
  return (
    <div className="w-full h-full lg:hidden absolute py-10 flex flex-col items-center  bg-gray-600/90 dark:bg-black/95">
      <div className="w-72  mx-auto rounded shadow-xl bg-primary-50 dark:bg-dark-950 dark:shadow-red-600 flex flex-col ">
        <div className="px-2 py1">
          <hr />
          {cart?.map((item, index) => (
            <Cart
              key={index}
              id={item.id}
              price={item.price}
              name={item.name}
              count={item.count}
              delRemoveCart={delRemoveCart}
              addToCard={addToCard}
              productCount={productCount}
              setProductCount={setProductCount}
            />
          ))}
        </div>

        <div>
          <div className="px-2 pt-2 font-bold text-sm mb-1 text-gray-700 dark:text-white">
            Subtotal: $ {subtotal.toLocaleString("en-US")}
          </div>
          <div className="px-2 font-bold text-sm mb-1 text-gray-700 dark:text-white">
            Cargo por servicio: $ {servicio.toLocaleString("en-US")}
          </div>
          <div className="px-2 font-bold text-lg mb-1 text-gray-700 dark:text-white">
            <p>
              TOTAL: <span>$ {total.toLocaleString("en-US")}</span>
            </p>
          </div>
        </div>
        <div className="px-4 py-3 mb-2 flex flex-col  justify-center items-center">
          <button
            className="w-60 my-2  py-3 px-10 xl:px-24 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-sm text-xs dark:shadow-lg shadow-lg shadow-light-600  dark:shadow-red-600 dark:bg-red-700"
            onClick={handleClick}
          >
            Siguiente
          </button>
          <button
            className="w-60 my-2  py-3 px-10 xl:px-24 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-sm text-xs dark:shadow-lg shadow-lg shadow-light-600  dark:shadow-red-600 dark:bg-red-700"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            Más entradas
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketModal;
