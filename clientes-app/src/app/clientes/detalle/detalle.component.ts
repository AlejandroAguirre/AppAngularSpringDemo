import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'detalle-cliente',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.css'],
    standalone: true,
    imports: [NgIf, NgStyle]
})
export class DetalleComponent implements OnInit {

  @Input()  cliente :Cliente;
  titulo: String="Detalle del cliente";
  private fotoSeleccionada:File
  progreso:number=0;

  constructor(private clienteService:ClienteService, public  modalService:ModalService) { }

  ngOnInit(): void {
    /*this.activadedRoute.paramMap.subscribe(params=>{
      let id:number=+params.get('id')
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente=>{
          this.cliente=cliente;
        });
      }
    }); Se elimina con implementacion de modal*/
  }

  seleccionarFoto(event){
    this.progreso=0;
    this.fotoSeleccionada=event.target.files[0];  
    if(this.fotoSeleccionada.type.indexOf('image') <0){
      swal('Formato incorrecto revise porfa ','seleccione otra vez','error')
      this.fotoSeleccionada=null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal('Error al subir imagen ','seleccione otra vez','error')
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id).subscribe(
        event=>{
          if(event.type===HttpEventType.UploadProgress){
            this.progreso=Math.round((event.loaded/event.total)*100);
          }else if(event.type===HttpEventType.Response){
            let response:any=event.body
            this.cliente=response.cliente as Cliente;
            this.modalService._notificarUpload.emit(this.cliente)//actualica cuando sube imagen
            swal('La foto fue subida!',`la foto se subio ${this.cliente.foto}`,'success')

          }
         // this.cliente=cliente;
        }
      );
    }
    
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    this.progreso=0;
  }

}
