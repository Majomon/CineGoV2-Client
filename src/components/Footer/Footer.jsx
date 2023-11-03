import React from "react";
import { Link } from "react-router-dom";
import cinego_blanco from "../../assets/cinego_blanco.png";
import cinego_negro from "../../assets/cinego_negro.png";
import "@fortawesome/fontawesome-free/css/all.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer({ theme }) {
  return (
    <footer className="w-full  bg-gray-800 dark:bg-black">
      <div className="w-full flex lg:justify-evenly relative">
        {/*     <div className="w-1/4 hidden xl:flex pl-12 absolute left-0">
          <Link className="w-40" to="/">
            {theme === "dark" ? (
              <img src={cinego_blanco} alt="CineGO" />
            ) : (
              <img src={cinego_negro} alt="CineGO" />
            )}
          </Link>
        </div> */}
        <div className="w-full lg:w-3/5 flex flex-col sm:flex-row items-center justify-around py-2">
          <span className="p-2 md:p-4 text-sm">
            <Link
              className="text-base  text-gray-200 hover:text-gray-300 hover:border-b hover:border-b-gray-300  dark:hover:text-red-700  dark:hover:border-b-red-700"
              to="/"
            >
              Cartelera
            </Link>
          </span>
          <span className="p-2 md:p-4 lg:p-6 text-sm">
            <Link
              className="text-base  text-gray-200 hover:text-gray-300 hover:border-b hover:border-b-gray-300  dark:hover:text-red-700  dark:hover:border-b-red-700"
              to="/candy"
            >
              Candy
            </Link>
          </span>
          <span className="p-2 md:p-4 lg:p-6 text-sm">
            <Link
              className="text-base  text-gray-200 hover:text-gray-300 hover:border-b hover:border-b-gray-300  dark:hover:text-red-700  dark:hover:border-b-red-700"
              to="/cinePlus"
            >
              CinePlus
            </Link>
          </span>
          <span className="p-2 md:p-4 lg:p-6 text-sm">
            <Link
              className="text-base  text-gray-200 hover:text-gray-300 hover:border-b hover:border-b-gray-300  dark:hover:text-red-700  dark:hover:border-b-red-700"
              to="/contact"
            >
              Contacto
            </Link>
          </span>
          <span className="p-2 md:p-4 lg:p-6 text-sm">
            <Link
              className="text-base text-gray-200 hover:text-gray-300 hover:border-b hover:border-b-gray-300  dark:hover:text-red-700  dark:hover:border-b-red-700"
              to="https://github.com/sebatora/CineGO"
              target="_blank"
            >
              Repositorio
            </Link>
          </span>
        </div>
      </div>

      <div className="mx-auto border-t border-t-light-200 dark:border-t-light-900 text-center">
        <p className="mt-2 mb-2 text-xs text-gray-200">
          Todos los derechos reservados © 2023 <b>| CineGO</b>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
