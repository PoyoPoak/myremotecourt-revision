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
        public string? Defendant { get; set; }
        public string? Plaintiff { get; set; }
        public string? HearingType { get; set; }
        public string? HearingDate { get; set; }
        public string? Location { get; set; }
    }
}
