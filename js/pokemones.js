// Sección
let contenedor = document.querySelector(".d-flex");
let buscar = document.querySelector("#search");
let limpiarbuscador = document.querySelector("#limpiar");
let orden = document.querySelector("#orden");

class Pokedex {
  constructor() {
    this.pokedex = []; // constructor vacio que inicia un array vacio
  }
  agregar(pokemon) {
    this.pokedex.push(pokemon);
    // console.log(this.pokemon);
  }
  buscar(pokemon) {
    var listaaux = this.pokedex;
    for (let i = 0; i < listaaux.length; i++) {
      if (pokemon.toUpperCase() === listaaux[i].name.toUpperCase()) {
        return listaaux[i]; //en caso de encontrarse el nombre, regresamos el contacto completo
      }
    }
    return null; //en caso de encontrar regresamos este string
  }
  BurbujaObjeto({ pokedex }, campo) {
    console.log(pokedex);
    let longitud = pokedex.length;

    let operaciones = 0;
    for (let i = 0; i < pokedex.length; i++) {
    //   console.log(i);
      for (let j = 0; j < longitud - 1; j++) {
        // console.log(j);
        // console.log(
        //   `Estos son los elementos que se estan comparando elemento j ${
        //     pokedex[j]
        //   } y elemento j+1 ${pokedex[j + 1]}`
        // );
        operaciones++;
        if (pokedex[j][campo] > pokedex[j + 1][campo]) {
          cambiar(j, j + 1, pokedex);
        }
      }
    //   console.log(`En la iteracion ${i}, el discos esta asi ${pokedex}`);
    //   console.log(pokedex);
      longitud--;
    }
    console.log("Numero de operaciones realizadas: "+operaciones);
    return pokedex;
  }
   metodoSeleccion({ pokedex },campo){
    let operaciones=0;
    for (let i = 0; i < pokedex.length; i++) {
        let min=i;
        for (let j = i+1; j < pokedex.length; j++) {
            operaciones++
            if (pokedex[j][campo]<pokedex[min][campo]) {
                min=j;
            }
        }
        cambiar(i,min,pokedex)
        
    }
    console.log("Numero de operaciones realizadas:"+operaciones);
    return pokedex;
}

}
const pokemon = new Pokedex();

function obtenerDatos() {
  const url = "pokemons.json";
  fetch(url)
    .then((respuesta) => {
      console.log(respuesta);
      return respuesta.json();
    })
    .then((datos) => {
      // Limpia los datos que estan repetidos
      var clean = datos.filter(
        (datos, index, self) =>
          index === self.findIndex((t) => t.id === datos.id)
      );
      console.log(clean);
      console.log(clean[0]);
      clean.forEach((poke) => {
        pokemon.agregar(poke);
      });
      console.log(pokemon);
      imprimirPokemones(pokemon);
    })
    .catch((error) => {
      console.log(error);
    });
}

obtenerDatos();

