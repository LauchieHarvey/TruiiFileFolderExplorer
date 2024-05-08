var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Setup & configuration.
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapDefaultControllerRoute();

// Run the server.
app.Run();
