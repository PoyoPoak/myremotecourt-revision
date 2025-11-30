-- Azure SQL Database Compatible Reset Script
-- Check for existing tables and drop them in reverse order of dependency
-- to avoid Foreign Key constraint errors.
IF OBJECT_ID('dbo.RemoteRequest', 'U') IS NOT NULL
    DROP TABLE dbo.RemoteRequest;

IF OBJECT_ID('dbo.CourtCase', 'U') IS NOT NULL
    DROP TABLE dbo.CourtCase;
GO

-- Create the CourtCase table
CREATE TABLE dbo.CourtCase (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CaseNumber VARCHAR(50) NOT NULL UNIQUE, 
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    CaseType VARCHAR(50) NULL,
    AssignedCourtroom VARCHAR(50) NOT NULL,
    QueuePlacement INT NULL,
    Defendant VARCHAR(200) NULL,
    Plaintiff VARCHAR(200) NULL,
    HearingType VARCHAR(100) NULL,
    HearingDate VARCHAR(50) NULL,
    Location VARCHAR(200) NULL
);
GO

-- Create the RemoteRequest table
CREATE TABLE dbo.RemoteRequest (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CaseId INT NOT NULL UNIQUE, 
    Approved BIT NULL, 
    RequestDate DATETIME2 NULL,
    
    -- Define the Foreign Key relationship (CourtCase.Id <-> RemoteRequest.CaseId)
    CONSTRAINT FK_RemoteRequest_CourtCase 
        FOREIGN KEY (CaseId) 
        REFERENCES dbo.CourtCase(Id)
        ON DELETE CASCADE -- Optional: Deletes request if case is deleted
);
GO

-- =============================================
-- OPTIONAL: Insert Sample Data for Testing
-- =============================================

-- Enable IDENTITY_INSERT to specify explicit ID values
SET IDENTITY_INSERT dbo.CourtCase ON;

-- Insert sample cases
INSERT INTO dbo.CourtCase (Id, CaseNumber, FirstName, LastName, CaseType, AssignedCourtroom, QueuePlacement, Defendant, Plaintiff, HearingType, HearingDate, Location)
VALUES 
(1, 'CR-3498-001', 'John', 'Doe', 'Criminal', 'Room 302', NULL, 'John Doe', 'State of California', 'Preliminary Hearing', '2025-02-10', 'Orange County Justice Center'),
(2, 'CV-4722-045', 'Jane', 'Smith', 'Civil', 'Room 101', NULL, 'Jane Smith', 'ABC Corporation', 'Motion Hearing', '2025-02-12', 'Orange County Justice Center'),
(3, 'TR-3497-999', 'Robert', 'Brown', 'Traffic', 'Room 200', NULL, 'Robert Brown', 'State of California', 'Traffic Arraignment', '2025-02-15', 'Orange County Justice Center'),
(4, 'CR-0923-002', 'Maria', 'Garcia', 'Criminal', 'Room 305', NULL, 'Maria Garcia', 'State of California', 'Court Trial', '2025-02-18', 'Orange County Justice Center'),
(5, 'CV-1120-046', 'Michael', 'Johnson', 'Civil', 'Room 102', 2, 'Michael Johnson', 'XYZ Company', 'Traffic Arraignment', '2025-02-20', 'Orange County Justice Center'),
(6, 'TR-9238-001', 'Sarah', 'Williams', 'Traffic', 'Room 201', 1, 'Sarah Williams', 'State of California', 'Traffic Arraignment', '2025-02-22', 'Orange County Justice Center');

SET IDENTITY_INSERT dbo.CourtCase OFF;
GO

-- Enable IDENTITY_INSERT for RemoteRequest
SET IDENTITY_INSERT dbo.RemoteRequest ON;

-- Insert sample requests linked to the cases above 
INSERT INTO dbo.RemoteRequest (Id, CaseId, Approved, RequestDate)
VALUES 
(102, 3, 0, '2023-11-01 04:59:00'), -- Linked to Robert Brown - Denied
(103, 4, 0, '2023-11-01 10:15:00'), -- Linked to Maria Garcia - Denied
(104, 5, 1, '2023-11-02 15:45:00'), -- Linked to Michael Johnson - Approved
(105, 6, 1, '2023-11-03 15:22:00'); -- Linked to Sarah Williams - Approved

SET IDENTITY_INSERT dbo.RemoteRequest OFF;
GO

-- =============================================
-- Display All Tables and Data
-- =============================================

PRINT '========================================';
PRINT 'CourtCase Table Contents:';
PRINT '========================================';
SELECT * FROM dbo.CourtCase;

PRINT '';
PRINT '========================================';
PRINT 'RemoteRequest Table Contents:';
PRINT '========================================';
SELECT * FROM dbo.RemoteRequest;

PRINT '';
PRINT '========================================';
PRINT 'Table Counts:';
PRINT '========================================';
SELECT 'CourtCase' AS TableName, COUNT(*) AS RecordCount FROM dbo.CourtCase
UNION ALL
SELECT 'RemoteRequest' AS TableName, COUNT(*) AS RecordCount FROM dbo.RemoteRequest;

PRINT '';
PRINT '========================================';
PRINT 'Cases with Remote Requests (with Computed RemoteApproved):';
PRINT '========================================';
SELECT 
    c.Id AS CaseId,
    c.CaseNumber,
    c.FirstName + ' ' + c.LastName AS FullName,
    c.CaseType,
    c.Defendant,
    c.Plaintiff,
    c.HearingType,
    c.HearingDate,
    c.Location,
    CASE 
        WHEN r.Approved = 1 THEN 1 
        ELSE 0 
    END AS RemoteApproved, -- Computed: true only if RemoteRequest.Approved = 1
    c.AssignedCourtroom,
    c.QueuePlacement,
    r.Id AS RequestId,
    r.Approved AS RequestApproved,
    r.RequestDate
FROM dbo.CourtCase c
LEFT JOIN dbo.RemoteRequest r ON c.Id = r.CaseId
ORDER BY c.Id;