import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  handleResize(elementId: string, wrapperElementId: string, maxFontSize: number) {

    var element = document.getElementById(elementId) as HTMLElement;
    var wrapperElement = document.getElementById(wrapperElementId);
    var fontSize = parseInt(getComputedStyle(element).getPropertyValue('font-size'));

    if (!element || !wrapperElement) {
      return;
    };

    while (element?.offsetWidth >= wrapperElement?.offsetWidth) {
      element.style.fontSize = fontSize + "px";
      fontSize -= 1;
    };

    while (element?.offsetWidth < wrapperElement?.offsetWidth && parseInt(element.style.fontSize) < maxFontSize) {
      element.style.fontSize = fontSize + "px";
      fontSize += 1;
    };

    sessionStorage.setItem(`${elementId}-fontSize`, fontSize.toString());
  };
}
