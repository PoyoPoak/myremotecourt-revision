using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyRemoteCourt.Server.Models
{
    public class CourtCaseDTO
    {
        public string CaseNumber { get; set; } = string.Empty;
        
        [JsonIgnore]
        public string FirstName { get; set; } = string.Empty;
        [JsonIgnore]
        public string LastName { get; set; } = string.Empty;
        
        public string FullName => $"{FirstName} {LastName}".Trim();
        public string? CaseType { get; set; }
    }
}
