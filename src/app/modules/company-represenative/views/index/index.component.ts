import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class GestionComponent {

}
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById('menu-icon') as HTMLElement | null;
  const menuList = document.getElementById('menu-list') as HTMLElement | null;

  if (menuIcon && menuList) {
    menuIcon.addEventListener('click', () => {
      if (menuList.style.display === "none" || menuList.style.display === "") {
        menuList.style.display = "flex";
      } else {
        menuList.style.display = "none";
      }
    });
  } else {
    console.error('Menu icon or menu list element not found.');
  }
});