function imprimirPokemones({ pokedex }) {
  limpiar(contenedor);
  console.log(pokedex[0]);
  if (pokedex[0] != null) {
    pokedex.forEach((pokemon) => {
      let card = document.createElement("div");
      let cardbody = document.createElement("div");
      let img = document.createElement("img");
      let name = document.createElement("p");
      let title = document.createElement("h4");

      card.classList.add(
        "card",
        "mx-2",
        "my-3",
        "shadow",
        "p-3",
        "mb-5",
        "bg-body",
        "rounded"
      );
      img.classList.add("card-img-top");
      cardbody.classList.add("card-body");
      name.classList.add("card-text");
      title.classList.add("card-title");

      img.src = pokemon.ThumbnailImage;
      name.textContent = pokemon.number;
      title.textContent = pokemon.name;
      card.dataset.id = pokemon.id;

      //*  Itera el tipo de pokemon que son
      for (let i = 0; i < pokemon.type.length; i++) {
        let badge = document.createElement("p");
        badge.classList.add(
          "card-text",
          "mx-1",
          "badge",
          `${
            pokemon.type[i] == "grass"
              ? "bg-success"
              : pokemon.type[i] == "poison"
              ? "bg-poison"
              : pokemon.type[i] == "fire"
              ? "bg-danger"
              : pokemon.type[i] == "flying"
              ? "bg-flying"
              : pokemon.type[i] == "water"
              ? "bg-primary"
              : pokemon.type[i] == "bug"
              ? "bg-bug"
              : pokemon.type[i] == "dark"
              ? "bg-dark"
              : pokemon.type[i] == "electric"
              ? "bg-electric"
              : pokemon.type[i] == "psychic"
              ? "bg-psychic"
              : pokemon.type[i] == "ice"
              ? "bg-ice"
              : pokemon.type[i] == "steel"
              ? "bg-steel"
              : pokemon.type[i] == "ground"
              ? "bg-ground"
              : pokemon.type[i] == "fighting"
              ? "bg-fighting"
              : pokemon.type[i] == "rock"
              ? "bg-rock"
              : pokemon.type[i] == "fairy"
              ? "bg-fairy"
              : pokemon.type[i] == "ghost"
              ? "bg-ghost"
              : pokemon.type[i] == "dragon"
              ? "bg-dragon"
              : "bg-secondary"
          }`
        );
        badge.textContent = pokemon.type[i];
        cardbody.appendChild(badge);
      }

      card.onclick = () => {
        displayModal(pokemon);
      };

      cardbody.append(name, title);
      card.append(img, cardbody);
      contenedor.appendChild(card);
    });
  } else {
    let titulo = document.createElement("h2");
    titulo.textContent = "No se han encontrado resultados";
    contenedor.appendChild(titulo);
  }
  console.log("Imprimiendo data");
  // console.log(data)

  function displayModal(pokemon) {
    // console.log(document.querySelector("#exampleModal"));
    let nombre = document.querySelector("#nombre");
    let imagen = document.querySelector("#imagen");
    let altura = document.querySelector("#altura");
    let peso = document.querySelector("#peso");
    let tipo = document.querySelector("#tipo");
    let habilidades = document.querySelector("#habilidades");
    let debilidades = document.querySelector("#debilidades");

    nombre.textContent = pokemon.name;
    imagen.src = pokemon.ThumbnailImage;
    altura.textContent = pokemon.height;
    peso.textContent = pokemon.weight;
    //   Limpia las badge de tipo
    limpiar(tipo);
    for (let i = 0; i < pokemon.type.length; i++) {
      let badge = document.createElement("p");
      badge.classList.add(
        "mx-1",
        "badge",
        `${
          pokemon.type[i] == "grass"
            ? "bg-success"
            : pokemon.type[i] == "poison"
            ? "bg-poison"
            : pokemon.type[i] == "fire"
            ? "bg-danger"
            : pokemon.type[i] == "flying"
            ? "bg-flying"
            : pokemon.type[i] == "water"
            ? "bg-primary"
            : pokemon.type[i] == "bug"
            ? "bg-bug"
            : pokemon.type[i] == "dark"
            ? "bg-dark"
            : pokemon.type[i] == "electric"
            ? "bg-electric"
            : pokemon.type[i] == "psychic"
            ? "bg-psychic"
            : pokemon.type[i] == "ice"
            ? "bg-ice"
            : pokemon.type[i] == "steel"
            ? "bg-steel"
            : pokemon.type[i] == "ground"
            ? "bg-ground"
            : pokemon.type[i] == "fighting"
            ? "bg-fighting"
            : pokemon.type[i] == "rock"
            ? "bg-rock"
            : pokemon.type[i] == "fairy"
            ? "bg-fairy"
            : pokemon.type[i] == "ghost"
            ? "bg-ghost"
            : pokemon.type[i] == "dragon"
            ? "bg-dragon"
            : "bg-secondary"
        }`
      );
      badge.textContent = pokemon.type[i];
      tipo.appendChild(badge);
    }
    //   Limpia las badge de habilidades
    limpiar(habilidades);
    for (let i = 0; i < pokemon.abilities.length; i++) {
      let habilidad = document.createElement("p");
      habilidad.classList.add("badge", "text-dark");
      habilidad.textContent = pokemon.abilities[i];
      habilidades.appendChild(habilidad);
    }
    limpiar(debilidades);
    for (let i = 0; i < pokemon.weakness.length; i++) {
      let debilidad = document.createElement("p");
      debilidad.classList.add(
        "mx-1",
        "badge",
        `${
          pokemon.weakness[i] == "Grass"
            ? "bg-success"
            : pokemon.weakness[i] == "Poison"
            ? "bg-poison"
            : pokemon.weakness[i] == "Fire"
            ? "bg-danger"
            : pokemon.weakness[i] == "Flying"
            ? "bg-flying"
            : pokemon.weakness[i] == "Water"
            ? "bg-primary"
            : pokemon.weakness[i] == "Bug"
            ? "bg-bug"
            : pokemon.weakness[i] == "Dark"
            ? "bg-dark"
            : pokemon.weakness[i] == "Electric"
            ? "bg-electric"
            : pokemon.weakness[i] == "Psychic"
            ? "bg-psychic"
            : pokemon.weakness[i] == "Ice"
            ? "bg-ice"
            : pokemon.weakness[i] == "Steel"
            ? "bg-steel"
            : pokemon.weakness[i] == "Ground"
            ? "bg-ground"
            : pokemon.weakness[i] == "Fighting"
            ? "bg-fighting"
            : pokemon.weakness[i] == "Rock"
            ? "bg-rock"
            : pokemon.weakness[i] == "Fairy"
            ? "bg-fairy"
            : pokemon.weakness[i] == "Ghost"
            ? "bg-ghost"
            : pokemon.weakness[i] == "Dragon"
            ? "bg-dragon"
            : "bg-secondary"
        }`
      );
      debilidad.textContent = pokemon.weakness[i];
      debilidades.appendChild(debilidad);
    }
    var modal = new bootstrap.Modal(document.querySelector("#exampleModal"));
    modal.show();
  }
}

