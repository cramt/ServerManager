using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerManager.Controllers {
    [Route("api/ServerController")]
    public class ServerController : Controller {
        public class GetServersArguments : LoginController.LoginArguments {

        }
        [HttpPost("GetServers")]
        public IEnumerable<string> GetServers([FromBody] GetServersArguments getServersArguments) {
            if (LoginController.Authorize(getServersArguments)) {
                return Program.config.servers.Select(x => x.name);
            }
            else {
                return null;
            }
        }
    }
}
