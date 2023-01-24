const types = {
  expositive: "Expositivo",
  tutorial: "Tutorial",
  activyGuide: "Guía de Atividade",
  deviceExploration: "Exploração de Dispositivo",
};

export const typesLessons = (type: keyof typeof types) => types[type];
