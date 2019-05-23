using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerManager.Controllers {
    [Route("api/LoginController")]
    public class LoginController : Controller {
        public class LoginArguments {
            public string username { get; set; }
            public string password { get; set; }
        }
        [HttpPost("Login")]
        public bool Login([FromBody] LoginArguments loginArguments) {
            return (Program.config.root.username == loginArguments.username && Program.config.root.password == loginArguments.password);
        }

    }
}
