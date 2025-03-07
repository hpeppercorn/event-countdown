import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {

  getFontSizes() {
    var titleMaxFontSize = 0.1*window.innerWidth;
    var counterMaxFontSize = 0.09*window.innerWidth;
    var titleFontSize = sessionStorage.getItem('countdown-title-fontSize')  || titleMaxFontSize;
    var counterFontSize = sessionStorage.getItem('countdown-counter-fontSize')  || counterMaxFontSize;

    return {titleMaxFontSize, counterMaxFontSize, titleFontSize, counterFontSize};
  }
}
