import iconoIn from "../assets/Linkedin.png";
import iconoGit from "../assets/github.png";
import iconoCv from "../assets/iconCv.png";

export const useAboutMembers = () => {
  const teamMembers = [
    {
      name: "Andrea Buldorini",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688397486/About/Andy_gyemap.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl:
        "https://www.linkedin.com/in/andrea-soledad-buldorini-462690113/",
      githubUrl: "https://github.com/abuldori",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
      cvUrl:
        "https://drive.google.com/file/d/1aBjnWrBTE30FTKUf5oeiYvKdEXXWdzXW/view?usp=sharing",
    },
    {
      name: "Sebastian Toranzo",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688397487/About/Seba_b9jcas.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl: "https://www.linkedin.com/in/sebatora/",
      githubUrl: "https://github.com/sebatora",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
      cvUrl:
        "https://drive.google.com/file/d/1TiElcIJXrdAOWVrMgrImwQM_Or8KZXMZ/view?usp=sharing",
    },
    {
      name: "Camila Manita",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688397486/About/Cami_tqxspq.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl: "https://www.linkedin.com/in/camila-manita/",
      githubUrl: "https://github.com/CamilaManita",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
      cvUrl:
        "https://drive.google.com/file/d/1ZCl3oNQsj58jGxK7l_IKeLtlLESpi0zZ/view?usp=drive_link",
    },
    {
      name: "Mauricio Monzón",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688586114/About/Mauri_ktgxsq.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl: "https://www.linkedin.com/in/mauricio-monzon/",
      githubUrl: "https://github.com/majomon",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
      cvUrl:
        "https://docs.google.com/document/d/1O0pTiSyaPxHDL86wrXmFrj7SwdvqZUEHhNj2pLZMXRo/edit?usp=sharing",
    },
    {
      name: "Franco Bogado",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688397486/About/Fran_p5nicv.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl: "https://www.linkedin.com/in/franco-bogado-a5b18216a/",
      githubUrl: "https://github.com/FrancoNat",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
      cvUrl:
        "https://drive.google.com/file/d/1zG1rLWFJ1G6n02Sj5m3gDDdWeTsRKR9w/view?usp=drivesdk",
    },
    {
      name: "Percy Huanca",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688397486/About/Percy_q1mxxn.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl: "https://www.linkedin.com/in/percydh673002/",
      githubUrl: "https://github.com/PercyH67",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
    },
    {
      name: "Jorge Daza Vega",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688397486/About/Jor_uv77yc.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl: "https://www.linkedin.com/in/jorge-daza-vega-35904b177/",
      githubUrl: "https://github.com/GeorgeDaz",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
      cvUrl:
        "https://docs.google.com/document/d/1EmwObDhXs2_pZ9yEVOvLhGVb3OJ0l3nX/edit?usp=sharing&ouid=116476905909793949320&rtpof=true&sd=truegia",
    },
    {
      name: "Matías Medina",
      photoUrl:
        "https://res.cloudinary.com/dhyqgl7ie/image/upload/v1688397486/About/Maty_aupho3.jpg",
      description: "Full Stack web developer.",
      contacto: "Contáctame:",
      linkedinUrl: "https://www.linkedin.com/in/mat%C3%ADas-medina-844181242/",
      githubUrl: "https://github.com/MatiasMedina02",
      linkedinIcon: iconoIn,
      githubIcon: iconoGit,
      iconoCv: iconoCv,
      cvUrl:
        "https://drive.google.com/file/d/1oocYZ4IPkDyPo50tAf2W1_Qxdi3HPn-x/view?usp=sharing",
    },
  ];

  const shuffledTeamMembers = [...teamMembers].sort(() => Math.random() - 0.5);
  const teamMemberCards = shuffledTeamMembers.map((member) => (
    <div key={member.name} className="w-full p-2">
      <div className="bg-slate-300 rounded-lg  p-4 shadow-xl shadow-gray-400 dark:shadow-gray-900 hover:shadow-light-600 dark:hover:shadow-xl dark:hover:shadow-red-600">
        <img
          src={member.photoUrl}
          alt={member.name}
          className="mx-auto w-24 h-24 rounded-full mt-4"
        />
        <div className="text-center py-4">
          <h2 className="text-lg font-semibold dark:text-black">
            {member.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-600">
            {member.description}
          </p>
        </div>
        <div className="flex justify-center space-x-2 pb-4">
          <a
            className="hover:scale-110"
            href={member.linkedinUrl}
            target="_blank"
          >
            <img src={member.linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a
            className="hover:scale-110"
            href={member.githubUrl}
            target="_blank"
          >
            <img src={member.githubIcon} alt="Github" className="w-6 h-6" />
          </a>
          {member.cvUrl && (
            <a
              className="hover:scale-110"
              href={member.cvUrl}
              target="_blank"
              download
            >
              <img
                src={member.iconoCv}
                alt="Curriculum Vitae"
                className="w-6 h-6"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  ));

  return {teamMemberCards}
};
