using Npgsql;

public class DatabaseManager
{
    private string _connectionString;
    public DatabaseManager()
    {
      _connectionString = "Host=db;Username=truii;Password=truii;Database=tfedb";
    }

    public async Task<NpgsqlConnection> GetNpgsqlConnection()
    {
      var connection = new NpgsqlConnection(_connectionString);
      await connection.OpenAsync();
      return connection;
    }

    /// <summary>
    /// Configure the Database. Create DB tables.
    /// </summary>
    /// <returns>True on success, false on failure.</returns>
    public async Task<Boolean> Configure()
    {
      try
      {
        // Connect to the DB.
        NpgsqlConnection connection = await GetNpgsqlConnection();

        // Define SQL commands to initialise database.
        List<string> commands = new List<string> {
          @"CREATE TABLE IF NOT EXISTS folders (
            id SERIAL PRIMARY KEY,
            name VARCHAR(32) UNIQUE NOT NULL,
            parentId INTEGER REFERENCES folders (id)
          );",
          @"CREATE TABLE IF NOT EXISTS files (
            id SERIAL PRIMARY KEY,
            name VARCHAR(32) UNIQUE NOT NULL,
            parentId INTEGER NOT NULL REFERENCES folders (id),
            file BYTEA
          );",
          "INSERT INTO folders (name, parentId) VALUES ('root', NULL);"
        };

        await using (connection)
        {
          // Run each command one by one.
          foreach (var command in commands)
          {
            using (var cmd = new NpgsqlCommand(command, connection))
            {
              cmd.ExecuteNonQuery();
            }
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error configuring database: {ex.Message}");
        return false;
      }

      Console.WriteLine("Finished Configuring Database.");
      return true;
    }
}