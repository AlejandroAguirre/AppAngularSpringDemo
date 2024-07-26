import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Observable ,throwError} from 'rxjs';
import { Cliente } from './cliente';
import { Region } from './region';

import { CLIENTES } from './clientes.json';
import { of } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map ,catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient, private router:Router) { }

  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint+'/regiones')
  } 

  getClientes(page:number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
    tap((response:any) =>{
    (response.content as Cliente[]).forEach(cliente=>{
      console.log(cliente.nombre)
    });
  }),
    map((response:any)=>{
      (response.content as Cliente[]).map(cliente=>{
        cliente.nombre=cliente.nombre.toUpperCase();
        return cliente;
      });
      return response 
     }),
     tap(response=>{
     (response.content as Cliente[]).forEach(cliente=>{
      console.log(cliente.nombre);
    });
  })
  );
}

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e=>{
          this.router.navigate(['/clientes'])
          swal(e.error.mensaje,e.error.error,'error');
          return throwError (e)
        })
    );
  }

  create(cliente :Cliente ):Observable <any>{
    return this.http.post<any>(this.urlEndPoint,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(e)
        }
        swal(e.error.mensaje,e.error.error,'error');
        return throwError (e)
      })
    )
  }

  update(cliente:Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(e)
        }
        swal(e.error.mensaje,e.error.error,'error');
        return throwError (e)
      })
    )
  }

  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        swal(e.error.mensaje,e.error.error,'error');
        return throwError (e)
      })
    )

  } 

  subirFoto (archivo:File, id):Observable<HttpEvent<{}>>{
    let formData=new FormData
    formData.append("archivo", archivo);
    formData.append("id",id);

    const req=new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData,{
      reportProgress:true
    })
    return this.http.request(req).pipe();
  }

  
}
