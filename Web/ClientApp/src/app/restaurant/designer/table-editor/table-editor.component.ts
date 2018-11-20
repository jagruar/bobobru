import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../../../../entities/table';
import { SaveStateService } from '../../../services/save-state.service';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.css']
})
export class TableEditorComponent implements OnInit {
  @Input() table: Table

  constructor(private saveState: SaveStateService) { }

  ngOnInit() {}
}
