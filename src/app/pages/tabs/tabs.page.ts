import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { videocamOutline, starHalfOutline, personOutline } from 'ionicons/icons';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonTabs, IonTabBar, IonTabButton, IonIcon]
})
export class TabsPage implements OnInit {

  constructor() {
    addIcons({videocamOutline, starHalfOutline, personOutline});
  }

  ngOnInit() {
  }

}
