import generator from "./lib/generator";

const payload = {
  author: "Karl Marx",
  quote:
    "El comunismo no priva a nadie del poder de apropiarse productos sociales; lo único que no admite es el poder de usurpar por medio de esta apropiación el trabajo ajeno"
};

(async function() {
  const buffer = await generator(payload);

  console.warn(buffer);
})();
