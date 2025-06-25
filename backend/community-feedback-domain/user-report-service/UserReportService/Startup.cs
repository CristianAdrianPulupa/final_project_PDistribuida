using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SoapCore;
using UserReportService.Services;
using System.Text;
using System.ServiceModel.Channels;

namespace UserReportService
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSoapCore();
            services.AddSingleton<IReportService, ReportService>();
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.UseSoapEndpoint<IReportService>(
                    "/Service.svc",
                    new SoapEncoderOptions
                    {
                        WriteEncoding = Encoding.UTF8,
                        MessageVersion = MessageVersion.Soap11
                    },
                    SoapSerializer.DataContractSerializer
                );
            });
        }
    }
}
