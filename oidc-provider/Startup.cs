using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using oidc_provider;

namespace RaChallenge.Identity
{
    /// <summary>Startup class which configures the container's services and HTTP Requests processing pipeline.</summary>
    public class Startup
    {
        /// <summary>Configures the services available for injection by the container.</summary>
        /// <param name="services">Service collection used internally for configuring available/injectable services.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            var builder = services.AddIdentityServer(options => {
                options.IssuerUri = Config.ProviderIssuerHost;
            })
                .AddInMemoryIdentityResources(Config.Ids)
                .AddInMemoryApiResources(Config.Apis)
                .AddInMemoryClients(Config.Clients)
                .AddTestUsers(TestUsers.Users)
                .AddDeveloperSigningCredential();

            services.AddAuthentication();
        }

        /// <summary>Configures the HTTP Requests processing pipeline for the server.</summary>
        /// <param name="app">Object used to build the application and configure the HTTP Requests processing pipeline.</param>
        /// <param name="env">Injected service which contains information about the runtime environment.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseStaticFiles();
            app.UseRouting();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                 endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
