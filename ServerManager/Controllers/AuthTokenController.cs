using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ServerManager.Controllers {
    [Route("api/AuthTokenController")]
    public class AuthTokenController : Controller {
        public class GetTokensArguments : LoginController.LoginArguments {

        }
        [HttpPost("GetTokens")]
        public IEnumerable<AuthToken> GetTokens([FromBody] GetTokensArguments getTokensArguments) {
            if (LoginController.Authorize(getTokensArguments)) {
                return AuthToken.AuthTokenHandler.Tokens;
            }
            else {
                return null;
            }
        }

        public class GetTokenArguments : LoginController.LoginArguments {
            public string id { get; set; }
        }
        [HttpPost("GetToken")]
        public AuthToken GetToken([FromBody] GetTokenArguments getTokensArguments) {
            if (LoginController.Authorize(getTokensArguments)) {
                return AuthToken.AuthTokenHandler.Tokens.First(x => x.Token == getTokensArguments.id);
            }
            else {
                return null;
            }
        }

        public class UpdateTokenArguments : LoginController.LoginArguments {
            public AuthToken authToken { get; set; }
        }
        [HttpPost("UpdateToken")]
        public bool UpdateToken([FromBody] UpdateTokenArguments updateTokenArguments) {
            if (LoginController.Authorize(updateTokenArguments)) {
                AuthToken.AuthTokenHandler.Update(updateTokenArguments.authToken);
                return true;
            }
            else {
                return false;
            }
        }

        public class DeleteTokenArguments : LoginController.LoginArguments {
            public string id { get; set; }
        }
        [HttpPost("DeleteToken")]
        public bool DeleteToken([FromBody] DeleteTokenArguments deleteTokenArguments) {
            if (LoginController.Authorize(deleteTokenArguments)) {
                AuthToken.AuthTokenHandler.Delete(deleteTokenArguments.id);
                return true;
            }
            else {
                return false;
            }
        }
        public class GetMyselfArguments : LoginController.AuthLoginArguments {

        }
        [HttpPost("GetMyself")]
        public AuthToken GetMyself([FromBody] GetMyselfArguments getMyselfArguments) {
            Console.WriteLine(getMyselfArguments.token);
            Console.WriteLine(getMyselfArguments.token);
            Console.WriteLine(getMyselfArguments.token);
            Console.WriteLine(getMyselfArguments.token);
            return AuthToken.AuthTokenHandler.Tokens.FirstOrDefault(x => x.Token == getMyselfArguments.token);
        }
        public class NewTokenArguments : LoginController.LoginArguments {

        }
        [HttpPost("NewToken")]
        public AuthToken NewToken([FromBody] NewTokenArguments newTokenArguments) {
            if (LoginController.Authorize(newTokenArguments)) {
                return AuthToken.AuthTokenHandler.GenerateNew();
            }
            else {
                return null;
            }
        }
    }
}
