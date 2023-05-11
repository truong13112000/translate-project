import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextTranslateComponent } from './text-translate/text-translate.component';

const routes: Routes = [
 // { path: 'translate', component: TextTranslateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
