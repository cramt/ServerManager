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

        public class RunServerActionArguments : LoginController.AuthLoginArguments {
            public string serverName { get; set; }
        }
        [HttpPost("RunServerAction")]
        public async Task<string> RunServerAction([FromBody] RunServerActionArguments runServerActionArguments) {
            AuthToken token = AuthToken.AuthTokenHandler.Tokens.FirstOrDefault(x => x.Token == runServerActionArguments.token);
            if (token == null) {
                return null;
            }
            if (!token.ServersAuthorized.Contains(runServerActionArguments.serverName)) {
                return null;
            }
            Config.Server server = Program.config.servers.First(x => x.name == runServerActionArguments.serverName);
            if (server.onDeviceProcess) {
                return await server.commandToStart.BashAsync();
            }
            else {
                return await Utilities.SendTcpRequest(Program.config.ip, Program.config.port, server.commandToStart);
            }
        }
    }
}
