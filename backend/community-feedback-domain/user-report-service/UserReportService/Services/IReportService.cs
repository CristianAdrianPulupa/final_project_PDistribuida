using System.ServiceModel;
using UserReportService.Models;

namespace UserReportService.Services
{
    [ServiceContract]
    public interface IReportService
    {
        [OperationContract]
        string SubmitReport(string username, string reason);
    }
}