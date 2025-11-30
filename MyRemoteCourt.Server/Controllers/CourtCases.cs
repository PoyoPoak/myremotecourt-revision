using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyRemoteCourt.Server.Models;
using MyRemoteCourt.Server.util;

namespace MyRemoteCourt.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourtCases : Controller
    {
        // Initialize DBManager for database operations.
        private readonly DBManager _dbManager;

        public CourtCases(DBManager dbManager)
        {
            _dbManager = dbManager;
        }

        // GET: api/courtcases/{caseNumber}
        // Returns a court case with computed RemoteApproved status
        [HttpGet("{caseNumber}")]
        public async Task<ActionResult<CourtCase>> GetCasebyCaseNumber(string caseNumber)
        {
            // IMPORTANT: Must include RemoteRequest for RemoteApproved to compute correctly
            var courtCase = await _dbManager.CourtCase
                .Include(c => c.RemoteRequest)  // Load related RemoteRequest
                .FirstOrDefaultAsync(c => c.CaseNumber == caseNumber);

            // Check if found
            if (courtCase == null)
            {
                return NotFound(new { message = $"Information regarding case/citation number {caseNumber} not found." });
            }

            CourtCaseDTO response = new CourtCaseDTO
            {
                CaseNumber = courtCase.CaseNumber,
                FirstName = courtCase.FirstName,
                LastName = courtCase.LastName,
                CaseType = courtCase.CaseType,
                HearingType = courtCase.HearingType,
                HearingDate = courtCase.HearingDate,
                Location = courtCase.Location
            };

            return Ok(response);
        }
    }
}
