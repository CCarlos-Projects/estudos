using Estudos.Models.Methods;
using System.Web.Mvc;

namespace Estudos.Controllers
{
    public class MobileController : Controller
    {
        // GET: Mobile
        public ActionResult Index()
        {
            if (DetectBrowsers.IsBrowserMobile())
                return View("Mobile-Index");

            return View();
        }
    }
}