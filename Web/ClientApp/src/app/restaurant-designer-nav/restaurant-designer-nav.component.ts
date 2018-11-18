import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayoutService } from '../services/layout.service'
import { Layout } from '../../entities/layout'
import { DomSanitizer } from '@angular/platform-browser';
import { map, retry } from 'rxjs/operators';


const blankSvg = '<svg viewBox="0 0 100 100"></svg>';

@Component({
  selector: 'app-restaurant-designer-nav',
  templateUrl: './restaurant-designer-nav.component.html',
  styleUrls: ['./restaurant-designer-nav.component.css']
})
export class RestaurantDesignerNavComponent implements OnInit {
  @Input() id = 1;
  @Input() isSaved: boolean;
  @Output() layoutSelected = new EventEmitter();
  public layouts: Layout[];

  

  constructor(private layoutService: LayoutService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.layoutService.getLayouts(this.id).subscribe(result => {
      var layouts = result;
      layouts.forEach((layout) => layout.safeImage = this.sanitizeImage(layout.image));
      this.layouts = layouts;
    }, error => console.error(error));
  }

  sanitizeImage(image: string) {
    return this.sanitizer.bypassSecurityTrustHtml(image);
  }

  addLayout() {
    if (this.isSaved) {
      var layout = <Layout>{};
      layout.name = 'My New Layout';
      layout.image = blankSvg;
      this.layouts.push(layout);
      this.selectLayout(layout);
    } else {
      console.log("Unsaved Changes");
    }
    
  }

  selectLayout(layout: Layout) {
    this.layoutSelected.emit(layout);
  }
}