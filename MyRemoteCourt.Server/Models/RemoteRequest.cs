using System.Text.Json.Serialization;

namespace MyRemoteCourt.Server.Models
{
    public class RemoteRequest
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        public bool? Approved { get; set; }
        public DateTime? RequestDate { get; set; }

        // Navigation property back to CourtCase (prevents circular reference in JSON)
        [JsonIgnore]
        public CourtCase? CourtCase { get; set; }
    }
}
