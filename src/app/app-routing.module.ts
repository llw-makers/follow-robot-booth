import { HomeComponent } from './components/home/home.component';
import { CameraComponent } from './components/camera/camera.component';
import { PreviewComponent } from './components/preview/preview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardReaderComponent } from './components/card-reader/card-reader.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {path: "camera", component: CameraComponent},
    {path: "images", component: PreviewComponent},
    {path: "cardreader", component: CardReaderComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
