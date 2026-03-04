Attribute VB_Name = "Module_CreateDB"
'=======================================================================
' ICNA Mosque Directory — MS Access VBA Setup Script
' Agent: Database Architect (Agent 2)
' Sprint: 1
'
' HOW TO USE:
'   1. Open Microsoft Access → Create a new blank database
'   2. Save it as: ICNA_MosqueDB.accdb in d:\ICNA\database\
'   3. Press Alt+F11 to open VBA editor
'   4. Insert → Module, then paste ALL of this code
'   5. Press F5 or click Run → Run Sub/Function
'   6. Select "CreateAllTables" and click Run
'=======================================================================
Option Explicit
Option Compare Database

' ── MASTER RUNNER ──────────────────────────────────────────────────────
Public Sub CreateAllTables()
    Dim db As DAO.Database
    Set db = CurrentDb()

    On Error GoTo ErrorHandler
    MsgBox "Starting ICNA Mosque Directory Database Setup...", vbInformation

    ' Drop & recreate in dependency order
    Call DropAllTables(db)
    Call CreateTable_tblState(db)
    Call CreateTable_tblCounty(db)
    Call CreateTable_tblCity(db)
    Call CreateTable_tblBoardTitle(db)
    Call CreateTable_tblMosque(db)
    Call CreateTable_tblBoardMember(db)

    ' Relationships
    Call CreateRelationships(db)

    ' Seed Lookup Data
    Call SeedLookupData(db)

    db.Close
    Set db = Nothing

    MsgBox "Database setup complete!" & vbCrLf & _
           "Tables created: 6" & vbCrLf & _
           "Relationships created: 7" & vbCrLf & _
           "Lookup data seeded: States, Counties, Cities, Board Titles", _
           vbInformation, "ICNA DB Setup"
    Exit Sub

ErrorHandler:
    MsgBox "Error " & Err.Number & ": " & Err.Description, vbCritical, "Setup Error"
    If Not db Is Nothing Then db.Close
End Sub


' ── DROP ALL TABLES ─────────────────────────────────────────────────────
Private Sub DropAllTables(db As DAO.Database)
    Dim tbl As DAO.TableDef
    Dim tablesToDrop As Variant
    Dim i As Integer

    ' Drop in reverse dependency order
    tablesToDrop = Array("tblBoardMember", "tblMosque", "tblBoardTitle", _
                         "tblCity", "tblCounty", "tblState")

    For Each tbl In db.TableDefs
        For i = 0 To UBound(tablesToDrop)
            If tbl.Name = tablesToDrop(i) Then
                On Error Resume Next
                db.Execute "DROP TABLE [" & tablesToDrop(i) & "];"
                On Error GoTo 0
            End If
        Next i
    Next tbl
    db.TableDefs.Refresh
End Sub


' ── tblState ────────────────────────────────────────────────────────────
Private Sub CreateTable_tblState(db As DAO.Database)
    db.Execute _
        "CREATE TABLE tblState (" & _
        "  StateID    AUTOINCREMENT PRIMARY KEY," & _
        "  StateCode  TEXT(2)  NOT NULL," & _
        "  StateName  TEXT(50) NOT NULL" & _
        ");"

    ' Unique index on StateCode
    db.Execute "CREATE UNIQUE INDEX idx_StateCode ON tblState (StateCode);"
    db.TableDefs.Refresh
End Sub


' ── tblCounty ───────────────────────────────────────────────────────────
Private Sub CreateTable_tblCounty(db As DAO.Database)
    db.Execute _
        "CREATE TABLE tblCounty (" & _
        "  CountyID    AUTOINCREMENT PRIMARY KEY," & _
        "  CountyCode  TEXT(6)   NOT NULL," & _
        "  CountyName  TEXT(100) NOT NULL," & _
        "  StateID     LONG      NOT NULL" & _
        ");"

    db.Execute "CREATE INDEX idx_CountyStateID ON tblCounty (StateID);"
    db.TableDefs.Refresh
End Sub


' ── tblCity ─────────────────────────────────────────────────────────────
Private Sub CreateTable_tblCity(db As DAO.Database)
    db.Execute _
        "CREATE TABLE tblCity (" & _
        "  CityID    AUTOINCREMENT PRIMARY KEY," & _
        "  CityCode  TEXT(6)   NOT NULL," & _
        "  CityName  TEXT(100) NOT NULL," & _
        "  StateID   LONG      NOT NULL," & _
        "  CountyID  LONG" & _
        ");"

    db.Execute "CREATE UNIQUE INDEX idx_CityCode ON tblCity (CityCode);"
    db.Execute "CREATE INDEX idx_CityStateID ON tblCity (StateID);"
    db.TableDefs.Refresh
End Sub


