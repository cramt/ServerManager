using Newtonsoft.Json;
using System.IO;
using System.Reflection;

namespace ServerManager {
    public class Config {
        public static Config Load() {
            string path = null;
            {
                string p = Path.Join(Directory.GetCurrentDirectory(), "config.json");
                if (File.Exists(p)) {
                    path = p;
                }
            }
            {
                string p = Path.Join(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "config.json");
                if (File.Exists(p)) {
                    path = p;
                }
            }
            if (path == null) {
                return null;
            }
            return JsonConvert.DeserializeObject<Config>(File.ReadAllText(path));
        }
        public class Root {
            public string username { get; set; }
            public string password { get; set; }
        }
        public Root root { get; set; }
        public class Server {
            public string name { get; set; }
            public string commandToStart { get; set; }
            public bool onDeviceProcess { get; set; }
        }
        public Server[] servers { get; set; }
        public string handlerIp { get; set; }
        public int handlerPort { get; set; }
        public int httpPort { get; set; }
    }
}
