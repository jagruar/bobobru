using System;
using System.Collections.Generic;
using System.Text;
using Models.Entities;

namespace Models.ViewModels
{
    public class SaveLayoutRequestModel
    {
        public Layout Layout { get; set; }
        public List<Table> Tables { get; set; }
        public List<Link> Links { get; set; }
    }
}
