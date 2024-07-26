import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'})
export class FormComponent implements OnInit {

  public cliente :Cliente =new Cliente()
  regiones:Region[];
  public titulo:string="Crear cliente"
  public errores:string[]

  constructor(private clienteService:ClienteService, private router:Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarCliente()
    this.clienteService.getRegiones().subscribe(regiones=>{
      this.regiones=regiones
    });
  }

   create():void{
    this.clienteService.create(this.cliente).subscribe(
      json=>{
        this.router.navigate(['/clientes'])
        swal('Nuevo cliente ',`Cliente ${json.usuario.nombre} creado con éxito`,'success')
      },err=>{
        this.errores=err.error.errors as string[]
      }
    )
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params=>{  
      let id=params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente)=>this.cliente =cliente)
          
      }
    })
  }
  
  update():void{
    this.clienteService.update(this.cliente)
    .subscribe(
      json=>{
        this.router.navigate(['/clientes'])
        swal('Cliente actualizado ',`Cliente ${json.usuario.nombre} .`,'success')
      },err=>{
        this.errores=err.error.errors as string[]
      }
      ) 
  }

  compararRegion(o1:Region, o2:Region):boolean{
    return o1==null||o2==null?false: o1.id===o2.id;
  }

}
