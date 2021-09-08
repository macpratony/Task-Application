require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareaBorrar,
        confirmar } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');



const main = async() =>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareaFromArray( tareasDB );
    }

    do{
      //Imprimir menú
      opt = await inquirerMenu();

      switch (opt) {
        case '1': //Crear tarea
      
            const desc = await leerInput('Descripcion:');
            tareas.crearTarea(desc);

          break;

          case '2': //Listar tareas
            tareas.listadoCompleto();

          break;

          case '3': //Listar tareas completadas
            tareas.listarPendientesCompletadas( true );
          break;

          case '4': //Listar tareas pendientes
            tareas.listarPendientesCompletadas( false );
          break;

          case '5': //Completar tarea(s)

          break;

          case '6': //Borrar tarea
            const id = await listadoTareaBorrar( tareas.listadoArr);
            if( id !== '0'){
              const ok = await confirmar('¿Está seguro?'.grey);
              if ( ok ){
                tareas.borrarTarea(id);
                console.log('\nTarea borrada correctamente...'.yellow);
              }
            }
            

          break;

          case '0': //Salir

          break;
      
        
      }

      guardarDB( tareas.listadoArr );

       await pausa();

    }while( opt !== '0');
    
}

main();