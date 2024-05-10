var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Setup & configuration.
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapDefaultControllerRoute();

// Setup and configure the DB before running the http server.
var db = new DatabaseManager();

// Run the server.
app.Run();
