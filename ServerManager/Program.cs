using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ServerManager {
    public class Program {
        public static Config config;
        public static void Main(string[] args) {
            config = JsonConvert.DeserializeObject<Config>(File.ReadAllText(Path.Join(Directory.GetCurrentDirectory(), "config.json")));
            AuthToken.AuthTokenHandler.Init();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
