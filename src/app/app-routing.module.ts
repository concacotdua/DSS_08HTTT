import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecruitersComponent } from './components/recruiters/recruiters.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'trang-chu', component: HomeComponent },
  { path: 'gioi-thieu', component: RecruitersComponent },
  { path: 'lien-he', component: CompaniesComponent },
  { path: 'dich-vu', component: ServicesComponent },
  { path: 'dang-nhap', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
