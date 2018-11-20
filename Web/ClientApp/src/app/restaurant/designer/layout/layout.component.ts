import { Component, Inject, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Table } from '../../../../entities/table'
import { SaveStateService } from '../../../services/save-state.service';
import { ClickMode } from '../../../../entities/clickMode';

const defaultTableName = 'My New Table';
const defaultTableWidth = 10;
const defaultTableHeight = 20;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {    
  @Input() tables: Table[];
  @Input() clickMode = ClickMode.tableSelect;
  @Output() tableSelected = new EventEmitter();
  @Output() tablesSaved = new EventEmitter();
  @Output() linkAdded = new EventEmitter();
  private link = [];
  private nextId = -1

  constructor(private saveState: SaveStateService) { }

  ngOnInit() {}

  tableClick(table: Table) {
    switch (this.clickMode) {
      case ClickMode.tableSelect:
        this.tableSelectClick(table);
        break;
      case ClickMode.dragAndDrop:
        this.dragAndDropClick(table);
        break;
      case ClickMode.linkMaker:
        this.linkMakerClick(table);
        break;
    }
  }

  tableSelectClick(table: Table) {
    this.clearTableSelection();
    table.selected = true;
    this.tableSelected.emit(table);
  }

  linkMakerClick(table: Table) {
    if (table.selected == true) {
      table.selected = false;
      this.link = [];
    } else {
      this.link.push(table);
      if (this.link.length == 2) {
        this.linkAdded.emit(this.link);
        this.clearTableSelection();
        this.link = [];
      } else {
        table.selected = true;
      }
    }
  }

  dragAndDropClick(table: Table) {
    this.clearTableSelection();
    table.selected = true;
    this.tableSelected.emit(table);
  }

  clearTableSelection() {
    this.tables.forEach(function (element) {
      element.selected = false;
    })
  }

  addTable(x: number, y: number, r: number) {
    var table = this.makeTable(x, y, r);
    this.tables.push(table);
    this.saveState.break();
  }

  makeTable(x: number, y: number, r: number): Table {
    var table = <Table>{}
    table.tableId = this.nextId;
    table.name = defaultTableName;
    table.seatCount = 0;
    table.x = x;
    table.y = y;
    table.radius = r;
    table.height = (r == 0) ? defaultTableHeight : 0;
    table.width = (r == 0) ? defaultTableWidth : 0;
    this.nextId--;
    return table;
  }

  getColour(selected: boolean) {
    if (selected) {
      return "Red"
    }
    return "Black"
  }
}


