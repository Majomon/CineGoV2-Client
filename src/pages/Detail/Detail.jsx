import React from "react";
import { Toaster } from "react-hot-toast";
import ReactStars from "react-stars";
import Spinner from "../../components/Spinner/Spinner";
import { useDetail } from "../../hooks/useDetail";
import Error404 from "../../pages/Error404/Error404";

function Detail() {
  const {
    activeTrailer,
    detail,
    handleChangeRating,
    handleClickDate,
    handleClickShow,
    handleSubmit,
    loading,
    rating,
    selectedDay,
    selectedShow,
    setActiveTrailer,
  } = useDetail();
  return (
    <>
      {!detail.id || detail.activeMovie === false ? (
        <Error404 />
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-full flex flex-col pt-14 lg:p-20">
          <Toaster />
          <div className="w-full flex flex-col lg:flex-row">
            {/* Video,imagen e info */}
            <div className="w-full h-full lg:w-4/12 xl:w-3/12 flex flex-col sm:flex-row lg:flex-col  justify-center  sm:p-2">
              {/* Video,imagen y estrellas(clasificacion) */}
              <div className="w-full relative ">
                <img
                  className="w-full h-[350px]"
                  src={detail.image}
                  alt={detail.title}
                />
                <div className="absolute right-0 top-0 z-10">
                  <h3 className="bg-white rounded-bl-xl dark:text-black p-1">
                    {detail.clasification}
                  </h3>
                </div>
                <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center ">
                  <button onClick={() => setActiveTrailer(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-20 h-20 fill-gray-300 hover:fill-gray-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <ReactStars
                  className="w-full flex justify-center p-4"
                  count={5}
                  size={30}
                  value={rating}
                  onChange={handleChangeRating}
                />
              </div>

              {/* Info */}
              <ul className="w-full">
                <li className="pb-2 ml-2 lg:ml-0">
                  <h4 className="text-2xl">Género:</h4>
                  <p className="text-md my-1 ml-4">
                    {detail.genres?.map((genre) => genre.name).join(" - ")}
                  </p>
                </li>
                <li className="p-2 ml-2 lg:ml-0">
                  <h4 className="text-2xl">Director:</h4>
                  <p className="text-base my-1 ml-4">{detail.director}</p>
                </li>
                <li className="p-2 ml-2 lg:ml-0">
                  <h4 className="text-2xl">Actores:</h4>
                  <p className="text-base my-1 ml-4">{detail.actors}</p>
                </li>
                <li className="p-2 ml-2 lg:ml-0">
                  <h4 className="text-2xl">Duración:</h4>
                  <p className="text-base my-1 ml-4">{detail.duration} min</p>
                </li>
              </ul>
            </div>
            {/* Titulo y funciones */}
            <div className="w-full lg:w-7/12 xl:8/12 flex flex-col lg:mx-auto">
              <h2 className="lg:w-full py-4 mx-4 lg:pb-4 border-b-4 border-b-light-300 dark:border-b-dark-700 text-2xl lg:text-3xl text-center">
                {detail.title}
              </h2>
              <div className="lg:w-full mb-2 p-2 ml-2 lg:ml-0">
                <h3 className="my-4 text-3xl">Sinopsis</h3>
                <p className="text-xl">{detail.description}</p>
              </div>
              <div className="lg:w-4/5 mb-6 flex flex-col">
                <div className="my-2 p-2 ml-2 lg:ml-0">
                  <h3>Funciones</h3>
                  <div className="flex flex-wrap lg:flex-row items-center lg:justify-start">
                    {detail.shows
                      ?.map((show) => show.date)
                      .filter(
                        (date, index, array) => array.indexOf(date) === index
                      )
                      .map((date) => (
                        <div className="lg:my-4 flex items-center" key={date}>
                          <button
                            key={date}
                            onClick={() => handleClickDate(date)}
                            className={`py-4 px-5 m-1 mr-3 font-bold rounded-md shadow-md dark:shadow-dark-700 hover:scale-105 dark:text-white border border-gray-400 ${
                              selectedDay === date
                                ? "text-white bg-primary-600 hover:bg-primary-500 shadow-none dark:bg-dark-700 hover:dark:bg-dark-600 border-none"
                                : ""
                            }`}
                          >
                            {date}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                {selectedDay && (
                  <div className="my-2 p-2 ml-2 lg:ml-0">
                    <h3>Horarios:</h3>
                    <div className="flex flex-wrap lg:items-start">
                      {detail.shows
                        ?.filter((show) => show.date === selectedDay)
                        .map((show) => (
                          <div
                            key={show.id}
                            onClick={() => handleClickShow(show)}
                            className="my-4 flex items-center"
                          >
                            <button
                              className={`py-4 px-5 m-1 mr-3 font-bold rounded-md shadow-md dark:shadow-dark-700 hover:scale-105 dark:text-white border border-gray-400 ${
                                selectedShow === show
                                  ? "text-white bg-primary-600 hover:bg-primary-500 shadow-none dark:bg-dark-700 hover:dark:bg-dark-600 border-none"
                                  : ""
                              }`}
                            >
                              {show.hour}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center py-10 lg:py-0">
                <button
                  onClick={handleSubmit}
                  className={
                    selectedShow
                      ? "bg-primary-600 hover:bg-primary-500  text-white border-none px-2 py-4 text-center text-2xl rounded cursor-pointer animate-tambaleo font-bold dark:shadow-xl shadow-xl shadow-light-600  dark:shadow-red-600 dark:bg-red-700"
                      : "bg-slate-200 text-black shadow-md px-7 py-4 text-center text-2xl rounded font-bold "
                  }
                  type="submit"
                  disabled={!selectedShow}
                >
                  ¡Comprar entradas!
                </button>
              </div>
            </div>
          </div>

          {/* Trailer (youtube) */}
          {activeTrailer && (
            <div className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 z-50 bg-black/90 flex justify-center items-center">
              <iframe
                className="w-full lg:w-3/4 h-full lg:h-1/2"
                src={detail.trailer}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <button
                className="absolute right-0 top-6 m-6 rounded-full bg-black opacity-80"
                onClick={() => setActiveTrailer(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-12 h-12 fill-red-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Detail;
