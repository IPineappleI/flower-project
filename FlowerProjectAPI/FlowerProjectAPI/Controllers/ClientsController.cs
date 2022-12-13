using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ClientsController : ControllerBase
{
    private static async Task Create(Client client)
    {
        const string commandText = "INSERT INTO clients (email, phone_number, password, shopping_cart) " +
                                   "VALUES (@email, @phoneNumber, @password, @shoppingCart)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("email", client.Email);
        cmd.Parameters.AddWithValue("phoneNumber", client.PhoneNumber);
        cmd.Parameters.AddWithValue("password", client.Password);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(client.ShoppingCart));

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPost]
    public IActionResult Post(Client client)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Create(client).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("client created successfully");
    }

    private static Client ReadClient(IDataRecord reader)
    {
        var email = reader["email"] as string;
        var phoneNumber = reader["phone_number"] as string;
        var password = reader["password"] as string;
        var shoppingCart = JsonConvert.DeserializeObject<Dictionary<string, int>>((reader["shopping_cart"] as string)!);

        return new Client(email!, phoneNumber!, password!, shoppingCart);
    }

    private static async Task<Client?> Read(string email)
    {
        const string commandText = "SELECT * FROM clients WHERE email = @email";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("email", email);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var client = ReadClient(reader);
            return client;
        }

        return null;
    }

    [HttpGet]
    public IActionResult Get(string email)
    {
        var result = Read(email).Result;

        return result == null ? BadRequest("client not found") : Ok(result);
    }

    private static async Task Update(string email, Client client)
    {
        const string commandText = @"UPDATE clients
                SET email = @email, phone_number = @phoneNumber, password = @password, shopping_cart = @shoppingCart
                WHERE email = @oldEmail";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldEmail", email);
        cmd.Parameters.AddWithValue("email", client.Email);
        cmd.Parameters.AddWithValue("phoneNumber", client.PhoneNumber);
        cmd.Parameters.AddWithValue("password", client.Password);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(client.ShoppingCart));

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(string email, Client client)
    {
        if (Get(email) is BadRequestObjectResult)
        {
            return BadRequest("client not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(email, client).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("client updated successfully");
    }

    private static async Task DeleteClient(string email)
    {
        const string commandText = "DELETE FROM clients WHERE email = (@email)";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("email", email);
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(string email)
    {
        if (Get(email) is BadRequestObjectResult)
        {
            return BadRequest("client not found");
        }

        try
        {
            DeleteClient(email).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("client deleted successfully");
    }
}