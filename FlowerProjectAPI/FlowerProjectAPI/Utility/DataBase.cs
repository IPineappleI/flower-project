using Npgsql;

namespace FlowerProjectAPI.Utility;

public static class DataBase
{
    public static NpgsqlConnection Connection { get; }

    static DataBase()
    {
        Connection = new NpgsqlConnection("Host=localhost:5432;" + "Username=postgres;" + "Password=702052;" +
                                          "Database=flower_project");
        Connection.Open();
    }
}