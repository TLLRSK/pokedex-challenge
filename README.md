# POKEDEX CHALLENGE

## Herramientas elegidas:
Vite + Vue 3 + TypeScript + Tailwind CSS + Vitest

### ¿Por qué estas herramientas? 
Dos razones principales:
- Vue.js y Tailwind Css forman parte del stack utilizado por Onestic para el desarrollo de proyectos.
- Quiero probarme a mí mismo llevando a cabo un proyecto con herramientas con las que apenas estoy familiarizado y que me obliguen a aprender en el proceso.

Con este proyecto intentaré aprender/practicar/mejorar mis conocimientos de:
- Vue 3 (gestión de eventos y props, manejo de rutas, ciclo de vida de Vue, funciones asíncronas)
- Conceptos básicos de Tailwind CSS
- Conceptos básicos de TypeScript
- Pruebas unitarias con Vitest

### DISEÑO
Diseño hecho con Figma. Contiene dos vistas: Home y Favs. Diseñado para móvil, tablet y escritorio.


### COMPONENTES
List de componentes:
- HeaderBar
- Light mode toggler
- Nav
- View Toggler
- Pokemon List
- Pokemon List Item
- Pokemon Card
- Pagination


#### HeaderBar
Contiene título de la App, light mode toggler y nav.


#### Light mode toggler
Al hacer click cambia las variables usadas que usar para dar color a los elementos de la aplicación y el icono del propio light mode toggler.


#### Nav
contiene enlaces a: Home, Favs.

En mobile es un botón que muestra la lista de links contenida en el nav.
  - El menú se cerrará al hacer tap en un enlace, en el botón de mostrar menú o fuera del menú.

En resto de resoluciones simplemente mostrará la lista.


#### View Toggler
Componente con dos input radios con los que alternar entre modo list y modo grid. El uso de estos inputs cambiará el valor de currentView, permitiendo el cambio de estilo.

Funcionamiento:
1. Al seleccionar input, envía su valor a App
2. Cambia el valor de currentView en App
3. Cambiar el estilo de PokemonList
4. Cambiar el estilo de PokemonListItem


#### Pokemon List
Muestra una serie de PokemonListItem usando una lista de items pasada como prop.

La cantidad de pokemons pasada como prop se calcula usando:
- Lista de todos los pokemons en pokedexData.
- Número de página actual.
- Cantidad máxima de Pokémon por página.

Funcionamiento:
1. Obtener lista completa (list).
2. Obtener el primer pokemon (start) del nuevo array usando currentPage y los pokemonsPerPage.
3. Obtener el último pokemon (end) del nuevo array usando currentPage y pokemonsPerPage
4. Generar un nuevo array cortando list usando los valores start y end.
5. Renderizar un PokemonListItem por cada pokemon mapeando el nuevo array.
6. Obtener nuevo valor de currentPokemons cada vez que haya un cambio de página.


#### Pokemon List Item
Muestra la información básica (sprite, id, nombre, types) de cada pokemon pasado como prop desde Pokemon List.


#### Pokemon Card
Muestra detalles del pokemon seleccionado (sprite, id, nombre, types y stats). Además contendrá un botón para añadir a la lista de favoritos y un botón para deseleccionar el pokemon.

Usa el color del tipo principal del Pokémon para colorear los elementos de la tarjeta.

En mobile y tablet se mostrará sobre el resto de elementos cuando el usuario seleccione un Pokémon.
En desktop se mostrará sobre la ranura de la tarjeta cuando el usuario seleccione un Pokémon.


##### Pagination
Compuesta por:
- Botones de next y prev page.
- Botón de página indexada

Funcionamiento:
1. Usar la lista de pokemons pasada como prop.
2. Calcular la cantidad de páginas dividiendo la cantidad total elementos en lista por el valor de pokemonsPerPage en cada página y redondear con Math.ceil.
3. En caso de que el resultado sea 0, devolver la cantidad = 1.
4. Si el usuario está en la primera o última página, deshabilitar el botón anterior o siguiente según corresponda.
5. Al cambiar currentPage usar Vue router para cambiar la ruta del navegador.


### Views


#### POKEDEX
Debe mostrar solo los 210 Pokémon de Sinnoh.

