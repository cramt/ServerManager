using System.Diagnostics;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace ServerManager {
    public static class Utilities {
        public static Task<string> SendTcpRequest(string ip, int port, string data) {
            return Task<string>.Factory.StartNew(() => {
                TcpClient client = new TcpClient(ip, port);
                NetworkStream nwStream = client.GetStream();
                byte[] bytesToSend = Encoding.ASCII.GetBytes(data);
                nwStream.Write(bytesToSend, 0, bytesToSend.Length);
                byte[] bytesToRead = new byte[client.ReceiveBufferSize];
                int bytesRead = nwStream.Read(bytesToRead, 0, client.ReceiveBufferSize);
                string str = Encoding.ASCII.GetString(bytesToRead, 0, bytesRead);
                client.Close();
                return str;
            });            
        }
        public static Task<string> BashAsync(this string cmd) {
            return Task<string>.Factory.StartNew(() => {
                var escapedArgs = cmd.Replace("\"", "\\\"");
                var process = new Process() {
                    StartInfo = new ProcessStartInfo {
                        FileName = "/bin/bash",
                        Arguments = $"-c \"{escapedArgs}\"",
                        RedirectStandardOutput = true,
                        UseShellExecute = false,
                        CreateNoWindow = true,
                    }
                };
                process.Start();
                string result = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                return result;
            });
        }
    }
}
