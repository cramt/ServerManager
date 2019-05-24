using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ServerManager {
    public class AuthToken {
        public static class AuthTokenHandler {
            private static string TOKEN_DIR { get; } = Path.Combine(Directory.GetCurrentDirectory(), "tokens");
            private static string TOKEN_EXT { get; } = ".tkn";
            private static string PathToToken(AuthToken token) {
                return PathToToken(token.Token);
            }
            private static string PathToToken(string token) {
                return Path.Combine(TOKEN_DIR, token + TOKEN_EXT);
            }
            public static void Init() {
                if (!Directory.Exists(TOKEN_DIR)) {
                    Directory.CreateDirectory(TOKEN_DIR);
                }
                int b = (Directory.GetFiles(TOKEN_DIR).ToList()
                    .Select(x => {
                        var temp_a = x.Split("\\");
                        return temp_a[temp_a.Length - 1];
                    })
                    .Where(x => x.Substring(x.Length - 4) == TOKEN_EXT)
                    .Select(x => x.Substring(0, x.Length - 4))
                    .Select(x => {
                        _locks.Add(x, new object());
                        return x;
                    }).Select(x => {
                        Read(x);
                        return x;
                    }).Count());
            }
            private static Dictionary<string, AuthToken> _tokens = new Dictionary<string, AuthToken>();
            private static Dictionary<string, object> _locks = new Dictionary<string, object>();
            private static void UpdateTokenTimeout() {
                double now = Program.DateTimeToUnixTimeStamp(DateTime.UtcNow);
                List<string> toDelete = _tokens.Where(x => x.Value.ExpirationDate < now).Select(x => x.Key).ToList();
                string[] copiedToDelete = new string[toDelete.Count];
                toDelete.ToList().CopyTo(copiedToDelete);
                copiedToDelete.ToList().ForEach(x => {
                    Task.Factory.StartNew(() => {
                        Delete(x);
                    });
                });

            }
            public static IReadOnlyList<AuthToken> Tokens {
                get {
                    UpdateTokenTimeout();
                    return _tokens.Select(x => x.Value).ToList();
                }
            }
            public static AuthToken GenerateNew() {
                AuthToken token = AuthToken.GenerateNew(Program.DateTimeToUnixTimeStamp(DateTime.UtcNow.AddDays(30)), Program.config.servers.Select(x => x.name));
                _locks.Add(token.Token, new object());
                _tokens.Add(token.Token, token);
                Task.Factory.StartNew(() => {
                    try {
                        Write(token);
                    }
                    catch (Exception e) {
                        Console.WriteLine(e.ToString());
                    }
                });
                return token;
            }
            private static void Write(string token) {
                if (!_locks.ContainsKey(token)) {
                    throw new ArgumentException("tokens lock doesnt exist");
                }
                string pathToToken = PathToToken(token);
                string jsonToken = JsonConvert.SerializeObject(_tokens[token]);
                lock (_locks[token]) {
                    if (File.Exists(pathToToken)) {
                        File.Delete(pathToToken);
                    }
                    StreamWriter tokenFile = File.CreateText(pathToToken);
                    tokenFile.Write(jsonToken);
                    tokenFile.Close();
                }
            }
            private static void Write(AuthToken token) {
                Write(token.Token);
            }
            private static AuthToken Read(AuthToken token) {
                return Read(token.Token);
            }
            private static AuthToken Read(string token) {
                if (!_locks.ContainsKey(token)) {
                    throw new ArgumentException("tokens lock doesnt exist");
                }
                string pathToToken = Path.Combine(Directory.GetCurrentDirectory(), "tokens", token + ".tkn");
                string readValue = null;
                lock (_locks[token]) {
                    if (!File.Exists(pathToToken)) {
                        throw new ArgumentException("token file doesnt exist");
                    }
                    readValue = File.ReadAllText(pathToToken);
                }
                if (readValue == null) {
                    throw new Exception("token file wasnt read");
                }
                AuthToken authToken = JsonConvert.DeserializeObject<AuthToken>(readValue);
                if (_tokens.ContainsKey(authToken.Token)) {
                    _tokens[authToken.Token] = authToken;
                }
                else {
                    _tokens.Add(authToken.Token, authToken);
                }
                return authToken;
            }
            public static void Delete(AuthToken token) {
                Delete(token.Token);
            }
            public static void Delete(string token) {
                if (!_locks.ContainsKey(token)) {
                    throw new ArgumentException("tokens lock doesnt exist");
                }
                string pathToToken = Path.Combine(Directory.GetCurrentDirectory(), "tokens", token + ".tkn");
                _tokens.Remove(token);
                lock (_locks[token]) {
                    if (!File.Exists(pathToToken)) {
                        throw new ArgumentException("token file doesnt exist");
                    }
                    File.Delete(pathToToken);
                }
                _locks.Remove(token);
            }
            public static void Update(AuthToken token) {
                _tokens[token.Token] = token;
                Task.Factory.StartNew(() => {
                    Write(token);
                });
            }
        }


        public double ExpirationDate { get; set; }
        public string Token { get; set; }
        public List<string> ServersAuthorized { get; set; }
        private AuthToken() {

        }
        private static AuthToken GenerateNew(double expiration, IEnumerable<string> servers = null) {
            if (servers == null) {
                servers = new List<string>();
            }
            return new AuthToken() {
                ServersAuthorized = servers.ToList(),
                ExpirationDate = expiration,
                Token = Guid.NewGuid().ToString(),
            };
        }

    }
}
