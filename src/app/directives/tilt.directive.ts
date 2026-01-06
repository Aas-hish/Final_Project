import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTilt]',
    standalone: true
})
export class TiltDirective {
    @Input() rotationMax = 15; // Increased default for more visibility
    @Input() scale = 1.05;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
        this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        const rect = this.el.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calculate center relative to mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (inverted logic for natural feel)
        const rotateX = ((y - centerY) / centerY) * -this.rotationMax;
        const rotateY = ((x - centerX) / centerX) * this.rotationMax;

        this.renderer.setStyle(
            this.el.nativeElement,
            'transform',
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${this.scale})`
        );
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.renderer.setStyle(
            this.el.nativeElement,
            'transform',
            'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
        );
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s ease-out');
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        // Reset transition for fast response
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
    }
}
