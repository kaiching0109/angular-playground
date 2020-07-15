import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core'

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    //listen to click
    //toggle class open to btn-group
    /**
     *
     */
    isOpen = false;
    @HostBinding('class.open')  public bindStyle: boolean = false;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit() {
    }

    @HostListener('click') toggleOpen(eventData: Event) {
        // if(!this.isOpen)
        //     this.renderer.addClass(this.elRef, 'open');
        // else 
        //     this.renderer.removeClass(this.elRef, 'open');
        this.bindStyle = !this.bindStyle;
    }       
}