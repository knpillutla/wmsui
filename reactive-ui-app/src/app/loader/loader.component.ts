import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface LoaderConfig {
  backgroundColor?: string;
  loaderColor?: string;
  loaderSize?: number;
  loaderText?: string;
}

const DEFAULT_CONFIG: LoaderConfig = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  loaderColor: '#669BC6',
  loaderSize: 50
};

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnChanges {
  // initial configuration required for creating jquery based kendo splitter
  @Input('config') config: LoaderConfig = DEFAULT_CONFIG;
  @Input('visible') visible: boolean;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['config'] && changes['config'].currentValue) {
      this.config = Object.assign({}, DEFAULT_CONFIG, this.config);
    }
  }


}
