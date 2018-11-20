import { Component, OnInit, Input } from '@angular/core';
import { Layout } from '../../../../entities/layout';
import { SaveStateService } from '../../../services/save-state.service';

@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.css']
})
export class LayoutEditorComponent implements OnInit {
  @Input() layout: Layout;

  constructor(private saveState: SaveStateService) { }

  ngOnInit() {
  }

}
