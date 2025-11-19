import { Routes } from '@angular/router';
import { authGuard } from './custom/guards/auth.guard';
import { checkGuard } from './custom/guards/check.guard';
import { checkChildGuard } from './custom/guards/check-child.guard';
import { checkMatchGuard } from './custom/guards/check-match.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [checkChildGuard], canMatch: [checkMatchGuard],
    children: [

      { path: 'databinding', loadComponent: () => import('./components/customer/databinding/databinding.component').then(m => m.DatabindingComponent), title: 'Data Binding' },
      { path: 'dir/:id', loadComponent: () => import('./components/customer/directive-sample/directive-sample.component').then(m => m.DirectiveSampleComponent), title: 'Directives' },
      {
        path: 'pipesample',
        loadComponent: () => import('./components/pipe-sample/pipe-sample.component').then(m => m.PipeSampleComponent), title: 'Directive Sample',
        // canActivateChild: [checkChildGuard],
        children: [
          { path: 'personal', loadComponent: () => import('./components/pipe-sample/personal/personal.component').then(m => m.PersonalComponent), title: 'Personal Info' },
          {
            path: 'education', loadComponent: () => import('./components/pipe-sample/education/education.component').then(m => m.EducationComponent),
            // canMatch: [checkMatchGuard],
            title: 'Education Info'
          },
        ],
      },
      { path: 'datasharing', loadComponent: () => import('./components/customer/customer-add/customer-add.component').then(m => m.CustomerAddComponent), title: 'Cust Add component' },
      {
        path: 'templateForm', loadComponent: () => import('./components/product Forms/product-template-driven-form/product-template-driven-form.component').then(m => m.ProductTemplateDrivenFormComponent),
        title: 'Template Driven Form',
        //  canActivate: [authGuard], 
        // apply canActivate Route here for button click inside data binding component 
      },
      { path: 'modelForm', loadComponent: () => import('./components/product Forms/modeldriven-form/modeldriven-form.component').then(m => m.ModeldrivenFormComponent), title: 'Model Driven Form', canDeactivate: [checkGuard] },
      { path: 'observable', loadComponent: () => import('./components/obervable-sample/obervable-sample.component').then(m => m.ObervableSampleComponent), title: 'Observable Sample' },
      { path: 'productlist', loadComponent: () => import('./components/product Forms/product-list/product-list.component').then(m => m.ProductListComponent), title: 'Product List' },
      { path: 'hooks', loadComponent: () => import('./components/LifeCycle Hooks/parent/parent.component').then(m => m.ParentComponent), title: 'Lifecycle Hooks' },
    ]
  },
  { path: '**', redirectTo: '/login' }, // Wildcard route for a 404 page
];