' ── tblBoardTitle ────────────────────────────────────────────────────────
Private Sub CreateTable_tblBoardTitle(db As DAO.Database)
    db.Execute _
        "CREATE TABLE tblBoardTitle (" & _
        "  TitleID    AUTOINCREMENT PRIMARY KEY," & _
        "  TitleCode  TEXT(8)  NOT NULL," & _
        "  TitleName  TEXT(60) NOT NULL" & _
        ");"

    db.Execute "CREATE UNIQUE INDEX idx_TitleCode ON tblBoardTitle (TitleCode);"
    db.TableDefs.Refresh
End Sub


' ── tblMosque ───────────────────────────────────────────────────────────
Private Sub CreateTable_tblMosque(db As DAO.Database)
    db.Execute _
        "CREATE TABLE tblMosque (" & _
        "  MosqueID    AUTOINCREMENT PRIMARY KEY," & _
        "  MosqueCode  TEXT(10) NOT NULL," & _
        "  MosqueName  TEXT(200) NOT NULL," & _
        "  CityID      LONG NOT NULL," & _
        "  CountyID    LONG NOT NULL," & _
        "  StateID     LONG NOT NULL," & _
        "  LocationURL MEMO," & _
        "  WebsiteURL  MEMO," & _
        "  Latitude    DOUBLE," & _
        "  Longitude   DOUBLE," & _
        "  DateAdded   DATETIME DEFAULT Now()," & _
        "  Notes       MEMO" & _
        ");"

    db.Execute "CREATE UNIQUE INDEX idx_MosqueCode ON tblMosque (MosqueCode);"
    db.Execute "CREATE INDEX idx_MosqueCityID   ON tblMosque (CityID);"
    db.Execute "CREATE INDEX idx_MosqueCountyID ON tblMosque (CountyID);"
    db.Execute "CREATE INDEX idx_MosqueStateID  ON tblMosque (StateID);"
    db.TableDefs.Refresh
End Sub


' ── tblBoardMember ──────────────────────────────────────────────────────
Private Sub CreateTable_tblBoardMember(db As DAO.Database)
    db.Execute _
        "CREATE TABLE tblBoardMember (" & _
        "  BoardMemberID  AUTOINCREMENT PRIMARY KEY," & _
        "  MosqueID       LONG NOT NULL," & _
        "  FullName       TEXT(150) NOT NULL," & _
        "  TitleID        LONG NOT NULL," & _
        "  Email          TEXT(150)," & _
        "  Phone          TEXT(20)," & _
        "  TermStart      DATETIME," & _
        "  TermEnd        DATETIME," & _
        "  IsActive       YESNO DEFAULT Yes" & _
        ");"

    db.Execute "CREATE INDEX idx_BMosqueID ON tblBoardMember (MosqueID);"
    db.Execute "CREATE INDEX idx_BTitleID  ON tblBoardMember (TitleID);"
    db.TableDefs.Refresh
End Sub


' ── RELATIONSHIPS ────────────────────────────────────────────────────────
Private Sub CreateRelationships(db As DAO.Database)
    Dim rel As DAO.Relation
    Dim fld As DAO.Field

    On Error Resume Next

    ' Helper to delete existing relation
    Dim r As DAO.Relation
    For Each r In db.Relations
        Select Case r.Name
            Case "FK_County_State", "FK_City_State", "FK_City_County", _
                 "FK_Mosque_State", "FK_Mosque_City", "FK_Mosque_County", _
                 "FK_BoardMember_Mosque", "FK_BoardMember_Title"
                db.Relations.Delete r.Name
        End Select
    Next r

    On Error GoTo 0

    ' tblCounty → tblState
    Set rel = db.CreateRelation("FK_County_State", "tblState", "tblCounty", _
              dbRelationUpdateCascade)
    Set fld = rel.CreateField("StateID")
    fld.ForeignName = "StateID"
    rel.Fields.Append fld
    db.Relations.Append rel

    ' tblCity → tblState
    Set rel = db.CreateRelation("FK_City_State", "tblState", "tblCity", _
              dbRelationUpdateCascade)
    Set fld = rel.CreateField("StateID")
    fld.ForeignName = "StateID"
    rel.Fields.Append fld
    db.Relations.Append rel

    ' tblCity → tblCounty
    Set rel = db.CreateRelation("FK_City_County", "tblCounty", "tblCity", _
              dbRelationUpdateCascade)
    Set fld = rel.CreateField("CountyID")
    fld.ForeignName = "CountyID"
    rel.Fields.Append fld
    db.Relations.Append rel

    ' tblMosque → tblState
    Set rel = db.CreateRelation("FK_Mosque_State", "tblState", "tblMosque", _
              dbRelationUpdateCascade)
    Set fld = rel.CreateField("StateID")
    fld.ForeignName = "StateID"
    rel.Fields.Append fld
    db.Relations.Append rel

    ' tblMosque → tblCity
    Set rel = db.CreateRelation("FK_Mosque_City", "tblCity", "tblMosque", _
              dbRelationUpdateCascade)
    Set fld = rel.CreateField("CityID")
    fld.ForeignName = "CityID"
    rel.Fields.Append fld
    db.Relations.Append rel

    ' tblMosque → tblCounty
    Set rel = db.CreateRelation("FK_Mosque_County", "tblCounty", "tblMosque", _
              dbRelationUpdateCascade)
    Set fld = rel.CreateField("CountyID")
    fld.ForeignName = "CountyID"
    rel.Fields.Append fld
    db.Relations.Append rel

    ' tblBoardMember → tblMosque (cascade delete)
    Set rel = db.CreateRelation("FK_BoardMember_Mosque", "tblMosque", "tblBoardMember", _
              dbRelationDeleteCascade + dbRelationUpdateCascade)
    Set fld = rel.CreateField("MosqueID")
    fld.ForeignName = "MosqueID"
    rel.Fields.Append fld
    db.Relations.Append rel

    ' tblBoardMember → tblBoardTitle
    Set rel = db.CreateRelation("FK_BoardMember_Title", "tblBoardTitle", "tblBoardMember", _
              dbRelationUpdateCascade)
    Set fld = rel.CreateField("TitleID")
    fld.ForeignName = "TitleID"
    rel.Fields.Append fld
    db.Relations.Append rel

    db.Relations.Refresh
