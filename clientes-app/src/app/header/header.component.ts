import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLinkActive, RouterLink } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterLinkActive, RouterLink, FormsModule]
})

export class HeaderComponent{
title:String ="App angular Spring"
}