URL con información sobre los Pokémon: https://www.wikidex.net/wiki/Lista_de_Pok%C3%A9mon_seg%C3%BAn_la_Pok%C3%A9dex_de_Sinnoh
Documentación de Pokeapi sobre el endpoint de pokedexes: https://pokeapi.co/docs/v2#utility-section

Pokedex indexada: https://pokeapi.co/api/v2/pokedex/
Pokémon indexados en la Pokedex de Sinnoh: https://pokeapi.co/api/v2/pokedex/6/


#### FAVS
Similar a Pokedex, pero muestra el listado de Pokemons guardados en localStorage como favourites.

Carga de lista favourites:
1. Verificar si hay Pokémon favoritos en localStorage al iniciar App.
2. Si hay Pokémon favoritos, parsear JSON y guardar la lista.
3. Al renderizarse el view Favs, usar la lista de favoritos como prop.

Uso en selectedPokemon:
1. Al mostrar el pokemon seleccionado en PokemonCard, verifica si el dicho pokemon está en la lista de favoritos usando su ID.
2. Cambia el estilo del botón de favorito según la condición listado/no listado.
3. Al hacer clic en la tarjeta del pokemon, agregar o eliminar el pokemon de la lista de Pokémon favoritos usando su ID.
  - Usar findIndex() para verificar si ese Pokémon existe en la lista y su índice en el array.
  - Si está en el array, usar el índice para eliminarlo con splice.
  - Si NO está en el array, agregarlo con push.

Link: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex


### DIARIO

#### Indexando componentes y views:
Encontré un error (cannot access before initialization) al importar componentes desde index.js, se solucionó ordenando la forma en que se exportan los archivos.

#### Encontrando pokemons en PokeAPI
Encontré problemas al intentar obtener algunos Pokémon individuales probando con Thunder Client:

- Ejemplo de datos de cada pokemon individual en este formato usando el endpoint "https://pokeapi.co/api/v2/pokedex/6/":
{
  "entry_number": 4,
  "pokemon_species": {
    "name": "chimchar",
    "url": "https://pokeapi.co/api/v2/pokemon-species/390/"
    }
},

- Di con casos como el de "https://pokeapi.co/api/v2/pokemon/giratina", que no es encontrado usando el endpoint "https://pokeapi.co/api/v2/pokemon/giratina".

- Para poder hallar una solución usé la id contenida en la URL (390 en este caso) dando como resultado el endpoint "https://pokeapi.co/api/v2/pokemon/390" y los datos correspondientes al pokemon.

Code:
const splittedId = pokemonUrl
  .split("/")
  .filter((a) => a != '')
  .pop();
const url = `https://pokeapi.co/api/v2/pokemon/${splittedId}`;


#### Creando safeColors en Tailwind CSS:
Encontré un problema al intentar aplicar clases dinámicas a los elementos de tipo de Pokémon. Usando el inspector pude comprobar que las clases aparecían como correspondía en el HTML, pero estas no se aplicaban.
Tras investigar un poco, pude encontrar el problema, y es que Tailwind no detecta estas clases dinámicas al usar clases estáticas, por lo que necesita tener acceso a esas clases previamente para poder generar el estilo correctamente.

Terminé usando la opción 2 contenida en este artículo:
https://medium.com/@achronus/solving-a-niche-frontend-problem-dynamic-tailwind-css-classes-in-react-da5f513ecf6a


#### Array con Views options
Encontré algunos problemas al implementar el componente ViewToggler al pasar un componente personalizado desde App de esta manera:

views: [
  {
    name: 'grid',
    icon: Grid,
  },
  {
    name: 'list',
    icon: List,
  },
],

Apareció un mensaje de advertencia en la consola sugiriendo marcar el componente con markRaw o usar shallowRef.

Lo solucioné aplicando la primera opción:

views: [
  {
    name: 'grid',
    icon: markRaw(Grid),
  },
  {
    name: 'list',
    icon: markRaw(List),
  },
],

Enlace: https://reintech.io/blog/working-with-dynamic-components-in-vuejs

Nota: Al migrar a Composition API he podido volver al planteamiento inicial sin que salga el mensaje de aviso anterior.

