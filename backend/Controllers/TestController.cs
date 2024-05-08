using Microsoft.AspNetCore.Mvc;

[Route("api/test")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        // Your logic to retrieve data goes here
        var data = new { message = "Hello from ASP.NET!" };

        return Ok(data);
    }
}