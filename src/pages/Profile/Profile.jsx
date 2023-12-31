import { useState } from "react";
import ProfileChange from "../../components/ProfileChange/ProfileChange";
import ProfileSubscription from "../../components/ProfileSubscription/ProfileSubscription";
import ProfileSecurity from "../../components/ProfileSecurity/ProfileSecurity";
import ProfileRecord from "../../components/ProfileRecord/ProfileRecord";

function Profile() {
  const [activeComponent, setActiveComponent] = useState("profileChange");
  const userData = JSON.parse(window.localStorage.getItem("user"));

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="w-full h-full md:min-h-screen flex flex-col lg:flex-row mt-[10vh]">
      <div className="w-full lg:min-h-screen h-full lg:w-1/5 flex flex-col bg-light-300 dark:bg-slate-900">
        <h1 className="w-full my-2 lg:mt-5 text-center">Bienvenido</h1>
        <div className="w-full grid grid-cols-2 place-items-center sm:flex sm:justify-around lg:flex-col px-10 py-2">
          <button
            className={`w-24 lg:w-32 my-2 lg:my-4 text-start ${
              activeComponent === "profileChange" &&
              "font-bold border-b-4 border-primary-500 dark:border-dark-700 lg:ml-2 scale-105"
            }`}
            onClick={() => handleButtonClick("profileChange")}
            disabled={activeComponent === "profileChange"}
          >
            <span
              className={
                activeComponent === "profileChange" ? "text-light-700" : ""
              }
            >
              Perfil
            </span>
          </button>
          <button
            className={`w-24 lg:w-32 my-2 lg:my-4 text-start ${
              activeComponent === "profileSubscription" &&
              "font-bold border-b-4 border-primary-500 dark:border-dark-700 lg:ml-2 scale-105"
            }`}
            onClick={() => handleButtonClick("profileSubscription")}
            disabled={activeComponent === "profileSubscription"}
          >
            <span
              className={
                activeComponent === "profileSubscription"
                  ? "text-light-700"
                  : ""
              }
            >
              Suscripción
            </span>
          </button>
          {userData.password && (
            <button
              className={`w-24 lg:w-32 my-2 lg:my-4 text-start ${
                activeComponent === "profileSecurity" &&
                "font-bold border-b-4 border-primary-500 dark:border-dark-700 lg:ml-2 scale-105"
              }`}
              onClick={() => handleButtonClick("profileSecurity")}
              disabled={activeComponent === "profileSecurity"}
            >
              <span
                className={
                  activeComponent === "profileSecurity" ? "text-light-700" : ""
                }
              >
                Seguridad
              </span>
            </button>
          )}
          <button
            className={`hidden lg:flex w-24 lg:w-32 my-2 lg:my-4 text-start ${
              activeComponent === "profileRecord" &&
              "font-bold border-b-4 border-primary-500 dark:border-dark-700 lg:ml-2 scale-105"
            }`}
            onClick={() => handleButtonClick("profileRecord")}
            disabled={activeComponent === "profileRecord"}
          >
            <span
              className={
                activeComponent === "profileRecord" ? "text-light-700" : ""
              }
            >
              Compras
            </span>
          </button>
        </div>
      </div>
      <div className="w-full h-fit lg:w-4/5 flex justify-center items-center">
        {activeComponent === "profileChange" && <ProfileChange />}
        {activeComponent === "profileSubscription" && <ProfileSubscription />}
        {activeComponent === "profileSecurity" && <ProfileSecurity />}
        {activeComponent === "profileRecord" && <ProfileRecord />}
      </div>
    </div>
  );
}

export default Profile;
