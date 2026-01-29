import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './error-404.html',
  styleUrl: './error-404.css',
})
export class Error404 {
  pupilTransform = 'translate(0px, 0px)';

  @ViewChild('eyeContainer') eyeContainer!: ElementRef;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.eyeContainer) return;

    const eye = this.eyeContainer.nativeElement;
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

    // Limit the pupil movement radius
    const maxRadius = 15;
    const distance = Math.min(
      Math.sqrt(Math.pow(mouseX - eyeCenterX, 2) + Math.pow(mouseY - eyeCenterY, 2)),
      maxRadius
    );

    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    this.pupilTransform = `translate(${pupilX}px, ${pupilY}px)`;
  }
}
