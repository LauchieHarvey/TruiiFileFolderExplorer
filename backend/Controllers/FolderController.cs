using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

[Route("api/[controller]")]
[ApiController]
public class FolderController : ControllerBase
{
    private readonly NpgsqlConnection _db;

    public FolderController(DatabaseManager db)
    {
        _db = db.GetNpgsqlConnection();
    }

    /// <summary>
    /// Used to get both folders and files in a parent folder.
    /// Does not include file data.
    /// </summary>
    /// <returns>All folders and files with a given parentId.</returns>
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        // Retrieve the value of the parentId parameter from the query string
        if (!HttpContext.Request.Query.TryGetValue("parentId", out var parentIdQueryParam))
        {
            // Handle the case where parentId parameter is missing
            return BadRequest("parentId parameter is missing.");
        }
        // Check that the parentId parameter is an integer.
        if (!Int32.TryParse(parentIdQueryParam, out var parentId))
        {
            return BadRequest("parentId parameter must be a number.");
        }

        var data = new List<Object>();
        var query = @"
            SELECT id, name, parentId, 'folder' as type FROM folders WHERE parentId = @parentId
            UNION
            SELECT id, name, parentId, 'file' as type FROM files WHERE parentId = @parentId;
        ";
        await using (var cmd = new NpgsqlCommand(query, _db))
        {
            cmd.Parameters.AddWithValue("@parentId", parentId);

            await using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                var rowData = new {
                    id = reader["id"],
                    name = reader["name"],
                    parentId = reader["parentId"],
                    type = reader["type"],
                };
                data.Add(rowData);
            }
        }
        return Ok(data);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] JsonObject requestBody)
    {
        if (requestBody == null)
        {
            // Handle null request body, e.g., return BadRequest
            return BadRequest("Request body is null.");
        }

        if (
            !requestBody.TryGetPropertyValue("name", out var nameToken) ||
            !requestBody.TryGetPropertyValue("parentId", out var parentIdToken)
        )
        {
            return BadRequest("Name or parentId is missing in the request body.");
        }

        String name;
        int parentId;
        try
        {
            name = nameToken!.GetValue<string>();
            parentId = parentIdToken!.GetValue<int>();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in Folder POST handler: {ex.Message}");
            return BadRequest("folder name must be a string. Parent Id must be a number.");
        }

        await using (var cmd = new NpgsqlCommand("INSERT INTO folders (name, parentId) VALUES ('folderA', 1)", _db))
        {
            await cmd.ExecuteNonQueryAsync();
        }

        return Ok();
    }
}