using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using pqc.Models;

namespace pqc.Controllers
{
    public class AddController : Controller
    {
        private readonly ILogger<AddController> _logger;

        public AddController(ILogger<AddController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
