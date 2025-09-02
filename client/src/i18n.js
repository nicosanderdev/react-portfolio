import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",
  returnObjects: true,
  resources: {
    en: {
      translation: {
        menu_about: "About me",
        menu_expertise: "Expertise",
        menu_experience: "Experience",
        menu_contact: "Contact",
        header_about: "about me",
        header_expertise: "expertise",
        header_experience: "experience",
        header_contact: "contact",
        files: "files",
        projects: "projects",
        about: {
          line1: "Hi! I’m a full-stack web developer with a strong focus on ASP.NET Core and React. Over the past 3+ years, I’ve helped businesses and teams build fast, scalable, and maintainable web applications — from backend APIs to modern frontends.",
          line2: "I’m passionate about writing clean code, building intuitive user interfaces, and solving real-world problems through software. Whether you're launching a new product or need help improving an existing app, I can support you with both hands-on development and technical guidance.",
          line3: "I work with a sharp eye for detail, a strong sense of responsibility, and a deep respect for deadlines. If you're looking for a developer who can combine solid engineering with clear communication, I’d love to hear about your project."
        },
        expertise: {
          backend_dev: {
            title: "Backend developer",
            short_label: "Backend dev",
            description: "Build powerful, scalable backends. I design RESTful APIs using ASP.NET Core, focusing on performance, security, and maintainability."
          },
          frontend_dev: {
            title: "Frontend developer",
            short_label: "Frontend dev",
            description: "Fast, interactive user interfaces. I create dynamic, modern UIs with React, emphasizing responsiveness and clean component architecture."
          },
          databases: {
            title: "Databases",
            short_label: "Database management",
            description: "Robust database integration. I use EF Core to handle data access and migrations, and I design SQL schemas for long-term reliability."
          },
          security: {
            title: "Security",
            short_label: "Security and authentication",
            description: "Secure user access. I implement Identity, JWT tokens, and role-based access control for secure, scalable applications."
          },
          api_design: {
            title: "API design",
            short_label: "API design",
            description: "Smooth backend-frontend workflows. I ensure APIs and UI are seamlessly integrated, using tools like Axios, Fetch, or SignalR when needed."
          },
          dev_ops: {
            title: "DevOps",
            short_label: "DevOps",
            description: "Maintainable architecture. I follow clean architecture principles and organize codebases for team collaboration and long-term growth."
          }
        },
        experience: {
          first: {
            years: "2020-2021",
            company: "Craneoteca Software Solutions",
            description: "Worked as a backend developer. Collaborated on the design and development of restful applications with Java technology. Rivera, Uruguay. www.craneoteca.com"
          },
          second: {
            years: "2021-2022",
            company: "Paigo",
            description: "One year working as a backend developer. Designed and built Java solutions to create financial reports, run periodical processes, and other diverse functionalities. Worked extensively with mysql sentences. Montevideo, Uruguay - www.paigo.com.uy"
          },
          third: {
            years: "2022-2024",
            company: "Nareia Software",
            description: "Worked as a backend developer. Built software API’s using ASP .NET for backend server. Collaborated in mobile development projects using .NET MAUI framework."
          }
        },
        contact: {
          name_label: "Name",
          name_placeholder: "Your name...",
          email_label: "Email",
          email_placeholder: "Your email...",
          phone_label: "Phone",
          phone_placeholder: "+1 (555) 123-4567",
          message_label: "Message",
          message_placeholder: "Write your message here...",
          send: "Send",
          sending_text: "Sending..."
        }
      }
    },
    es: {
      translation: {
        menu_about: "Sobre mí",
        menu_expertise: "Habilidades",
        menu_experience: "Experiencia",
        menu_contact: "Contacto",
        header_about: "sobre mí",
        header_expertise: "habilidades",
        header_experience: "experiencia",
        header_contact: "contacto",
        files: "archivos",
        projects: "proyectos",
        about: {
          line1: "Hola! Soy un desarrollador web full-stack con un fuerte enfoque en ASP.NET Core y React. Durante los últimos tres años, he ayudado a empresas y equipos a crear aplicaciones web rápidas, escalables y fáciles de mantener, desde API backend hasta interfaces frontend modernas.",
          line2: "Me apasiona escribir código limpio, crear interfaces de usuario intuitivas y resolver problemas del mundo real a través del software. Tanto si estás lanzando un nuevo producto como si necesitas ayuda para mejorar una aplicación existente, puedo ayudarte con el desarrollo práctico y la orientación técnica.",
          line3: "Trabajo con gran atención al detalle, un fuerte sentido de la responsabilidad y un profundo respeto por los plazos. Si buscas un desarrollador que combine una sólida ingeniería con una comunicación clara, me encantaría conocer tu proyecto."
        },
        expertise: {
          backend_dev: {
            title: "Desarrollador backend",
            short_label: "Desarroll. backend",
            description: "Cree backends potentes y escalables. Diseño API RESTful utilizando ASP.NET Core, centrándome en el rendimiento, la seguridad y la facilidad de mantenimiento."
          },
          frontend_dev: {
            title: "Desarrollador Frontend",
            short_label: "Desarroll. Frontend",
            description: "Interfaces de usuario rápidas e interactivas. Creo interfaces de usuario dinámicas y modernas con React, haciendo hincapié en la capacidad de respuesta y en una arquitectura de componentes limpia."
          },
          databases: {
            title: "Manejo de bases de datos",
            short_label: "Bases de datos",
            description: "Integración sólida de bases de datos. Utilizo EF Core para gestionar el acceso a los datos y las migraciones, y diseño esquemas SQL para garantizar la fiabilidad a largo plazo."
          },
          security: {
            title: "Seguridad",
            short_label: "Seguridad y autenticación",
            description: "Acceso seguro de los usuarios. Implemento identidad, tokens JWT y control de acceso basado en roles para aplicaciones seguras y escalables."
          },
          api_design: {
            title: "Diseño de API",
            short_label: "Diseño de API",
            description: "Flujos de trabajo fluidos entre el backend y el frontend. Me aseguro de que las API y la interfaz de usuario estén perfectamente integradas, utilizando herramientas como Axios, Fetch o SignalR cuando es necesario."
          },
          dev_ops: {
            title: "DevOps",
            short_label: "DevOps",
            description: "Arquitectura sostenible. Sigo los principios de la arquitectura limpia y organizo los códigos base para facilitar la colaboración en equipo y el crecimiento a largo plazo."
          }
        },
        experience: {
          first: {
            years: "2020-2021",
            company: "Craneoteca Software Solutions",
            description: "Trabajé como desarrollador backend. Colaboré en el diseño y desarrollo de aplicaciones RESTful con tecnología Java. Rivera, Uruguay. www.craneoteca.com"
          },
          second: {
            years: "2021-2022",
            company: "Paigo",
            description: "Un año trabajando como desarrollador backend. Diseñé y creé soluciones Java para generar informes financieros, ejecutar procesos periódicos y otras funciones diversas. Trabajé extensamente con sentencias mysql. Montevideo, Uruguay - www.paigo.com.uy"
          },
          third: {
            years: "2022-2024",
            company: "Nareia Software",
            description: "Trabajé como desarrollador de backend. Creé API de software utilizando ASP .NET para el servidor backend. Colaboré en proyectos de desarrollo móvil utilizando el marco .NET MAUI."
          }
        },
        contact: {
          name_label: "Nombre",
          name_placeholder: "Tu nombre...",
          email_label: "Email",
          email_placeholder: "Tu email...",
          phone_label: "Teléfono",
          phone_placeholder: "+1 (555) 123-4567",
          message_label: "Mensaje",
          message_placeholder: "Escribe tu mensaje aquí...",
          send: "Enviar",
          sending_text: "Enviando..."
        }
      }
    },
    pt: {
      translation: {
        menu_about: "Sobre mim",
        menu_expertise: "Habilidades",
        menu_experience: "Experiência",
        menu_contact: "Contato",
        header_about: "sobre mim",
        header_expertise: "habilidades",
        header_experience: "experiência",
        header_contact: "contato",
        files: "arquivos",
        projects: "projetos",
        about: {
          line1: "Olá! Sou um desenvolvedor web full-stack com forte foco em ASP.NET Core e React. Nos últimos 3 anos, ajudei empresas e equipes a criar aplicativos web rápidos, escaláveis e fáceis de manter — desde APIs de back-end até front-ends modernos.",
          line2: "Sou apaixonado por escrever código limpo, criar interfaces de usuário intuitivas e resolver problemas do mundo real por meio de software. Se você está lançando um novo produto ou precisa de ajuda para melhorar um aplicativo existente, posso ajudá-lo com desenvolvimento prático e orientação técnica.",
          line3: "Trabalho com um olhar atento aos detalhes, um forte senso de responsabilidade e um profundo respeito pelos prazos. Se você está procurando um desenvolvedor que combine engenharia sólida com comunicação clara, adoraria saber mais sobre o seu projeto."
        },
        expertise: {
          backend_dev: {
            title: "Desenvolvedor backend",
            short_label: "Desenv. backend",
            description: "Crie back-ends poderosos e escaláveis. Eu projeto APIs RESTful usando ASP.NET Core, com foco em desempenho, segurança e facilidade de manutenção."
          },
          frontend_dev: {
            title: "Desenvolvedor Frontend",
            short_label: "Desenvolv. frontend",
            description: "Interfaces de usuário rápidas e interativas. Eu crio interfaces de usuário dinâmicas e modernas com React, enfatizando a capacidade de resposta e uma arquitetura de componentes limpa."
          },
          databases: {
            title: "Bases de dados",
            short_label: "Manipulação de base de dados",
            description: "Integração robusta com bancos de dados. Utilizo o EF Core para lidar com acesso a dados e migrações, e projeto esquemas SQL para garantir confiabilidade a longo prazo."
          },
          security: {
            title: "Segurança",
            short_label: "Segurança e autenticação",
            description: "Acesso seguro do usuário. Eu implemento identidade, tokens JWT e controle de acesso baseado em funções para aplicações seguras e escaláveis."
          },
          api_design: {
            title: "Design da API",
            short_label: "Design de API",
            description: "Fluxos de trabalho backend-frontend tranquilos. Eu garanto que as APIs e a interface do usuário estejam perfeitamente integradas, usando ferramentas como Axios, Fetch ou SignalR quando necessário."
          },
          dev_ops: {
            title: "DevOps",
            short_label: "DevOps",
            description: "Arquitetura sustentável. Eu sigo os princípios da arquitetura limpa e organizo bases de código para colaboração em equipe e crescimento a longo prazo."
          }
        },
        experience: {
          first: {
            years: "2020-2021",
            company: "Craneoteca Software Solutions",
            description: "Trabalhei como desenvolvedor backend. Colaborou no projeto e desenvolvimento de aplicações restful com tecnologia Java. Rivera, Uruguai. www.craneoteca.com"
          },
          second: {
            years: "2021-2022",
            company: "Paigo",
            description: "Um ano trabalhando como desenvolvedor backend. Projetei e construí soluções Java para criar relatórios financeiros, executar processos periódicos e outras funcionalidades diversas. Trabalhei extensivamente com sentenças mysql. Montevidéu, Uruguai - www.paigo.com.uy"
          },
          third: {
            years: "2022-2024",
            company: "Nareia Software",
            description: "Trabalhei como desenvolvedor backend. Criou APIs de software usando ASP .NET para servidor backend. Colaborou em projetos de desenvolvimento móvel usando a estrutura .NET MAUI."
          }
        },
        contact: {
          name_label: "Nome",
          name_placeholder: "Seu nome...",
          email_label: "Email",
          email_placeholder: "Seu email...",
          phone_label: "Telefone",
          phone_placeholder: "+1 (555) 123-4567",
          message_label: "Mensagem",
          message_placeholder: "Escreva sua mensagem aqui...",
          send: "Mandar messagem",
          sending_text: "Mandando messagem..."
        }
      }
    }
  }
});