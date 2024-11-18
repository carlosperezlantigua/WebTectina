import { Routes } from '@angular/router';
import { InicioTempComponent } from './pages/inicioTemp/inicio-Temp.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TanquesCombustibleComponent } from './pages/tanques-combustible/tanques-combustible.component';
import { OrdenPagoComponent } from './pages/orden-pago/orden-pago.component';
import { LecturaMedidoresComponent } from './pages/lectura-medidores/lectura-medidores.component';
import { DemandaCombustibleComponent } from './pages/demanda-combustible/demanda-combustible.component';
import { ClientesCajaExtraComponent } from './pages/clientes-caja-extra/clientes-caja-extra.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { SesionGuard } from './guards/sesion.guard';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'contratos', loadComponent: () => import('./pages/control-contratos/control-contratos.component').then(mod => mod.ControlContratosComponent)},
    {path: 'tanques', component: TanquesCombustibleComponent, canActivate: [SesionGuard]},
    {path: 'ordenpado', component: OrdenPagoComponent},
    {path: 'lecturas', component: LecturaMedidoresComponent},
    {path: 'demandacombustible', component: DemandaCombustibleComponent},
    {path: 'cajaextra', component: ClientesCajaExtraComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', title: 'Dashboard Page', component: DashboardComponent},
    {path: 'register', component: RegisterComponent},


    {path:'inicioTemp', component:InicioTempComponent},
    {path:'empleado/:id', component:EmpleadoComponent}    
];