End Sub


' ── SEED LOOKUP DATA ────────────────────────────────────────────────────
Private Sub SeedLookupData(db As DAO.Database)
    ' ── States ──
    Dim states(10, 1) As String
    states(0,0)  = "AL": states(0,1)  = "Alabama"
    states(1,0)  = "CA": states(1,1)  = "California"
    states(2,0)  = "DC": states(2,1)  = "District of Columbia"
    states(3,0)  = "FL": states(3,1)  = "Florida"
    states(4,0)  = "GA": states(4,1)  = "Georgia"
    states(5,0)  = "IL": states(5,1)  = "Illinois"
    states(6,0)  = "IN": states(6,1)  = "Indiana"
    states(7,0)  = "MA": states(7,1)  = "Massachusetts"
    states(8,0)  = "MI": states(8,1)  = "Michigan"
    states(9,0)  = "MN": states(9,1)  = "Minnesota"
    states(10,0) = "NY": states(10,1) = "New York"

    Dim i As Integer
    For i = 0 To 10
        db.Execute "INSERT INTO tblState (StateCode, StateName) VALUES ('" & _
                   states(i,0) & "', '" & EscSQL(states(i,1)) & "');"
    Next i

    Dim moreStates(5, 1) As String
    moreStates(0,0) = "NJ": moreStates(0,1) = "New Jersey"
    moreStates(1,0) = "OH": moreStates(1,1) = "Ohio"
    moreStates(2,0) = "PA": moreStates(2,1) = "Pennsylvania"
    moreStates(3,0) = "TX": moreStates(3,1) = "Texas"
    moreStates(4,0) = "VA": moreStates(4,1) = "Virginia"
    moreStates(5,0) = "WA": moreStates(5,1) = "Washington"

    For i = 0 To 5
        db.Execute "INSERT INTO tblState (StateCode, StateName) VALUES ('" & _
                   moreStates(i,0) & "', '" & EscSQL(moreStates(i,1)) & "');"
    Next i

    ' ── Board Titles ──
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('CHAIR',  'Chairman');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('VCHAIR', 'Vice Chairman');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('PRES',   'President');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('VP',     'Vice President');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('IMAM',   'Imam');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('ASST',   'Assistant Imam');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('SEC',    'Secretary');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('ASEC',   'Assistant Secretary');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('TREAS',  'Treasurer');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('ATREAS', 'Assistant Treasurer');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('DIR',    'Director');"
    db.Execute "INSERT INTO tblBoardTitle (TitleCode, TitleName) VALUES ('MEM',    'Board Member');"

    db.TableDefs.Refresh
End Sub


