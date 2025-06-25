using System;
using System.Collections.Generic;
using UserReportService.Models;


using UserReportService.Models;

namespace UserReportService.Services
{
    public class ReportService : IReportService
    {
        private static List<Report> Reports = new List<Report>();

        public string SubmitReport(string username, string reason)
        {
            Reports.Add(new Report {
                Id = Reports.Count + 1,
                Username = username,
                Reason = reason,
                CreatedAt = DateTime.Now
            });

            return "Reporte recibido";
        }
    }
}