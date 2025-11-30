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
        public bool RemoteApproved { get; set; } = false;
        public string AssignedCourtroom { get; set; } = string.Empty;
        public int? QueuePlacement { get; set; }
        
        // Navigation property for one-to-one relationship with RemoteRequest
        public RemoteRequest? RemoteRequest { get; set; }
    }
}
