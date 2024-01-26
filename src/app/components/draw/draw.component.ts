import { Component } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
})
export class DrawComponent {
  constructor() {}
  ngOnInit() {
    //this.createBox(50, 100, 20, 30);
  }

  createBoxButton() {
    let tick = 0;
    let coords: { x: number, y: number }[] = [];
  
    function clickHandler(event: any) {
      if (event.target.tagName.toLowerCase() === 'div') {
        console.log(event.target.tagName.toLowerCase());
        const xPos = event.clientX;
        const yPos = event.clientY;
  
        // Save coordinates for the first two clicks
        if (tick < 2) {
          coords[tick] = { x: xPos, y: yPos };
          console.log(coords[tick]);
        }
  
        tick = tick + 1;
  
        if (tick >= 2) {
          document.removeEventListener('click', clickHandler);
          console.log('Event listener removed');
  
          // Now you can use coords[0] and coords[1] for calculations
          const deltaX = coords[1].x - coords[0].x;
          const deltaY = coords[1].y - coords[0].y;
  
          console.log('Delta X:', deltaX);
          console.log('Delta Y:', deltaY);
  
          const drawBox = document.getElementById('draw');
  
          if (!drawBox) {
            console.error('Draw box not found!');
            return;
          }
  
          const div = document.createElement('div');
          div.style.width = `${Math.abs(deltaX)}px`;
          div.style.height = `${Math.abs(deltaY)}px`;
          div.style.left = `${Math.min(coords[0].x, coords[1].x)}px`;
          div.style.top = `${Math.min(coords[0].y, coords[1].y)}px`;
          div.style.position = "absolute";
          div.style.border = '1px solid black';
          div.style.backgroundColor = 'lightblue';
  
          drawBox.appendChild(div);
          console.log(div);
        }
      }
    }
  
    document.addEventListener('click', clickHandler);
  }
}
