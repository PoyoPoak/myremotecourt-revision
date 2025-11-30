using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyRemoteCourt.Server.Models
{
    public class CourtCase
    {
        public int Id { get; set; }
        public string CaseNumber { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? CaseType { get; set; }
        
        // Computed from RemoteRequest.Approved
        [NotMapped] 
        public bool RemoteApproved => RemoteRequest?.Approved == true;
        
        public string AssignedCourtroom { get; set; } = string.Empty;
        public int? QueuePlacement { get; set; }
        
        public string? Defendant { get; set; }
        public string? Plaintiff { get; set; }
        public string? HearingType { get; set; }
        public string? HearingDate { get; set; }
        public string? Location { get; set; }
        
        // Navigation property for one-to-one relationship with RemoteRequest
        public RemoteRequest? RemoteRequest { get; set; }
    }
}
