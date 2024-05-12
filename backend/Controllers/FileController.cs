using Microsoft.AspNetCore.Mvc;
using Npgsql;

[Route("api/[controller]")]
[ApiController]
public class FileController : ControllerBase
{
    private readonly DatabaseManager _db;

    // Somewhat arbitrary max file size.
    // Need to test larger files to find an actual limit.
    public const Int32 maxFileSizeMegaBytes = 100;

    public FileController(DatabaseManager db)
    {
        _db = db;
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
        if (!HttpContext.Request.Query.TryGetValue("id", out var idQueryParam))
        {
            // Handle the case where parentId parameter is missing
            return BadRequest("id parameter is missing.");
        }
        // Check that the parentId parameter is an integer.
        if (!Int32.TryParse(idQueryParam, out var id))
        {
            return BadRequest("id parameter must be a number.");
        }
        // Request a DB connection.
        var connection = await _db.GetNpgsqlConnection();

        var query = @"SELECT id, name, parentId, file FROM files WHERE id = @id";
        await using (connection)
        {
            using (var cmd = new NpgsqlCommand(query, connection))
            {
                cmd.Parameters.AddWithValue("@id", id);

                await using var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var rowData = new {
                        id = reader["id"],
                        name = reader["name"],
                        parentId = reader["parentId"],
                        type = reader["type"],
                    };
                    return Ok(rowData);
                }
            }
        }
        return BadRequest("Couldn't find the file.");
    }

    [HttpPost]
    public async Task<IActionResult> Post()
    {
        var form = await Request.ReadFormAsync();

        // Check if the form data contains the required fields
        if (!form.ContainsKey("parentId") || !form.Files.Any())
        {
          return BadRequest("parentId, or file is missing in the request body.");
        }


        // Retrieve values from the form data
        int parentId;
        if (!int.TryParse(form["parentId"], out parentId))
        {
          return BadRequest("ParentId must be a number.");
        }

        // Validate file size.
        var file = form.Files[0];
        if (!IsAllowedFileSize(file))
        {
          return BadRequest($"File size must be less than {maxFileSizeMegaBytes}MB.");
        }

        if (!IsAllowedFileType(file))
        {
          return BadRequest($"File type must be csv or geojson.");
        }


        var connection = await _db.GetNpgsqlConnection();

        try
        {
          await using (connection)
          {
            using ( var cmd = new NpgsqlCommand("INSERT INTO files (name, parentId, file) VALUES (@name, @parentId, @file)", connection))
            {
              cmd.Parameters.AddWithValue("@name", file.Name);
              cmd.Parameters.AddWithValue("@parentId", parentId);
              cmd.Parameters.AddWithValue("@file", file.OpenReadStream());

              await cmd.ExecuteNonQueryAsync();
            }
          }
        }
        catch (Exception ex)
        {
          Console.WriteLine($"Failed when inserting file into files table. {ex}");
          return BadRequest("Server error when Adding file.");
        }

        return Ok();
    }

    public bool IsAllowedFileType(IFormFile file)
    {
      // Define allowed Content-Types
      string[] allowedTypes = { "text/csv", "application/geo+json" };

      // Check if the uploaded file type is in the allowed types
      return allowedTypes.Contains(file.ContentType);
    }

    public bool IsAllowedFileSize(IFormFile file)
    {
      // Compare size in bytes, not MB.
      const Int32 maxFileSizeBytes = maxFileSizeMegaBytes * 1024 * 1024;
      if (file.Length > maxFileSizeBytes)
      {
        return false;
      }
      return true;
    }
}