import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'', redirectTo:'/clientes',pathMatch:'full'
  },
  {
    path:'directivas', 
    //component:DirectivaComponent,
    loadComponent:()=> import('./directiva/directiva.component').then(c=>c.DirectivaComponent)
  },
  {
    path:'clientes', 
    //component:ClientesComponent,
    loadComponent:()=> import('./clientes/clientes.component').then(c=>c.ClientesComponent)
  },
  {
    path:'clientes/page/:page', 
   // component:ClientesComponent,
    loadComponent:()=> import('./clientes/clientes.component').then(c=>c.ClientesComponent)
  },
  {
    path:'clientes/form' ,
    //component:FormComponent,
    loadComponent:()=> import('./clientes/form.component').then(c=>c.FormComponent)
  },
  {
    path:'clientes/form/:id' ,
    //component:FormComponent,
    loadComponent:()=> import('./clientes/form.component').then(c=>c.FormComponent)
  },
]


