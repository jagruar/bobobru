import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '../../../../entities/link';
import { SaveStateService } from '../../../services/save-state.service';

@Component({
  selector: 'app-table-link-editor',
  templateUrl: './table-link-editor.component.html',
  styleUrls: ['./table-link-editor.component.css']
})
export class TableLinkEditorComponent implements OnInit {
  @Input() links: Link[];
  @Output() linkDeleted = new EventEmitter();

  constructor(private saveState: SaveStateService) { }

  ngOnInit() {
  }

  deleteLink(link: Link) {
    this.linkDeleted.emit(link)
  }

  increment(link: Link) {
    link.seatsLost++;
    this.saveState.break();
  }

  decrement(link: Link) {
    if (link.seatsLost > 0) {      
      link.seatsLost--;
      this.saveState.break();
    }
  }

}
