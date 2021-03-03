import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  mediaSub: Subscription;
  deviceXs: boolean;
  constructor(
    public mediaObserver: MediaObserver,
  ) { }
  /**
   * descripcion: uso de flexlayout para determinar el tamaño de dispositivo para el diseño responsive
   * @author: @AlexAguilarP
   */
  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      ).subscribe((change: MediaChange) => {
        this.deviceXs = change.mqAlias === 'xs' ? true : false;
      });
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
