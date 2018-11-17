import { Injectable } from '@angular/core';
import * as LoaderComponent from './loader.component';

@Injectable()
export class LoaderService {

  private counter = 0;
  private _visible = false;
  private _config: LoaderComponent.LoaderConfig = {
    loaderText : 'Loading ... '
  };

  public get visible() {
    return this._visible;
  }

  public get config() {
    return this._config;
  }

  public set config(config: LoaderComponent.LoaderConfig) {
    this._config = config;
  }

  public show() {
    setTimeout(() => {
      this.counter += 1;
      this._visible = true;
    });
  }

  public hide(force?: boolean) {
    setTimeout(() => {
      if (force) {
        this.counter = 0;
        this._visible = false;
      } else if (this.counter > 0) {
        this.counter -= 1;
        if (this.counter === 0) {
          this._visible = false;
        }
      }
    });
  }
}
