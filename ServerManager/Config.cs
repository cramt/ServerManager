namespace ServerManager {
    public class Config {
        public class Root {
            public string username { get; set; }
            public string password { get; set; }
        }
        public Root root { get; set; }
        public class Server {
            public string name { get; set; }
            public string commandToStart { get;set; }
            public bool onDeviceProcess { get; set; }
        }
        public Server[] servers { get; set; }
        public string handlerIp { get; set; }
        public int handlerPort { get; set; }
        public int httpPort { get; set; }
    }
}