Por otro lado, tuve que averiguar cómo renderizar dinámicamente las diferentes opciones de view contenidas en el array, pero no sabía muy bien cómo añadir el componente Icon correspondiente. Tras varias consultas pude dar con una solución contenida en el siguiente artículo:

Enlace: https://www.w3schools.com/vue/vue_dynamic-components.php


#### Inject/Provide
Encontré problemas al intentar transferir datos desde la raíz App a componentes anidados, todo OK al pasar valores iniciales usando inject/provide y al cambiarlos desde desde los hijos usando custom events o funciones proveídas, pero los cambios sufridos en los valores inyectados no se reflejan en los hijos. Por lo que pude averiguar, y si no me equivoco puesto que apenas conozco este framework, provide/inject no permite trabajar de forma reactiva tal y como tenía pensado, por lo que si quería manejar estados de forma centralizada con la posibilidad de mutarlos desde componentes anidades debía buscar otra opción.

De primeras opté por la más sencilla, que es pasar los props de padre a hijo sucesivamente, aunque no tuviese mucho sentido que componentes recibiesen información que no iban a usar. Otra opción era utilizar una store (con Vuex) para manejar el estado de forma global, pero no quería usar una herramienta así para una aplicación pequeña teniendo otras opciones.

En su lugar terminé optando por migrar a Compositions API y de paso experimentar con ella por primera vez.

Enlaces:
https://www.reddit.com/r/vuejs/comments/13rl6ms/best_way_to_pass_data_when_dealing_with_deeply/
https://www.codemag.com/Article/2101091/The-Complete-Guide-to-Provide-Inject-API-in-Vue-3-Part-1
https://medium.com/@gopi15699/provide-vs-inject-in-vue3-a7973976a602
https://vuejs.org/guide/components/provide-inject
https://vuejs.org/guide/extras/composition-api-faq.html

#### Configurando grupos de clases dinámicas
Encontré problemas al dar clases a los diferentes elementos que conforman el componente PokemonListItem, anidados en PokemonList, dependiendo de la view activa (valor en el ámbito del componente raíz).

Mi primera idea fue que PokemonList tuviese una clase view--grid o view--list, y que los elementos de PokemonListitem pudiesen cambiar su estilo en función del estilo del padre, pero no sabía muy bien cómo hacer eso con Tailwind y el enfoque utilities first. Aunque sí sabría de la forma tradicional en un style.css, no quería hacer uso de esa opción. Encontré una posible solución  configurando plugins y variantes, pero por cuestiones de tiempo intenté hallar una solución más simple usando el valor de view y funciones que devolviesen el conjunto de clases.

Ejemplo:

Template que debe recibir las clases:

<div 
  v-for="(type, index) in pokemonData.types"
  :class="[showTypes(type), setTypeClass]"
  :key="index"
  >
    <span :class="setTypeSpanClass">
    {{type.type.name}}
    </span>
</div>


Función que devuelve las clases:

const setTypesClass = computed(() => ({
    'flex gap-2 ml-auto': currentView.value === 'list',
    'flex gap-2': currentView.value === 'grid',
}));


Me gustaría encontrar una solución más limpia y manejable solo con Tailwind.

Enlace: https://v2.tailwindcss.com/docs/configuring-variants.

#### Dark mode con Tailwind CSS usando variables CSS y preferencia del esquema de color del usuario:
Tenía la idea clara de cómo quería manejar el cambio de estilo, a través de variables declaradas en mi .css principal, pero leí un par de artículos para ver con más claridad qué pasos debía seguir.

Enlaces:
https://invertase.io/blog/tailwind-dark-mode
https://www.sitepoint.com/theming-tailwind-css-variables-clean-architecture/

#### Vue Router
No he tenido ningún problema haciendo uso de Vue Router por primera vez por su similitud con React Router, pero sí he necesitado consultar lo siguiente:_
- Documentación oficial: https://router.vuejs.org/
- Vue - The Complete Guide, curso creado por Maximilian Schwarzmüller (Udemy)


#### límite en localStorage excedió la cuota
Encontré que localStorage tiene un límite de 29 elementos a través de este mensaje en consola:

"Found that localStorage has a limit number of 29 items. For now keeping pagination on Favs looks useless but I'll keep it anyway."
 
