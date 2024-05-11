using Npgsql;

public class DatabaseManager
{
    private NpgsqlConnection _connection;
    public DatabaseManager()
    {
      var connectionString = "Host=db;Username=truii;Password=truii;Database=tfedb";
      _connection = new NpgsqlConnection(connectionString);
      Configure();
    }

    public NpgsqlConnection GetNpgsqlConnection()
    {
      return _connection;
    }

    /// <summary>
    /// Configure the Database. Create DB tables.
    /// </summary>
    /// <returns>True on success, false on failure.</returns>
    private Boolean Configure()
    {
      // Connect to the DB.
      try
      {
        _connection.Open();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error connecting to the Database, make sure it's running. {ex.Message}");
        return false;
      }

      try
      {
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

        // Run each command one by one.
        foreach (var command in commands)
        {
          using (var cmd = new NpgsqlCommand(command, _connection))
          {
            cmd.ExecuteNonQuery();
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