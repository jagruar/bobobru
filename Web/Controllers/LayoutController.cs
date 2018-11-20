using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models.Entities;
using Models.ViewModels;
using Services;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LayoutController : Controller
    {
        private readonly ILayoutService layoutService;

        public LayoutController(ILayoutService layoutService)
        {
            this.layoutService = layoutService;
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Table> GetTables([FromRoute] int layoutId)
        {
            return layoutService.GetTables(layoutId);
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Layout> GetLayouts([FromRoute] int restaurantId)
        {
            return layoutService.GetLayouts(restaurantId);
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<LinkViewModel> GetLinks([FromRoute] int layoutId)
        {
            return layoutService.GetLinks(layoutId);
        }

        [HttpPost("[action]")]
        public string SaveLayout([FromBody] SaveLayoutRequestModel request)
        {
            this.layoutService.SaveLayout(request.Layout, request.Tables, request.Links);
            return "success";
        }
    }
}
