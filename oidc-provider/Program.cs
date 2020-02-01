using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace RaChallenge.Identity
{
    /// <summary>Represents the program itself, containing the application's entry point.</summary>
    public class Program
    {
        /// <summary>The application's entry point.</summary>
        /// <param name="args">Command-line arguments passed into the application.</param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }


        /// <summary>Utility method for creating and applying some initial configuration to a web host builder object.</summary>
        /// <param name="args">Command-line arguments which were passed to the application.</param>
        /// <returns>Returns a host builder instance configured for generating a web host container.</returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