Dado que el máximo de elementos en localStorage no supera pokemonsPerPage, eliminé la paginación de la View Favs. De ser necesaria habría sido conveniente crear un Composable, que por lo que he podido leer se asemejan a los Custom Hooks de React.

#### Cerrar menú de links en Nav al hacer clic fuera
Encontré problemas al hacer que el menú con la lista de links contenida en Nav funcionase correctamente. El primer enfoque era referenciar el elemento input y usar su valor checked para condicionar el comportamiento de la lista, pero no conseguía el resultado que necesitaba. Después de pensar y buscar opciones, lo solventé del siguiente modo usando un watcher sobre el valor isChecked:

1. Conseguir la lista de enlaces para renderizar la lista usando Vue Router.
2. Cambiar el elemento input:checkbox a button para evitar problemas con el evento click.
3. Al hacer click en el botón menu toggler, alternar isChecked. Si el valor de isChecked es true, el menú se abre, si es false, se cierra.
4. Si el menú está abierto, crear un eventListener.
5. Si no está abierto, eliminar eventListener.
6. Si hay un click fuera de la lista de enlaces o en algún link de la lista, el valor de isChecked pasa a falso y el menú se cierra.


#### TypeScript
Tuve dificultades a la hora de tipar algunos valores, motivados generalmente por mi falta de conocimiento en el uso de esta herramienta. El grueso de esos problemas están relacionados con el propio Vue, el uso de referencias y props, y principalmente con el valor de selectedPokemon, que después de typarlo y desclararlo en la raíz App, seguía obteniendo este error al compilar que no supe cómo solucionar por mi cuenta más allá de typarlo como any.

Mensaje de error al compilar.

src/App.vue:195:7 - error TS2322: Type 'Ref<PokemonData | undefined>' is not assignable to type 'Ref<PokemonData>'.
  Type 'PokemonData | undefined' is not assignable to type 'PokemonData'.
    Type 'undefined' is not assignable to type 'PokemonData'.

195       selectedPokemon,
          ~~~~~~~~~~~~~~~

  src/interfaces/appData.ts:16:5
    16     selectedPokemon: Ref<PokemonData> | undefined;
           ~~~~~~~~~~~~~~~
    The expected type comes from property 'selectedPokemon' which is declared here on type 'AppData'


En este caso me apoyé en ChatGPT para intentar hallar soluciones, y probando diferentes opciones di con el uso de casting al devolver selectedPokemon dentro del provide().

Links:
https://vuejs.org/guide/typescript/composition-api


#### Pruebas unitarias con Vitest
Similar a la dificultad con la tipificación, trabajar con un nuevo framework requiere conocimientos que aún no tengo. El principal problema que tuve surgía al intentar acceder a la appData que se provee desde el componente original. De nuevo, apoyándome en ChatGPT y contrastando información en diferentes fuentes, di con una solución:

const wrapper = mount(Pagination, {
  props: { items },
  global: {
    provide: {
      appData: mockAppData,
    },
  },
});

Links:
https://stackoverflow.com/questions/53763440/how-can-i-test-a-computed-property-in-vuejs-using-jest
https://medium.com/@selvam4win/vue-3-unit-testing-vue-test-utils-composition-api-1b0530a0b95f


Otro problema que apareció relacionado con Typescript y Vitest sucedía en tailwind.config.ts. Recibía este error al compilar:

vite.config.ts:1:30 - error TS2307: Cannot find module 'vite/config' or its corresponding type declarations.

Lo arreglé cambiando la primera línea en vite.config.ts:

import { defineConfig } from 'vite/config'; => import { defineConfig } from 'vitest/config';


### CONCLUSIONES
Quería probarme a mí mismo estando fuera de mi zona de confort y eso es lo que hice. Mi objetivo era desarrollar este proyecto con herramientas con las que no he trabajado durante más de 2 semanas, aprender y tomar decisiones en el proceso. Todas las funcionalidades que quería incluir están ahí, aunque me gustaría tener tiempo y conocimiento para crear un código más limpio, reutilizable y escalable, agregar un comportamiento más suave y orgánico a los componentes de UI.

Dejo como material de estudio a futuro las siguientes cuestiones:
- Composables
- Diferencias entre 'ref' y 'reactive'
- Typescript y Vue
- Tailwind plugins
- Tests unitarios en Vue