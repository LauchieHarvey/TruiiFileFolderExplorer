using Microsoft.AspNetCore.Mvc;
using Npgsql;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly NpgsqlConnection _db;

    public TestController(DatabaseManager db)
    {
        _db = db.GetNpgsqlConnection();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var data = new List<Object>();
        await using (var cmd = new NpgsqlCommand("SELECT * FROM folders;", _db))
        {
            await using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                var rowData = new {
                    id = reader["id"],
                    name = reader["name"]
                };
                data.Add(rowData);
            }
        }
        return Ok(data);
    }
}