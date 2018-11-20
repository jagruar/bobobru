using System;
using System.Collections.Generic;
using System.Linq;
using Models.Entities;
using Models.ViewModels;

namespace Services
{
    public class LayoutService : ILayoutService
    {
        private readonly Context context;

        public LayoutService(Context context)
        {
            this.context = context;
        }

        public Table GetTable(int tableId)
        {
            return context.Tables
                .SingleOrDefault(t => t.TableId == tableId);
        }

        public IEnumerable<Table> GetTables(int layoutId)
        {
            return context.Tables
                .Where(t => t.LayoutId == layoutId);
        }

        public IEnumerable<LinkViewModel> GetLinks(int layoutId)
        {
            return context.TableLinks
                .Where(tl => tl.TableOne.LayoutId == layoutId)
                .Select(tl => new LinkViewModel(tl));
        }

        public IEnumerable<Layout> GetLayouts(int restaurantId)
        {
            return context.Layouts
                .Where(l => l.RestaurantId == restaurantId);
        }

        public string SaveLayout(Layout layout, List<Table> tables, List<Link> links)
        {
            if (layout.LayoutId > 0)
            {
                UpdateLayout(layout);
                UpdateTables(tables.Where(t => t.TableId > 0).ToList());
                UpdateLinks(links.Where(l => l.LinkId > 0).ToList());
            }
            else
            {
                layout = CreateLayout(layout);
            }

            var tablesToCreate = tables.Where(t => t.LayoutId == 0).ToList();             
            var idPairs = CreateTables(tablesToCreate, layout.LayoutId);

            // change old link ids t new ones
            // create new links

            throw new NotImplementedException();
        }

        /// <summary>
        /// Creates the new table and updates the links with their new ids.
        /// </summary>
        private Dictionary<int,int> CreateTables(List<Table> tables, int layoutId)
        {
            var idPairs = new Dictionary<int, int>();
            foreach(var table in tables)
            {
                var dummyId = table.TableId;
                table.TableId = 0;
                var newTable = CreateTable(table);
                idPairs[dummyId] = newTable.TableId;
                //var nonMatchingLinks = links.Where(l => l.TableOneId != dummyId && l.TableTwoId != dummyId).ToList();
                //var matchingLinksOne = links.Where(l => l.TableOneId == dummyId).ToList();
                //matchingLinksOne.ForEach(l => l.TableOneId = newTable.TableId);
                //var matchingLinksTwo = links.Where(l => l.TableTwoId == dummyId).ToList();
                //matchingLinksTwo.ForEach(l => l.TableTwoId = newTable.TableId);
                //links = nonMatchingLinks.Concat(matchingLinksOne).Concat(matchingLinksTwo).ToList(); ;
            }
            return idPairs;
        }

        private Table CreateTable(Table table)
        {
            var newTable = context.Tables.Add(table);
            return newTable.Entity;
        }

        private void UpdateTables(List<Table> tables)
        {
        }

        private void UpdateLayout(Layout layout)
        {
        }

        private void UpdateLinks(List<Link> link)
        {
        }

        private Layout CreateLayout(Layout layout)
        {
            // find rest id somehow
            return layout;
        }
    }
}
