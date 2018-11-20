import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayoutService } from '../../../services/layout.service'
import { Layout } from '../../../../entities/layout'
import { DomSanitizer } from '@angular/platform-browser';
import { map, retry } from 'rxjs/operators';
import { SaveStateService } from '../../../services/save-state.service';


const blankSvg = '<svg viewBox="0 0 100 100"></svg>';

@Component({
  selector: 'app-designer-nav',
  templateUrl: './designer-nav.component.html',
  styleUrls: ['./designer-nav.component.css']
})
export class DesignerNavComponent implements OnInit {
  @Input() id = 1;
  @Output() layoutSelected = new EventEmitter();
  public layouts: Layout[]; 

  constructor(
    private layoutService: LayoutService,
    private sanitizer: DomSanitizer,
    private saveState: SaveStateService) { }

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
    var shouldProceed = false;
    if (!this.saveState.isSaved) {
      shouldProceed = confirm("You have unsaved changes on this layout, proceed anyway?");
    }
    if (this.saveState.isSaved || shouldProceed) {
      var layout = <Layout>{};
      layout.name = 'My New Layout';
      layout.image = blankSvg;
      this.layouts.push(layout);
      this.selectLayout(layout);
    }    
  }

  selectLayout(layout: Layout) {
    this.layoutSelected.emit(layout);
  }
}
