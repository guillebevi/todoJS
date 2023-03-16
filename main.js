 // Primer paso traernos los elementos de html
 
 const elinput = document.querySelector('.inpute');
 const agregarformulario = document.querySelector('.agregarFormulario');
 const listadetareas =  document.querySelector('.listatareas');
 const borrartareas = document.querySelector ('.botonBorrarTarea');


//DEFINIMOS LA LISTA DE TAREAS. si existe un array de tareas en el localstorage nos va a traer esa lista.
//En caso de que no exista ese array en el localstorage, va a ser un array vacio.
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

//creamos la funcion para guardar las tareas en el local storage, a medida que vayamos agregando.
const saveLocalStorage = listadetareas => {
localStorage.setItem('tareas', JSON.stringify(tareas));

};

//Creamos una funcion que va a recibir una tarea y se va a encargar del renderizado de cada tarea invidual.
//el DATA-ID lo vamos a utilizar para eliminar una tarea.
const crearTareas = tareas => 
 `<li>${tareas.name} <img src="./img/delete.png" class="delete-btn" data-id=${tareas.tareaID}></li>`;


//creamos la logica de la renderizacion de la lista de tareas. va a recibir la lista de tareas y mediante el uso de MAP
//va a renderizar cada una de las tareas, usando "crearTareas". que se creo previamente. 
// creamos el metodo de Join para evitar que aparezca una coma entre las tareas
const renderTareasLista = todolist => {
  listadetareas.innerHTML = todolist.map( tareas => crearTareas(tareas)).join('');
  };

  //creamos la logica para esconder el boton de borrar todas las tareas.
  //si no hay tareas va a desaparecer , sino lo muentra
  const esconderBotonBorraTodo = listadetareas => {
    if (!listadetareas.length) {
      borrartareas.classList.add('hidden');
      return;
    }
    borrartareas.classList.remove('hidden');
  };

//FUNCION PARA AGREGAR TAREAS.
//1. Al ser un Form usamos prevent default para evitar el comportamiento del Submit.
//2.Guardamos en una variable la tarea ingresada en el Imput y usamos el metodo Trim para borrar los espacios.
//3.Comprobamos si el imput esta vacio o si la tarea ya existe dentro del array de tareas.
//4.Si pasa este proceso de verificacion , usando el spread operator asignamos las tareas al array.
//5.Reseteamos el valor del input.
//6.renderizamos las tareas.
//7.guardamos en el localstorage.

const agregarTareas = evento => {
    //1.CANCELA EL EVENTO POR DEFECTO DEL SUBMIT (RECARGAR).
  evento.preventDefault();
  //2.GUARDAR EN UNA VARIABLE LA TAREA QUE INGRESEMOS EN EL INPUT.
  const tareaNombre = elinput.value.trim();
//3.
   if (!tareaNombre.length) {

    alert('Por favor, ingresa una tarea');

    return;
//3. pregunta si dentro del array de tareas hay alguna tarea que sea igual a la que estamos agregando, si existe tira el Alerta
  } else if (
    tareas.some(tareas => tareas.name.toLowerCase() === tareaNombre.toLowerCase())
  ) {
    alert('Ya existe una tarea con ese nombre');
    return;
  };
//4.
  tareas = [... tareas, { name: tareaNombre, tareaID: tareas.length + 1}]
  //5.
  elinput.value = '';
  //6.
  renderTareasLista(tareas);
  //7.
  saveLocalStorage(tareas);

  esconderBotonBorraTodo(tareas);

};

//CREAMOS LA FUNCION PARA BORRAR UNA TAREA.
//1. si el elemento que apretamos de la lista de tareas, osea el UL, no contiene la clase "delete-btn" no hacemos nada, por eso el return.
//2.creamos una variable donde vamos a almacenar el Id que filtraremos para guardar la tarea.
//3. filtramos la lista de tareas para que sea igual pero sin el elemento con el Id de la variable anterior (filterID).
//4. renderizamos.
//5. Actualizamos el localstorage.
//6.verificamos si se tiene que ocultar o no el boton de borrar todas las  tareas.


const removerTarea = evento => {
//1.
if (!evento.target.classList.contains('delete-btn'))
return;
//2.
const filterId = Number(evento.target.dataset.id);
//3.
tareas = tareas.filter(tareas => tareas.tareaID !== filterId)
//4.
renderTareasLista(tareas);
//5.
saveLocalStorage(tareas);
//6.
esconderBotonBorraTodo(tareas);
};


// FUNCION PARA BORRAR TODAS LAS TAREAS.
 const RemoverTodo = () => {
 tareas = [];
renderTareasLista(tareas);
saveLocalStorage(tareas);
esconderBotonBorraTodo(tareas);
};



//creamos la funcion INIT para poner en un solo lugar las tareas a realizar y los eventos del DOM.
//1. una vez que creemos la funcion para renderizar la lista de tareas, agregamos esta funcion para que se ejecute al principio, para
//que si hay tareas dentro del localstorage las pinte.
//2. agregamos el evento "AgregarTarea" que se le va a asignar al formulario.
//3. agregamos el evento "RemoverTarea" al elemento "Listadetareas" (ul).
//4.agregar el elemento "RemoverTodo" al boton "Delete-btn".
//5.Verificamos si se tiene que ocultar o no el boton, por si al cargar habia tareas en el local storage. 
 const init = () => {
 //1.
    renderTareasLista(tareas);
//2.
    agregarformulario.addEventListener('submit', agregarTareas);
//3.
    listadetareas.addEventListener('click',removerTarea);
//4.
    borrartareas.addEventListener('click', RemoverTodo);
//5.
    esconderBotonBorraTodo(tareas);
};

 init();