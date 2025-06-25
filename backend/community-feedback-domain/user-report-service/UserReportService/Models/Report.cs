using System;

namespace UserReportService.Models
{
    public class Report
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}