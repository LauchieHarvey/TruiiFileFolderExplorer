var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddSingleton<DatabaseManager>();

var app = builder.Build();

// Setup & configuration.
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapDefaultControllerRoute();

// Sleep for 3s to let the DB start up first.
// This is a bandaid solution to the race condition.
System.Threading.Thread.Sleep(4000);

// Setup and configure the DB before running the http server.
var db = new DatabaseManager();
await db.Configure();

// Run the server.
app.Run();
