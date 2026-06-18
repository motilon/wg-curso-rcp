/* =========================================================
   CURSO · RCP Básico · Entrenamiento del primer respondiente
   ---------------------------------------------------------
   Cliente:  [PENDIENTE · actualizar cuando se confirme]
   Audiencia: Primer respondiente (no profesional sanitario)
   Duración: 4 horas
   Preset visual: vital
   Versión template: hibrida
   ========================================================= */

window.WG_COURSE = {

  brand: {
    // Solo la "W" naranja; el texto va al lado en HTML
    name: 'WAYGROUP',
    sub:  'SST en la era digital',
    logo: 'assets/img/curso/waygroup-w-only.svg',
  },

  course: {
    code:     '',
    name:     'Reanimación Cardio Pulmonar (RCP)',
    subtitle: '',
    duration: '4 horas',
    iso:      'ISO 9001:2015',
    licencia: 'Creative Commons BY-NC-SA 4.0',
  },

  /* MENÚ · 28 pantallas en orden secuencial */
  menu: [
    { id: 'portada',           num: '01', titulo: 'Inicio',                                                          icon: 'mdi:home',                   file: 'index.html' },
    { id: 'bienvenida',        num: '02', titulo: 'Bienvenida',                                                      icon: 'mdi:play-circle',            file: 'bienvenida.html' },
    { id: 'conceptos-basicos', num: '03', titulo: 'Conceptos básicos de RCP',                                        icon: 'mdi:book-open-page-variant', file: 'conceptos-basicos.html' },
    { id: 'identificacion',    num: '04', titulo: '¿Cómo se identifica una posible parada cardíaca?',                icon: 'mdi:magnify',                file: 'identificacion.html' },
    { id: 'quien-puede',       num: '05', titulo: '¿Quién puede presentar una parada cardíaca?',                     icon: 'mdi:account-group',          file: 'quien-puede.html' },
    { id: 'tipos-parada',      num: '06', titulo: 'Tipos de parada cardíaca',                                        icon: 'mdi:layers',                 file: 'tipos-parada.html' },
    { id: 'cadena',            num: '07', titulo: 'Cadena de supervivencia',                                         icon: 'mdi:link-variant',           file: 'cadena.html' },
    { id: 'importancia',       num: '08', titulo: 'Importancia de la RCP temprana',                                  icon: 'mdi:clock-alert',            file: 'importancia.html' },
    { id: 'seguridad-escena',  num: '09', titulo: 'Seguridad de la escena',                                          icon: 'mdi:shield-alert',           file: 'seguridad-escena.html' },
    { id: 'valoracion',        num: '10', titulo: 'Valoración inicial del paciente',                                 icon: 'mdi:stethoscope',            file: 'valoracion.html' },
    { id: 'emergencias',       num: '11', titulo: 'Activación del sistema de emergencias',                           icon: 'mdi:phone-in-talk',          file: 'emergencias.html' },
    { id: 'rcp-calidad',       num: '12', titulo: 'RCP de alta calidad',                                             icon: 'mdi:heart-pulse',            file: 'rcp-calidad.html' },
    { id: 'errores',           num: '13', titulo: 'Errores frecuentes en las compresiones',                          icon: 'mdi:alert-circle',           file: 'errores.html' },
    { id: 'relevos',           num: '14', titulo: 'Fatiga del reanimador y relevos',                                 icon: 'mdi:account-switch',         file: 'relevos.html' },
    { id: 'uso-dea',           num: '15', titulo: 'Uso del DEA',                                                     icon: 'mdi:flash',                  file: 'uso-dea.html' },
    { id: 'seguridad-dea',     num: '16', titulo: 'Seguridad durante la desfibrilación',                             icon: 'mdi:shield-lock',            file: 'seguridad-dea.html' },
    { id: 'rcp-sin-dea',       num: '17', titulo: 'RCP sin DEA disponible',                                          icon: 'mdi:flash-off',              file: 'rcp-sin-dea.html' },
    { id: 'rosc',              num: '18', titulo: 'Retorno de circulación espontánea',                               icon: 'mdi:heart-flash',            file: 'rosc.html' },
    { id: 'posicion-lateral',  num: '19', titulo: 'Posición lateral de seguridad y su relación con la RCP',         icon: 'mdi:human-handsdown',        file: 'posicion-lateral.html' },
    { id: 'obstruccion',       num: '20', titulo: 'Obstrucción de vía aérea por cuerpo extraño y su relación con la RCP', icon: 'mdi:lungs',             file: 'obstruccion.html' },
    { id: 'comunicacion',      num: '21', titulo: 'Comunicación y trabajo en equipo',                               icon: 'mdi:account-voice',          file: 'comunicacion.html' },
    { id: 'conclusiones',      num: '22', titulo: 'Conclusiones generales, otros usos y buenas prácticas físicas',  icon: 'mdi:check-decagram',         file: 'conclusiones.html' },
    { id: 'buenas-practicas',  num: '23', titulo: 'Buenas prácticas y malas prácticas',                             icon: 'mdi:scale-balance',          file: 'buenas-practicas.html' },
    { id: 'simulador',         num: '24', titulo: 'Uso del simulador de realidad virtual',                          icon: 'mdi:virtual-reality',        file: 'simulador.html' },
    { id: 'cierre',            num: '25', titulo: 'Cierre',                                                          icon: 'mdi:flag-checkered',         file: 'cierre.html' },
    { id: 'evaluacion',        num: '26', titulo: 'Evaluación',                                                     icon: 'mdi:clipboard-check-outline', file: 'evaluacion.html' },
    { id: 'glosario',          num: '27', titulo: 'Glosario',                                                       icon: 'mdi:format-list-bulleted',   file: 'glosario.html' },
    { id: 'creditos',          num: '28', titulo: 'Referencias y créditos',                                         icon: 'mdi:award',                  file: 'creditos.html' },
  ],

  /* GLOSARIO · términos clave del curso */
  glosario: [
    { letra: 'D', termino: 'DEA',
      definicion: 'Desfibrilador Externo Automático. Equipo que analiza el ritmo del corazón y determina si se requiere una descarga eléctrica. Guía al usuario mediante instrucciones de voz o visuales.' },
    { letra: 'H', termino: 'Heimlich',
      definicion: 'Maniobra que se realiza para ayudar a expulsar un cuerpo extraño que obstruye la vía aérea de una persona consciente.' },
    { letra: 'I', termino: 'Infarto cardíaco',
      definicion: 'Ocurre cuando una arteria del corazón se obstruye y una parte del músculo cardíaco deja de recibir oxígeno. Distinto de la parada cardíaca; puede evolucionar a esta si no se atiende.' },
    { letra: 'P', termino: 'Parada cardíaca',
      definicion: 'Situación en la que el corazón deja de bombear sangre de manera efectiva. La persona pierde la conciencia, no responde y no respira normalmente.' },
    { letra: 'P', termino: 'Posición lateral de seguridad',
      definicion: 'Posición de decúbito lateral que se utiliza cuando una persona está inconsciente pero respira normalmente. Mantiene la vía aérea abierta y disminuye el riesgo de broncoaspiración.' },
    { letra: 'P', termino: 'Primer respondiente',
      definicion: 'Persona que actúa primero ante una emergencia médica, sin ser necesariamente profesional sanitario.' },
    { letra: 'R', termino: 'RCP',
      definicion: 'Reanimación Cardiopulmonar. Conjunto de maniobras que se realizan para mantener la circulación de sangre cuando el corazón no bombea adecuadamente.' },
    { letra: 'R', termino: 'Retorno de circulación espontánea',
      definicion: 'Momento en que, después de la RCP o el uso del DEA, el corazón vuelve a latir efectivamente y la persona recupera signos vitales (respiración, tos, movimiento o respuesta).' },
    { letra: 'S', termino: 'SEM',
      definicion: 'Servicio de Emergencias Médicas. Sistema profesional de respuesta extrahospitalaria. En Colombia se activa marcando el 123.' },
    { letra: 'V', termino: 'VR',
      definicion: 'Realidad Virtual. Tecnología inmersiva basada en cascos de visualización que recrea entornos tridimensionales interactivos para entrenamiento práctico.' },
  ],

  /* REFERENCIAS · bibliografía y guías base */
  referencias: [
    { texto: 'American Heart Association. <em>Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.</em>' },
    { texto: 'International Liaison Committee on Resuscitation (ILCOR). <em>Consenso internacional sobre la ciencia de la RCP.</em>' },
    { texto: 'European Resuscitation Council. <em>Guidelines for Resuscitation.</em>' },
    { texto: 'Ministerio de Salud y Protección Social de Colombia. <em>Lineamientos para atención prehospitalaria de emergencias cardiovasculares.</em>' },
  ],

  /* CRÉDITOS · equipo del curso */
  creditos: {
    bloques: [
      {
        titulo: 'Equipo del curso',
        personas: [
          { nombre: 'Pendiente confirmar', cargo: 'Dirección académica',     area: '—' },
          { nombre: 'Pendiente confirmar', cargo: 'Diseño instruccional',    area: '—' },
          { nombre: 'Pendiente confirmar', cargo: 'Validación clínica',      area: '—' },
          { nombre: 'Pendiente confirmar', cargo: 'Diseño y desarrollo OVA', area: '—' },
        ]
      },
    ],
  },
};
