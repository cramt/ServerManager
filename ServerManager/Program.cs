using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ServerManager {
    public class Program {
        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp) {
            DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }
        public static double DateTimeToUnixTimeStamp(DateTime dateTime) {
            return (dateTime.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
        }
        public static Config config;
        public static void Main(string[] args) { 
            config = Config.Load();
            if(config == null) {
                Console.WriteLine("config couldnt be loaded");
                return;
            }
            AuthToken.AuthTokenHandler.Init();
            AuthToken.AuthTokenHandler.GenerateNew();
            CreateWebHostBuilder(args).Build().Run();


            Thread.Sleep(-1);
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls("http://*:" + config.httpPort);
    }
}
