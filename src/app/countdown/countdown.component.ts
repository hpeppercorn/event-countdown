import { Component } from '@angular/core';
import { ResizeService } from '../resize/resize.service';
import { FontSizeService } from '../font-size/font-size.service';

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {

  constructor(private resizeService: ResizeService, private fontSizeService: FontSizeService) { 
    screen.orientation.addEventListener("change", (event) => {
      console.log(event);
      setTimeout(() => this.resizeService.handleResize('countdown-title', 'countdown-title-wrapper', this.fonts.titleMaxFontSize), 100);
      setTimeout(() => this.resizeService.handleResize('countdown-counter', 'countdown-counter-wrapper', this.fonts.counterMaxFontSize), 100);
    });
  };

  fonts = this.fontSizeService.getFontSizes();

  ngOnInit() {
    if (this.countdownDate.length > 0) {
      var intervalId: ReturnType<typeof setTimeout> = setInterval(() => this.handleCountdown(intervalId), 1000);
    };
  };

  title = sessionStorage.getItem("title") || "";
  countdownDate = sessionStorage.getItem("countdownDate") || "";
  countdownDisplay = "0 days, 0h, 0m, 0s";

  handleChangeTitle(event: Event) {
    var target = event.target as HTMLInputElement; // typescript complains that "value" does not exist unless target is cast to specific type
    this.title = target.value || "";
    sessionStorage.setItem("title", this.title);
    this.resizeService.handleResize('countdown-title', 'countdown-title-wrapper', this.fonts.titleMaxFontSize);
  };

  handleCountdown(intervalId: ReturnType<typeof setTimeout>){
    var now = Date.now();
    var timeUntil = new Date(`${this.countdownDate}T00:00:00`).getTime() - now;

    var days = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeUntil % (1000 * 60)) / 1000);

    this.countdownDisplay = days + " days, " + hours + "h, " + minutes + "m, " + seconds + "s";

    if (timeUntil < 0) {
      clearInterval(intervalId);
    }
  };

  startCountdown(event: Event){
    var target = event.target as HTMLInputElement; // typescript complains that "value" does not exist unless target is cast to specific type
    this.countdownDate = target.value;
    sessionStorage.setItem("countdownDate", this.countdownDate);
    var intervalId: ReturnType<typeof setTimeout> = setInterval(() => this.handleCountdown(intervalId), 1000);
    setTimeout(() => this.resizeService.handleResize('countdown-counter', 'countdown-counter-wrapper', this.fonts.counterMaxFontSize), 1001);
  };
}
