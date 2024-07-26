import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';


import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  //styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];
  paginador:any;
  clienteSeleccionado:Cliente;

  public chart: any;

  


  

  constructor(private clienteService:ClienteService,private activatedRoute:ActivatedRoute, private modalService:ModalService) { 
  }

  ngOnInit(): void {
   
    this.activatedRoute.paramMap.subscribe(params=> {
    let page:number=+params.get('page');
    if(!page){
      page=0;
    }
    this.clienteService.getClientes(page)
    .pipe(
      tap(response=>{
        (response.content as Cliente[]).forEach(cliente=>{
          console.log(cliente.nombre);
        });
      })
        ).subscribe(response=>{
          this.clientes=response.content as Cliente[]
          this.paginador=response
        });
      }
    );

    this.modalService.notificarUpload.subscribe(cliente=>{
     this.clientes = this.clientes.map(clienteOriginal=>{
      if(cliente.id==clienteOriginal.id){
        clienteOriginal.foto=cliente.foto;
      }
      return clienteOriginal; 
      })
    })

    this.createChart();

  }


  delete(cliente: Cliente): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(cliente:Cliente){
    
    this.clienteSeleccionado=cliente;
    this.modalService.abrirModal();
  }


  createChart(){
    Chart.register(ChartDataLabels);
    this.chart = new Chart("MyChart",
     {
      type: 'bar',
      data: {
        labels: ['actividad1', 'actividad2', 'actividad3','actividad4',
								 'OTRO', 'ACTIVIDADX', 'actividad6','actividad5', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['10','50', '60', '70', '92','50', '11', '3'],
            backgroundColor: ['red','blue','green','purple']
          }  
        ]
      }
      ,
      options: {
        aspectRatio:2.5,
        indexAxis: 'y',
        scales: {
         // yAxes: [{ticks: {mirror: true}}]
         //yAxes: {ticks: {mirror: true}}
        },
        plugins: {
          datalabels: {
            /* anchor puede ser "start", "center" o "end" */
            anchor: "center",
            /* Podemos modificar el texto a mostrar */
            formatter: function(value, context) {
              var concatenado=value+"% "+context.chart.data.labels[context.dataIndex]
              return concatenado
            },
            /* Color del texto */
            color: "white",
            /* Formato de la fuente */
            /* Formato de la caja contenedora */
            //padding: "4",
            //borderWidth: 2,
            //borderColor: "darkblue",
            //borderRadius: 8,
            //backgroundColor: "lightblue"
          }
        
        
      }
    }}
    );
  }
  

}