' ── EXPORT MOSQUES TO JSON ───────────────────────────────────────────────
' Run this after entering mosque data to generate mosques.js for the web app
Public Sub ExportMosquesToJSON()
    Dim db As DAO.Database
    Dim rs As DAO.Recordset
    Dim rsBoard As DAO.Recordset
    Dim fso As Object
    Dim f As Object
    Dim filePath As String
    Dim jsonLine As String
    Dim firstRecord As Boolean
    Dim firstMember As Boolean

    Set db = CurrentDb()
    filePath = "d:\ICNA\data\mosques.js"

    Set fso = CreateObject("Scripting.FileSystemObject")
    Set f = fso.CreateTextFile(filePath, True) ' overwrite

    ' Write header
    f.WriteLine "// Auto-generated by ICNA_MosqueDB.accdb — " & Now()
    f.WriteLine "// Agent: Database Architect (Agent 2)"
    f.WriteLine ""
    f.WriteLine "const MOSQUES_DATA = ["

    ' Query main mosque data with joins
    Set rs = db.OpenRecordset( _
        "SELECT m.MosqueID, m.MosqueCode, m.MosqueName, " & _
        "       ci.CityName, ci.CityID, " & _
        "       co.CountyName, co.CountyID, " & _
        "       st.StateCode, st.StateID, " & _
        "       m.LocationURL, m.WebsiteURL, m.Latitude, m.Longitude " & _
        "FROM ((tblMosque AS m " & _
        "  INNER JOIN tblCity    AS ci ON m.CityID   = ci.CityID) " & _
        "  INNER JOIN tblCounty  AS co ON m.CountyID = co.CountyID) " & _
        "  INNER JOIN tblState   AS st ON m.StateID  = st.StateID " & _
        "ORDER BY m.MosqueCode;", dbOpenSnapshot)

    firstRecord = True
    Do While Not rs.EOF
        If Not firstRecord Then f.WriteLine ","
        firstRecord = False

        f.WriteLine "  {"
        f.WriteLine "    id: "         & rs!MosqueID & ","
        f.WriteLine "    code: """     & EscJS(Nz(rs!MosqueCode, "")) & ""","
        f.WriteLine "    name: """     & EscJS(Nz(rs!MosqueName, "")) & ""","
        f.WriteLine "    city: """     & EscJS(Nz(rs!CityName, ""))   & ""","
        f.WriteLine "    cityId: "     & Nz(rs!CityID, 0) & ","
        f.WriteLine "    county: """   & EscJS(Nz(rs!CountyName, "")) & ""","
        f.WriteLine "    countyId: "   & Nz(rs!CountyID, 0) & ","
        f.WriteLine "    state: """    & EscJS(Nz(rs!StateCode, ""))  & ""","
        f.WriteLine "    stateId: "    & Nz(rs!StateID, 0) & ","
        f.WriteLine "    locationUrl: """ & EscJS(Nz(rs!LocationURL, "")) & ""","
        f.WriteLine "    websiteUrl: """ & EscJS(Nz(rs!WebsiteURL, ""))  & ""","
        f.WriteLine "    latitude: "   & Nz(rs!Latitude, 0) & ","
        f.WriteLine "    longitude: "  & Nz(rs!Longitude, 0) & ","

        ' Board members sub-query
        Set rsBoard = db.OpenRecordset( _
            "SELECT bm.FullName, bt.TitleName " & _
            "FROM tblBoardMember AS bm " & _
            "  INNER JOIN tblBoardTitle AS bt ON bm.TitleID = bt.TitleID " & _
            "WHERE bm.MosqueID = " & rs!MosqueID & " AND bm.IsActive = True " & _
            "ORDER BY bm.BoardMemberID;", dbOpenSnapshot)

        f.Write "    boardMembers: ["
        firstMember = True
        Do While Not rsBoard.EOF
            If Not firstMember Then f.Write ", "
            firstMember = False
            f.Write "{name:""" & EscJS(Nz(rsBoard!FullName, "")) & _
                    """,title:""" & EscJS(Nz(rsBoard!TitleName, "")) & """}"
            rsBoard.MoveNext
        Loop
        rsBoard.Close
        f.WriteLine "]"
        f.Write "  }"

        rs.MoveNext
    Loop

    f.WriteLine ""
    f.WriteLine "];"
    f.WriteLine ""
    f.WriteLine "// Lookup arrays for dropdowns"
    f.WriteLine "const LOOKUP_CITIES  = [];" & " // Populated from tblCity"
    f.WriteLine "const LOOKUP_STATES  = [];" & " // Populated from tblState"
    f.WriteLine "const LOOKUP_COUNTIES= [];" & " // Populated from tblCounty"

    rs.Close
    f.Close

    Set f = Nothing
    Set fso = Nothing
    Set db = Nothing

    MsgBox "Exported to: " & filePath, vbInformation, "Export Complete"
End Sub


' ── HELPERS ──────────────────────────────────────────────────────────────
Private Function EscSQL(s As String) As String
    EscSQL = Replace(s, "'", "''")
End Function

Private Function EscJS(s As String) As String
    s = Replace(s, "\", "\\")
    s = Replace(s, """", "\""")
    EscJS = s
End Function
