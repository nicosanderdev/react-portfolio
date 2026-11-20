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
        menu_how_i_build: "How I Build Software",
        menu_expertise: "Expertise",
        menu_experience: "Experience",
        menu_contact: "Contact",
        gate_prompt: "continue?",
        gate_yes: "yes",
        gate_no: "no",
        gate_close_fallback: "close this tab to exit",
        continue_action: "continue",
        back_action: "back",
        idle_prompt: "select an option to continue",
        idle_bar: "ready",
        header_about: "about me",
        header_how_i_build: "how I build software",
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
          sending_text: "Sending...",
          result_success_label: "SUCCESS",
          result_success_message: "confirmed",
          result_error_label: "ERROR",
          result_error_generic: "Could not send the message.",
          result_continue: "continue"
        },
        protocol: {
          warn_label: "WARNING",
          warn_title: "unverified development process detected",
          warn_body: "solution: access the developer's operating protocol",
          press_enter: "press enter to investigate",
          loading: "loading",
          no_signal: "no signal",
          back: "back",
          steps: {
            "01": {
              label: "PLANNING",
              kicker: "analysis · organization · definition",
              substeps: [
                {
                  title: "Understand the problem / task",
                  lead: "Before starting, understand what needs to be solved and what impact the change may have.",
                  blocks: [
                    {
                      heading: "Initial questions:",
                      items: [
                        "What do I want to achieve?",
                        "What problem am I trying to solve?",
                        "Which workflows are affected?",
                        "What software or systems are involved?",
                        "What hardware or infrastructure may be affected?",
                        "What do I need to know before starting?",
                        "Which parts of the problem do I still not understand?",
                        "What do I need to research?"
                      ]
                    }
                  ]
                },
                {
                  title: "Organization and visualization",
                  lead: "Organize the information to better understand the problem and its relationships.",
                  blocks: [
                    {
                      items: [
                        "Use drawings, diagrams, sketches, and lists.",
                        "Identify the flows involved and their dependencies.",
                        "Separate the different components of the task.",
                        "Identify inputs, processes, and expected results.",
                        "Represent the changes visually when needed.",
                        "Identify possible points of conflict or dependencies with other systems."
                      ]
                    }
                  ]
                },
                {
                  title: "Define the scope",
                  lead: "Clearly establish what the task includes and what it does not include.",
                  blocks: [
                    {
                      items: [
                        "What does the solution involve?",
                        "Which features or components must be changed?",
                        "What falls outside the scope?",
                        "What results do I expect?",
                        "What are the criteria for considering the task done?",
                        "Are there technical, time, or resource constraints?"
                      ]
                    }
                  ],
                  note: {
                    label: "Expected result",
                    text: "a clear definition of the problem, its scope, and the expected outcome before development begins."
                  }
                }
              ]
            },
            "02": {
              label: "AI-ASSISTED DEVELOPMENT",
              kicker: "research · planning · implementation",
              substeps: [
                {
                  title: "Research and analysis",
                  lead: "Research the technical and functional aspects that are still unclear.",
                  blocks: [
                    {
                      items: [
                        "Consult official documentation, files, pages, and reference sites.",
                        "Research the technologies, libraries, APIs, and tools involved.",
                        "Analyze possible solutions and alternatives.",
                        "Identify good practices and possible problems.",
                        "Research what is worth doing and what to avoid.",
                        "Contrast the information with the current architecture and behavior of the project."
                      ]
                    },
                    {
                      heading: "Scope review:",
                      intro: "Research can reveal new needs or problems that were not considered at the start."
                    },
                    {
                      heading: "To that end:",
                      items: [
                        "Does the new information change the scope?",
                        "Is it essential to include these changes?",
                        "Should they be solved now or left for another task?",
                        "Should the original plan be updated?"
                      ]
                    }
                  ]
                },
                {
                  title: "AI-Assisted Planning",
                  lead: "Use AI tools to explore alternatives, question decisions, and prepare an implementation plan.",
                  blocks: [
                    {
                      items: [
                        "Prepare structured prompts with context, objectives, and constraints.",
                        "Provide relevant files, documentation, and references.",
                        "Use Skills to explore and validate ideas.",
                        "Analyze different implementation alternatives.",
                        "Ask the AI to identify risks, inconsistencies, and cases that were not considered.",
                        "Split large tasks into smaller subtasks.",
                        "Define which files, functions, and components must be changed.",
                        "Establish an implementation order and its dependencies."
                      ]
                    },
                    {
                      heading: "Tools and Skills:",
                      items: [
                        "Wayfinder: explore the problem and orient the solution.",
                        "Grill Me: question decisions and go deeper into the requirements.",
                        "Grill Me with Docs: analyze documentation and contrast decisions with technical references."
                      ]
                    }
                  ]
                },
                {
                  title: "Implementation",
                  lead: "Carry out the defined plan, using AI as a development assistant and keeping control over the important operations.",
                  blocks: [
                    {
                      heading: "Work done by the AI:",
                      items: [
                        "Create and modify files.",
                        "Implement functions, components, and services.",
                        "Generate SQL queries, endpoints, and data structures.",
                        "Create automated tests.",
                        "Analyze errors and propose corrections.",
                        "Update technical documentation."
                      ]
                    },
                    {
                      heading: "Personal work and supervision:",
                      items: [
                        "Review architecture decisions.",
                        "Manage keys, credentials, and environment variables.",
                        "Configure external services and connections to third-party APIs.",
                        "Supervise changes to databases and infrastructure.",
                        "Run operations that require intervention or authorization.",
                        "Review the changes before accepting them."
                      ]
                    }
                  ],
                  note: {
                    label: "Important criterion",
                    text: "work in small parts, validate the results of each stage, and avoid implementing large amounts of change without reviewing them."
                  }
                }
              ]
            },
            "03": {
              label: "REVIEW & VALIDATION",
              kicker: "review · testing · documentation",
              substeps: [
                {
                  title: "Code review and testing",
                  lead: "Check that the implementation is correct, that it meets the objectives, and that it does not negatively affect other functionality.",
                  blocks: [
                    {
                      heading: "Code review:",
                      items: [
                        "Review the modified files.",
                        "Review the key functions and components.",
                        "Check that the implementation follows the project architecture.",
                        "Look for duplicated code, potential errors, and security issues.",
                        "Verify that no out-of-scope changes were introduced."
                      ]
                    },
                    {
                      heading: "Testing and validation:",
                      items: [
                        "Create a list of test cases.",
                        "Identify normal scenarios, exceptional scenarios, and expected errors.",
                        "Test the affected flows.",
                        "Check integrations with other services.",
                        "Verify that previous functionality still works.",
                        "Run automated and manual tests.",
                        "Fix errors and repeat the necessary tests."
                      ]
                    }
                  ],
                  note: {
                    label: "Completion criterion",
                    text: "do not consider a task finished only because the code works, but when it has been verified that it meets the expected results."
                  }
                },
                {
                  title: "Documentation and maintenance",
                  lead: "Keep reference documentation that makes it possible to understand how the project works and to recover information about previous decisions.",
                  blocks: [
                    {
                      items: [
                        "Keep documentation files up to date.",
                        "Document new flows and functionality.",
                        "Update diagrams and sketches when behavior changes.",
                        "Record important technical decisions and their reasons.",
                        "Document configurations, integrations, and dependencies.",
                        "Record known limitations and possible future improvements.",
                        "Keep documentation useful for future AI work sessions."
                      ]
                    }
                  ],
                  note: {
                    label: "Goal",
                    text: "documentation should not be something generated only at the end, but something that accompanies the whole development process."
                  }
                }
              ]
            }
          }
        }
      }
    },
    es: {
      translation: {
        menu_about: "Sobre mí",
        menu_how_i_build: "Cómo hago software",
        menu_expertise: "Habilidades",
        menu_experience: "Experiencia",
        menu_contact: "Contacto",
        gate_prompt: "¿continuar?",
        gate_yes: "sí",
        gate_no: "no",
        gate_close_fallback: "cierra esta pestaña para salir",
        continue_action: "continuar",
        back_action: "volver",
        idle_prompt: "seleccione una opción para continuar",
        idle_bar: "listo",
        header_about: "sobre mí",
        header_how_i_build: "cómo hago software",
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
          sending_text: "Enviando...",
          result_success_label: "ÉXITO",
          result_success_message: "confirmado",
          result_error_label: "ERROR",
          result_error_generic: "No se pudo enviar el mensaje.",
          result_continue: "continuar"
        },
        protocol: {
          warn_label: "WARNING",
          warn_title: "unverified development process detected",
          warn_body: "solución: acceder al protocolo operativo del desarrollador",
          press_enter: "pulsa enter para investigar",
          loading: "loading",
          no_signal: "no signal",
          back: "back",
          steps: {
            "01": {
              label: "PLANNING",
              kicker: "análisis · organización · definición",
              substeps: [
                {
                  title: "Entender el problema / tarea",
                  lead: "Antes de empezar, comprender qué se quiere resolver y qué impacto puede tener el cambio.",
                  blocks: [
                    {
                      heading: "Preguntas iniciales:",
                      items: [
                        "¿Qué quiero lograr?",
                        "¿Qué problema estoy intentando resolver?",
                        "¿Qué flujos de trabajo se ven afectados?",
                        "¿Qué software o sistemas están involucrados?",
                        "¿Qué hardware o infraestructura puede verse afectado?",
                        "¿Qué información necesito conocer antes de empezar?",
                        "¿Qué aspectos del problema todavía desconozco?",
                        "¿Qué necesito investigar?"
                      ]
                    }
                  ]
                },
                {
                  title: "Organización y visualización",
                  lead: "Organizar la información para comprender mejor el problema y sus relaciones.",
                  blocks: [
                    {
                      items: [
                        "Utilizar dibujos, diagramas, esquemas y listas.",
                        "Identificar los flujos involucrados y sus dependencias.",
                        "Separar los distintos componentes de la tarea.",
                        "Identificar entradas, procesos y resultados esperados.",
                        "Representar visualmente los cambios cuando sea necesario.",
                        "Identificar posibles puntos de conflicto o dependencias con otros sistemas."
                      ]
                    }
                  ]
                },
                {
                  title: "Definir el alcance (Scope)",
                  lead: "Establecer claramente qué incluye y qué no incluye la tarea.",
                  blocks: [
                    {
                      items: [
                        "¿Qué implica la solución?",
                        "¿Qué funcionalidades o componentes deben modificarse?",
                        "¿Qué cosas quedan fuera del alcance?",
                        "¿Qué resultados espero obtener?",
                        "¿Cuáles son los criterios para considerar terminada la tarea?",
                        "¿Existen limitaciones técnicas, de tiempo o de recursos?"
                      ]
                    }
                  ],
                  note: {
                    label: "Resultado esperado",
                    text: "tener una definición clara del problema, su alcance y el resultado esperado antes de comenzar el desarrollo."
                  }
                }
              ]
            },
            "02": {
              label: "AI-ASSISTED DEVELOPMENT",
              kicker: "investigación · planificación · implementación",
              substeps: [
                {
                  title: "Investigación y análisis",
                  lead: "Investigar los aspectos técnicos y funcionales que todavía no están claros.",
                  blocks: [
                    {
                      items: [
                        "Consultar documentación oficial, archivos, páginas y sitios de referencia.",
                        "Investigar tecnologías, librerías, APIs y herramientas involucradas.",
                        "Analizar posibles soluciones y alternativas.",
                        "Identificar buenas prácticas y posibles problemas.",
                        "Investigar qué cosas conviene hacer y cuáles evitar.",
                        "Contrastar la información obtenida con la arquitectura y el funcionamiento actual del proyecto."
                      ]
                    },
                    {
                      heading: "Revisión del alcance:",
                      intro: "La investigación puede revelar nuevas necesidades o problemas que inicialmente no se habían contemplado."
                    },
                    {
                      heading: "Para eso:",
                      items: [
                        "¿La información nueva modifica el alcance?",
                        "¿Es indispensable incorporar estos cambios?",
                        "¿Conviene resolverlos ahora o dejarlos para otra tarea?",
                        "¿Se debe actualizar la planificación original?"
                      ]
                    }
                  ]
                },
                {
                  title: "AI-Assisted Planning",
                  lead: "Utilizar herramientas de IA para explorar alternativas, cuestionar decisiones y preparar un plan de implementación.",
                  blocks: [
                    {
                      items: [
                        "Preparar prompts estructurados con contexto, objetivos y restricciones.",
                        "Proporcionar archivos, documentación y referencias relevantes.",
                        "Utilizar Skills para explorar y validar ideas.",
                        "Analizar distintas alternativas de implementación.",
                        "Solicitar a la IA que identifique riesgos, inconsistencias y casos no contemplados.",
                        "Dividir tareas grandes en subtareas más pequeñas.",
                        "Definir qué archivos, funciones y componentes deberán modificarse.",
                        "Establecer un orden de implementación y sus dependencias."
                      ]
                    },
                    {
                      heading: "Herramientas y Skills:",
                      items: [
                        "Wayfinder: explorar el problema y orientar la solución.",
                        "Grill Me: cuestionar decisiones y profundizar en los requerimientos.",
                        "Grill Me with Docs: analizar documentación y contrastar decisiones con referencias técnicas."
                      ]
                    }
                  ]
                },
                {
                  title: "Implementación",
                  lead: "Ejecutar el plan definido, utilizando IA como asistente de desarrollo y manteniendo el control sobre las operaciones importantes.",
                  blocks: [
                    {
                      heading: "Trabajo realizado por la IA:",
                      items: [
                        "Crear y modificar archivos.",
                        "Implementar funciones, componentes y servicios.",
                        "Generar consultas SQL, endpoints y estructuras de datos.",
                        "Crear pruebas automatizadas.",
                        "Analizar errores y proponer correcciones.",
                        "Actualizar documentación técnica."
                      ]
                    },
                    {
                      heading: "Trabajo y supervisión personal:",
                      items: [
                        "Revisar las decisiones de arquitectura.",
                        "Gestionar llaves, credenciales y variables de entorno.",
                        "Configurar servicios externos y conexiones con APIs de terceros.",
                        "Supervisar modificaciones en bases de datos e infraestructura.",
                        "Ejecutar operaciones que requieren intervención o autorización.",
                        "Revisar los cambios antes de aceptarlos."
                      ]
                    }
                  ],
                  note: {
                    label: "Criterio importante",
                    text: "trabajar en partes pequeñas, validar los resultados de cada etapa y evitar implementar grandes cantidades de cambios sin revisarlos."
                  }
                }
              ]
            },
            "03": {
              label: "REVIEW & VALIDATION",
              kicker: "revisión · testing · documentación",
              substeps: [
                {
                  title: "Revisión de código y testing",
                  lead: "Comprobar que la implementación sea correcta, que cumpla con los objetivos y que no afecte negativamente otras funcionalidades.",
                  blocks: [
                    {
                      heading: "Revisión de código:",
                      items: [
                        "Revisar los archivos modificados.",
                        "Revisar las funciones y componentes clave.",
                        "Comprobar que la implementación siga la arquitectura del proyecto.",
                        "Buscar código duplicado, errores potenciales y problemas de seguridad.",
                        "Verificar que no se hayan introducido cambios fuera del alcance."
                      ]
                    },
                    {
                      heading: "Testing y validación:",
                      items: [
                        "Crear una lista de casos de prueba.",
                        "Identificar escenarios normales, excepcionales y errores esperados.",
                        "Probar los flujos afectados.",
                        "Comprobar las integraciones con otros servicios.",
                        "Verificar que las funcionalidades anteriores sigan funcionando.",
                        "Ejecutar pruebas automatizadas y manuales.",
                        "Corregir errores y repetir las pruebas necesarias."
                      ]
                    }
                  ],
                  note: {
                    label: "Criterio de finalización",
                    text: "no considerar terminada una tarea solamente porque el código funciona, sino cuando se ha comprobado que cumple con los resultados esperados."
                  }
                },
                {
                  title: "Documentación y mantenimiento",
                  lead: "Mantener documentación de referencia que permita comprender el funcionamiento del proyecto y recuperar información sobre decisiones anteriores.",
                  blocks: [
                    {
                      items: [
                        "Mantener archivos de documentación actualizados.",
                        "Documentar nuevos flujos y funcionalidades.",
                        "Actualizar diagramas y esquemas cuando cambie el funcionamiento.",
                        "Registrar decisiones técnicas importantes y sus motivos.",
                        "Documentar configuraciones, integraciones y dependencias.",
                        "Registrar limitaciones conocidas y posibles mejoras futuras.",
                        "Mantener documentación útil para futuras sesiones de trabajo con IA."
                      ]
                    }
                  ],
                  note: {
                    label: "Objetivo",
                    text: "que la documentación no sea algo que se genera únicamente al finalizar, sino que acompañe todo el proceso de desarrollo."
                  }
                }
              ]
            }
          }
        }
      }
    },
    pt: {
      translation: {
        menu_about: "Sobre mim",
        menu_how_i_build: "Como construo software",
        menu_expertise: "Habilidades",
        menu_experience: "Experiência",
        menu_contact: "Contato",
        gate_prompt: "continuar?",
        gate_yes: "sim",
        gate_no: "não",
        gate_close_fallback: "feche esta aba para sair",
        continue_action: "continuar",
        back_action: "voltar",
        idle_prompt: "selecione uma opção para continuar",
        idle_bar: "pronto",
        header_about: "sobre mim",
        header_how_i_build: "como construo software",
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
          sending_text: "Mandando messagem...",
          result_success_label: "SUCESSO",
          result_success_message: "confirmado",
          result_error_label: "ERRO",
          result_error_generic: "Não foi possível enviar a mensagem.",
          result_continue: "continuar"
        },
        protocol: {
          warn_label: "WARNING",
          warn_title: "unverified development process detected",
          warn_body: "solução: acessar o protocolo operacional do desenvolvedor",
          loading: "loading",
          press_enter: "pressione enter para investigar",
          no_signal: "no signal",
          back: "back",
          steps: {
            "01": {
              label: "PLANNING",
              kicker: "análise · organização · definição",
              substeps: [
                {
                  title: "Entender o problema / tarefa",
                  lead: "Antes de começar, compreender o que se quer resolver e qual impacto a mudança pode ter.",
                  blocks: [
                    {
                      heading: "Perguntas iniciais:",
                      items: [
                        "O que quero alcançar?",
                        "Qual problema estou tentando resolver?",
                        "Quais fluxos de trabalho são afetados?",
                        "Quais softwares ou sistemas estão envolvidos?",
                        "Qual hardware ou infraestrutura pode ser afetado?",
                        "Que informações preciso conhecer antes de começar?",
                        "Quais aspectos do problema ainda desconheço?",
                        "O que preciso pesquisar?"
                      ]
                    }
                  ]
                },
                {
                  title: "Organização e visualização",
                  lead: "Organizar a informação para compreender melhor o problema e suas relações.",
                  blocks: [
                    {
                      items: [
                        "Usar desenhos, diagramas, esquemas e listas.",
                        "Identificar os fluxos envolvidos e suas dependências.",
                        "Separar os diferentes componentes da tarefa.",
                        "Identificar entradas, processos e resultados esperados.",
                        "Representar visualmente as mudanças quando necessário.",
                        "Identificar possíveis pontos de conflito ou dependências com outros sistemas."
                      ]
                    }
                  ]
                },
                {
                  title: "Definir o alcance",
                  lead: "Estabelecer com clareza o que a tarefa inclui e o que não inclui.",
                  blocks: [
                    {
                      items: [
                        "O que a solução implica?",
                        "Quais funcionalidades ou componentes devem ser modificados?",
                        "O que fica fora do alcance?",
                        "Quais resultados espero obter?",
                        "Quais são os critérios para considerar a tarefa concluída?",
                        "Existem limitações técnicas, de tempo ou de recursos?"
                      ]
                    }
                  ],
                  note: {
                    label: "Resultado esperado",
                    text: "ter uma definição clara do problema, do seu alcance e do resultado esperado antes de começar o desenvolvimento."
                  }
                }
              ]
            },
            "02": {
              label: "AI-ASSISTED DEVELOPMENT",
              kicker: "pesquisa · planejamento · implementação",
              substeps: [
                {
                  title: "Pesquisa e análise",
                  lead: "Pesquisar os aspectos técnicos e funcionais que ainda não estão claros.",
                  blocks: [
                    {
                      items: [
                        "Consultar documentação oficial, arquivos, páginas e sites de referência.",
                        "Pesquisar tecnologias, bibliotecas, APIs e ferramentas envolvidas.",
                        "Analisar possíveis soluções e alternativas.",
                        "Identificar boas práticas e possíveis problemas.",
                        "Pesquisar o que convém fazer e o que evitar.",
                        "Contrastar a informação obtida com a arquitetura e o funcionamento atual do projeto."
                      ]
                    },
                    {
                      heading: "Revisão do alcance:",
                      intro: "A pesquisa pode revelar novas necessidades ou problemas que inicialmente não tinham sido contemplados."
                    },
                    {
                      heading: "Para isso:",
                      items: [
                        "A informação nova modifica o alcance?",
                        "É indispensável incorporar essas mudanças?",
                        "Convém resolvê-las agora ou deixá-las para outra tarefa?",
                        "O planejamento original deve ser atualizado?"
                      ]
                    }
                  ]
                },
                {
                  title: "AI-Assisted Planning",
                  lead: "Usar ferramentas de IA para explorar alternativas, questionar decisões e preparar um plano de implementação.",
                  blocks: [
                    {
                      items: [
                        "Preparar prompts estruturados com contexto, objetivos e restrições.",
                        "Fornecer arquivos, documentação e referências relevantes.",
                        "Usar Skills para explorar e validar ideias.",
                        "Analisar diferentes alternativas de implementação.",
                        "Pedir à IA que identifique riscos, inconsistências e casos não contemplados.",
                        "Dividir tarefas grandes em subtarefas menores.",
                        "Definir quais arquivos, funções e componentes deverão ser modificados.",
                        "Estabelecer uma ordem de implementação e suas dependências."
                      ]
                    },
                    {
                      heading: "Ferramentas e Skills:",
                      items: [
                        "Wayfinder: explorar o problema e orientar a solução.",
                        "Grill Me: questionar decisões e aprofundar os requisitos.",
                        "Grill Me with Docs: analisar documentação e contrastar decisões com referências técnicas."
                      ]
                    }
                  ]
                },
                {
                  title: "Implementação",
                  lead: "Executar o plano definido, usando IA como assistente de desenvolvimento e mantendo o controle sobre as operações importantes.",
                  blocks: [
                    {
                      heading: "Trabalho realizado pela IA:",
                      items: [
                        "Criar e modificar arquivos.",
                        "Implementar funções, componentes e serviços.",
                        "Gerar consultas SQL, endpoints e estruturas de dados.",
                        "Criar testes automatizados.",
                        "Analisar erros e propor correções.",
                        "Atualizar documentação técnica."
                      ]
                    },
                    {
                      heading: "Trabalho e supervisão pessoal:",
                      items: [
                        "Revisar as decisões de arquitetura.",
                        "Gerenciar chaves, credenciais e variáveis de ambiente.",
                        "Configurar serviços externos e conexões com APIs de terceiros.",
                        "Supervisionar modificações em bases de dados e infraestrutura.",
                        "Executar operações que exigem intervenção ou autorização.",
                        "Revisar as mudanças antes de aceitá-las."
                      ]
                    }
                  ],
                  note: {
                    label: "Critério importante",
                    text: "trabalhar em partes pequenas, validar os resultados de cada etapa e evitar implementar grandes quantidades de mudanças sem revisá-las."
                  }
                }
              ]
            },
            "03": {
              label: "REVIEW & VALIDATION",
              kicker: "revisão · testes · documentação",
              substeps: [
                {
                  title: "Revisão de código e testes",
                  lead: "Comprovar que a implementação está correta, que cumpre os objetivos e que não afeta negativamente outras funcionalidades.",
                  blocks: [
                    {
                      heading: "Revisão de código:",
                      items: [
                        "Revisar os arquivos modificados.",
                        "Revisar as funções e componentes principais.",
                        "Comprovar que a implementação segue a arquitetura do projeto.",
                        "Buscar código duplicado, erros potenciais e problemas de segurança.",
                        "Verificar que não tenham sido introduzidas mudanças fora do alcance."
                      ]
                    },
                    {
                      heading: "Testes e validação:",
                      items: [
                        "Criar uma lista de casos de teste.",
                        "Identificar cenários normais, excepcionais e erros esperados.",
                        "Testar os fluxos afetados.",
                        "Comprovar as integrações com outros serviços.",
                        "Verificar que as funcionalidades anteriores continuem funcionando.",
                        "Executar testes automatizados e manuais.",
                        "Corrigir erros e repetir os testes necessários."
                      ]
                    }
                  ],
                  note: {
                    label: "Critério de conclusão",
                    text: "não considerar uma tarefa terminada somente porque o código funciona, mas quando se comprovou que ela cumpre os resultados esperados."
                  }
                },
                {
                  title: "Documentação e manutenção",
                  lead: "Manter documentação de referência que permita compreender o funcionamento do projeto e recuperar informação sobre decisões anteriores.",
                  blocks: [
                    {
                      items: [
                        "Manter arquivos de documentação atualizados.",
                        "Documentar novos fluxos e funcionalidades.",
                        "Atualizar diagramas e esquemas quando o funcionamento mudar.",
                        "Registrar decisões técnicas importantes e seus motivos.",
                        "Documentar configurações, integrações e dependências.",
                        "Registrar limitações conhecidas e possíveis melhorias futuras.",
                        "Manter documentação útil para futuras sessões de trabalho com IA."
                      ]
                    }
                  ],
                  note: {
                    label: "Objetivo",
                    text: "que a documentação não seja algo gerado apenas ao final, mas que acompanhe todo o processo de desenvolvimento."
                  }
                }
              ]
            }
          }
        }
      }
    }
  }
});