import Cart from "../Cart/Cart";

function TicketWeb({
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
}) {
  return (
    <div className="w-1/3 h-full hidden lg:flex py-10 flex-col items-center">
      <div className="w-72  mx-auto rounded shadow-xl bg-primary-50 dark:bg-dark-950 dark:shadow-gray-700 flex flex-col ">
        {storedMovie && (
          <div className="w-full flex flex-col items-center">
            <img
              src={storedMovie.image}
              alt={storedMovie.title}
              className="w-full h-60 rounded-t-lg"
            />
            <p className=" px-2 py-1 font-bold text-base mb-1 mt-1 text-gray-700 dark:text-white">
              {storedMovie.title}
            </p>
          </div>
        )}
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
        </div>
      </div>
    </div>
  );
}

export default TicketWeb;