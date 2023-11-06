import React from "react";
import {
  SiCss3,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMercadopago,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSequelize,
  SiTailwindcss,
  SiTrello,
  SiVite,
} from "react-icons/si";
import { Link } from "react-router-dom";
import { useAboutMembers } from "../../hooks/useAboutMembers";

const About = () => {
  const { teamMemberCards } = useAboutMembers();

  return (
    <div className="w-full mt-28">
      <h1 className="mb-6 text-4xl font-semibold text-center text-gray-700">
        ¿QUIENES SOMOS?
      </h1>
      <p className="w-full lg:w-4/6 mx-auto text-gray-600 p-4 lg:p-0">
        Somos un grupo de estudiantes en la etapa final del bootcamp de Henry,
        un programa intensivo de desarrollo de software. Nuestro equipo está
        comprometido en aplicar los conocimientos y habilidades adquiridas a lo
        largo del bootcamp para desarrollar una aplicación innovadora. Nos
        enfocamos en crear soluciones prácticas y eficientes que aborden las
        necesidades de los usuarios. Estamos emocionados de trabajar juntos y
        poner en práctica todo nuestro aprendizaje para ofrecer un producto
        sobresaliente en el mundo de la tecnología.
      </p>
      <div className="w-full lg:w-4/6 mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-1 p-2 lg:p-0">
          {teamMemberCards}
        </div>
      </div>
      {/* Tecnologías */}
      <div className="w-4/5 lg:w-full mt-1 font-medium text-gray-500 text-lg mx-auto">
        <p className="mt-10 text-xl text-center">Tecnologías utilizadas</p>
        <div className="grid grid-cols-4 place-items-center lg:flex lg:flex-row lg:items-center lg:justify-center my-10 gap-6 lg:gap-0">
          <Link to="https://es.react.dev" target="_blank">
            <SiReact className="text-3xl hover:scale-110 lg:mr-6 hover:text-blue-700" />
          </Link>
          <Link to="https://redux.js.org" target="_blank">
            <SiRedux className="text-3xl hover:scale-110 lg:mr-6 hover:text-indigo-800" />
          </Link>
          <Link to="https://nodejs.org/es" target="_blank">
            <SiNodedotjs className="text-3xl hover:scale-110 lg:mr-6 hover:text-green-600" />
          </Link>
          <Link
            to="https://developer.mozilla.org/es/docs/Web/HTML"
            target="_blank"
          >
            <SiHtml5 className="text-3xl hover:scale-110 lg:mr-6 hover:text-orange-600" />
          </Link>
          <Link
            to="https://developer.mozilla.org/es/docs/Web/CSS"
            target="_blank"
          >
            <SiCss3 className="text-3xl hover:scale-110 lg:mr-6 hover:text-blue-700" />
          </Link>
          <Link
            to="https://developer.mozilla.org/es/docs/Web/JavaScript"
            target="_blank"
          >
            <SiJavascript className="text-3xl hover:scale-110 lg:mr-6 hover:text-yellow-400" />
          </Link>
          <Link to="https://git-scm.com" target="_blank">
            <SiGit className="text-3xl hover:scale-110 lg:mr-6 hover:text-orange-600" />
          </Link>
          <Link to="https://www.postgresql.org" target="_blank">
            <SiPostgresql className="text-3xl hover:scale-110 lg:mr-6 hover:text-blue-700" />
          </Link>
          <Link to="https://sequelize.org" target="_blank">
            <SiSequelize className="text-3xl hover:scale-110 lg:mr-6 hover:text-blue-700" />
          </Link>
          <Link to="https://github.com" target="_blank">
            <SiGithub className="text-3xl hover:scale-110 lg:mr-6 hover:text-gray-600" />
          </Link>
          <Link to="https://vitejs.dev" target="_blank">
            <SiVite className="text-3xl hover:scale-110 lg:mr-6 hover:text-yellow-400" />
          </Link>
          <Link to="https://firebase.google.com/?hl=es" target="_blank">
            <SiFirebase className="text-3xl hover:scale-110 lg:mr-6 hover:text-orange-500" />
          </Link>
          <Link to="https://tailwindcss.com" target="_blank">
            <SiTailwindcss className="text-3xl hover:scale-110 lg:mr-6 hover:text-blue-500" />
          </Link>
          <Link to="https://trello.com" target="_blank">
            <SiTrello className="text-3xl hover:scale-110 lg:mr-6 hover:text-blue-800" />
          </Link>
          <Link to="https://www.figma.com/" target="_blank">
            <SiFigma className="text-3xl hover:scale-110 lg:mr-6 hover:text-purple-700" />
          </Link>
          <Link to="https://www.mercadopago.com.ar" target="_blank">
            <SiMercadopago className="text-3xl hover:scale-110 lg:mr-6 hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
