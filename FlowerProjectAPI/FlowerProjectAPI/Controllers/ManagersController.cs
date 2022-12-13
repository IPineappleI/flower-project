using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ManagersController : ControllerBase
{
    private static async Task Create(Manager manager)
    {
        const string commandText = "INSERT INTO managers (login, password, is_admin) " +
                                   "VALUES (@login, @password, @is_admin)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("login", manager.Login);
        cmd.Parameters.AddWithValue("password", manager.Password);
        cmd.Parameters.AddWithValue("is_admin", manager.IsAdmin);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPost]
    public IActionResult Post(Manager manager)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Create(manager).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("manager created successfully");
    }

    private static Manager ReadManager(IDataRecord reader)
    {
        var login = reader["login"] as string;
        var password = reader["password"] as string;
        var isAdmin = reader["is_admin"] as bool? ?? false;

        return new Manager(login!, password!, isAdmin);
    }

    private static async Task<Manager?> Read(string login)
    {
        const string commandText = "SELECT * FROM managers WHERE login = @login";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("login", login);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var manager = ReadManager(reader);
            return manager;
        }

        return null;
    }

    [HttpGet]
    public IActionResult Get(string login)
    {
        var result = Read(login).Result;

        return result == null ? BadRequest("manager not found") : Ok(result);
    }

    private static async Task Update(string login, Manager manager)
    {
        const string commandText = @"UPDATE managers
                SET login = @login, password = @password, is_admin = @isAdmin
                WHERE login = @oldLogin";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldLogin", login);
        cmd.Parameters.AddWithValue("login", manager.Login);
        cmd.Parameters.AddWithValue("password", manager.Password);
        cmd.Parameters.AddWithValue("isAdmin", manager.IsAdmin);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(string login, Manager manager)
    {
        if (Get(login) is BadRequestObjectResult)
        {
            return BadRequest("manager not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(login, manager).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("manager updated successfully");
    }

    private static async Task DeleteManager(string login)
    {
        const string commandText = "DELETE FROM managers WHERE login = (@login)";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("login", login);
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(string login)
    {
        if (Get(login) is BadRequestObjectResult)
        {
            return BadRequest("manager not found");
        }

        try
        {
            DeleteManager(login).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("manager deleted successfully");
    }
}