function limpiar(secccion) {
  while (secccion.firstChild) {
    secccion.removeChild(secccion.firstChild);
  }
}
eventListener();

function eventListener() {
  buscar.addEventListener("keypress", buscarPokemon);
  limpiarbuscador.addEventListener("click", limpiarseach);
  orden.addEventListener("change", OrdenarPokemon);
}

function buscarPokemon(e) {
  console.log("Estoy buscando...");
  if (e.key === "Enter") {
    let resultadoBuscar = pokemon.buscar(e.target.value);
    console.log(pokemon.buscar(e.target.value));
    const listapoke = new Pokedex();
    listapoke.agregar(resultadoBuscar);
    console.log(listapoke);
    imprimirPokemones(listapoke);
  }
}

function limpiarseach() {
  imprimirPokemones(pokemon);
}

function cambiar(indiceA, indiceB, arreglo) {
  const temp = arreglo[indiceA];
  arreglo[indiceA] = arreglo[indiceB];
  arreglo[indiceB] = temp;
  return arreglo;
}
function OrdenarPokemon(e) {
  console.log(pokemon);
  console.log(pokemon.BurbujaObjeto(pokemon, e.target.value));
//   let resultadoOrden = pokemon.BurbujaObjeto(pokemon, e.target.value);
  let resultadoOrden = pokemon.metodoSeleccion(pokemon, e.target.value);
  const listapoketem = new Pokedex();
  for (let i = 0; i < resultadoOrden.length; i++) {
    listapoketem.agregar(resultadoOrden[i]);
  }
  console.log(listapoketem);
  imprimirPokemones(listapoketem);
}
