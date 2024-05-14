var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddSingleton<DatabaseManager>();

var app = builder.Build();

// Setup & configuration.
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.MapDefaultControllerRoute();

// Setup and configure the DB before running the http server.
var db = new DatabaseManager();
await db.Configure();

// Run the server.
app.Run();
