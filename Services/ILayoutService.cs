using System;
using System.Collections.Generic;
using System.Text;
using Models.Entities;
using Models.ViewModels;

namespace Services
{
    public interface ILayoutService
    {
        string SaveLayout(Layout layout, List<Table> tables, List<Link> links);

        Table GetTable(int tableId);

        IEnumerable<Layout> GetLayouts(int restaurantId);

        IEnumerable<Table> GetTables(int layoutId);

        IEnumerable<LinkViewModel> GetLinks(int layoutId);
    }
}
