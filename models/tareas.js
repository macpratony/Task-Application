const colors = require('colors');
const Tarea = require('./tarea');


class Tareas {
    
    _listado = {};

    get listadoArr(){

        const listado = [];
            Object.keys(this._listado).forEach( key =>{
                const tarea = this._listado[key];
                listado.push( tarea );
              
            });

        return listado;
    }
    
    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '') {

        if ( this._listado[id]){
            delete this._listado[id];
        }
    }
    cargarTareaFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;

        });


    }

    crearTarea( desc = '') {

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        //Solucion 1
        /*const itemTarea = this.listadoArr;
         let num = 1;

         if( itemTarea.length <= 0){
             console.log('\n No existe tareas en el archivo'.red);
             return null;
         }

        itemTarea.forEach( tarea => {
           
            if( tarea.completadoEn === null){
                console.log(colors.green(num+':') +' '+ tarea.desc + ' :: ' + 'Pendiente'.red);
            }else{
                console.log(colors.green(num+':') +' '+ tarea.desc + ' :: ' + 'Completada'.green);
            }
            num++;
        });*/

        //Solucion 2
        console.log();
        if( this.listadoArr.length === 0){
            console.log('\n No existen tareas en el archivo...'.red);
            return null;
        }
        this.listadoArr.forEach( (tarea, i) => {
            
            const idx = `${i + 1}:`.green;
            const { desc, completadoEn} = tarea; //Destructuracion de objetos
            const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;
            
            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });

    }

    listarPendientesCompletadas( completadas = true ) {
        
        let contador = 1;
        console.log();
        this.listadoArr.forEach( tarea => {
            
            const { desc, completadoEn} = tarea; //Destructuracion de objetos

            if(completadas){
                if( completadoEn ){
                    const estado = 'Completada'.green;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn }`);
                    contador++;
                }
                
            }else{
                if( !completadoEn ){
                    const estado = 'Pendiente'.red;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn }`);
                    contador++;
                }
            }
            
        }); 

    }
}

module.exports = Tareas;