using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace ServerManager.Controllers {
    [Route("api/AuthTokenController")]
    public class AuthTokenController : Controller {
        public class GetTokensArguments : LoginController.LoginArguments {
            
        }
        [HttpPost("GetTokens")]
        public IEnumerable<AuthToken> GetTokens([FromBody] GetTokensArguments getTokensArguments) {
            if (LoginController.Authorize(getTokensArguments)) {
                Console.WriteLine("a");
                return AuthToken.AuthTokenHandler.Tokens;
            }
            else {
                Console.WriteLine("b");
                return null;
            }
        }

    }
}
