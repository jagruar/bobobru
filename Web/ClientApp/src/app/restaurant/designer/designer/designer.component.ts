import { Component, OnInit } from '@angular/core';
import { Table } from '../../../../entities/table';
import { Layout } from '../../../../entities/layout';
import { LayoutService } from '../../../services/layout.service';
import { Link } from '../../../../entities/link';
import { SaveStateService } from '../../../services/save-state.service';
import { ClickMode } from '../../../../entities/clickMode';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
})
export class DesignerComponent implements OnInit {
  public tables: Table[];
  public table: Table;
  public links: Link[];
  public layout: Layout;
  public isLayout = true;
  public isTable = false;
  public isLink = false;
  public clickMode = ClickMode.tableSelect;

  constructor(private layoutService: LayoutService, private saveState: SaveStateService) { }

  ngOnInit() {}

  addLink(tables: Table[]) {
    if (!this.linkExists(tables[0], tables[1])) {
      var link = this.makeLink(tables[0], tables[1]);
      this.links.push(link);
      this.saveState.break();
    }
    this.clearTableSelection();
  }

  selectTable(table: Table) {
    this.table = table;
    console.log(table);
    if (this.clickMode == ClickMode.tableSelect) {
      this.isTable = true;
      this.isLayout = false;
      this.clickMode - ClickMode.dragAndDrop;
    }
  }

  clearTableSelection() {
    this.tables.forEach(function (element) {
      element.selected = false;
    })
  }

  selectLayout(layout: Layout) {
    var shouldProceed = false;
    if (!this.saveState.isSaved) {
      shouldProceed = confirm("You have unsaved changes on this layout, proceed anyway?");
    }
    if (this.saveState.isSaved || shouldProceed) {
      this.layout = layout;
      // If it's not a new layout, fetch the tables and links
      if (layout.layoutId) {
        this.layoutService.getTables(layout.layoutId).subscribe(result => {
          this.tables = result;
        })
        this.layoutService.getLinks(layout.layoutId).subscribe(result => {
          this.links = result;
        })
      // If it is a new layout, clear the tables and links
      } else {
        this.tables = [];
        this.links = [];
      }
      this.saveState.reset();
    }
  }

  save() {
    this.layoutService.saveLayout(this.layout, this.tables, this.links);
    this.saveState.reset();
  }

  deleteLink(link: Link) {
    this.links.splice(this.links.indexOf(link), 1);
    this.saveState.break();
  }

  setClickMode(clickMode: ClickMode) {
    this.clickMode = clickMode;
    this.clearTableSelection();
  }

  linkExists(t1: Table, t2: Table): boolean {
    var matchingLinks = this.links.filter(function (link) {
      return ((link.tableOneId == t1.tableId && link.tableTwoId == t2.tableId) ||
        (link.tableOneId == t2.tableId && link.tableTwoId == t1.tableId)
      );
    });
    return (matchingLinks.length > 0);
  }

  makeLink (t1: Table, t2: Table): Link {
    var link = <Link>{};
    link.tableOneId = t1.tableId;
    link.tableOneName = t1.name;
    link.tableTwoId = t2.tableId;
    link.tableTwoName = t2.name;
    link.seatsLost = 0;
    return link;
  }  

  layoutMenu() {
    this.resetMenu();
    this.isLayout = true;
    this.clickMode = ClickMode.tableSelect;
  }

  tableMenu() {
    this.resetMenu();
    this.isTable = true;
    this.clickMode = ClickMode.dragAndDrop;
  }

  linkMenu() {
    this.resetMenu();
    this.isLink = true;
    this.clickMode = ClickMode.linkMaker;
  }

  private resetMenu() {
    this.isLayout = false;
    this.isTable = false
    this.isLink = false;
    this.clearTableSelection();
  }
}
