using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private static async Task Create(Order order)
    {
        const string commandText = "INSERT INTO orders (client_email, shopping_cart, price, status) " +
                                   "VALUES (@clientEmail, @shoppingCart, @price, @status)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("clientEmail", order.ClientEmail);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(order.ShoppingCart));
        cmd.Parameters.AddWithValue("price", order.Price);
        cmd.Parameters.AddWithValue("status", order.Status);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPost]
    public IActionResult Post(Order order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Create(order).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("order created successfully");
    }

    private static Order ReadOrder(IDataRecord reader)
    {
        var number = reader["number"] as int?;
        var dateAndTime = reader["date_and_time"] as DateTime?;
        var clientEmail = reader["client_email"] as string;
        var shoppingCart = JsonConvert.DeserializeObject<Dictionary<string, int>>((reader["shopping_cart"] as string)!);
        var price = reader["price"] as decimal? ?? 0;
        var status = reader["status"] as string;

        return new Order(clientEmail!, shoppingCart!, price, status!, number, dateAndTime);
    }

    private static async Task<Order?> Read(int number)
    {
        const string commandText = "SELECT * FROM orders WHERE number = @number";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("number", number);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var order = ReadOrder(reader);
            return order;
        }

        return null;
    }

    [HttpGet]
    public IActionResult Get(int number)
    {
        var result = Read(number).Result;

        return result == null ? BadRequest("order not found") : Ok(result);
    }

    private static async Task Update(int number, Order order)
    {
        const string commandText = @"UPDATE orders
                SET number = @number, date_and_time = @dateAndTime, client_email = @clientEmail, 
                    shopping_cart = @shoppingCart, price = @price, status = @status
                WHERE number = @oldNumber";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldNumber", number);
        cmd.Parameters.AddWithValue("number", order.Number!);
        cmd.Parameters.AddWithValue("dateAndTime", order.DateAndTime!);
        cmd.Parameters.AddWithValue("clientEmail", order.ClientEmail);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(order.ShoppingCart));
        cmd.Parameters.AddWithValue("price", order.Price);
        cmd.Parameters.AddWithValue("status", order.Status);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(int number, Order order)
    {
        if (Get(number) is BadRequestObjectResult)
        {
            return BadRequest("order not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(number, order).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("order updated successfully");
    }

    private static async Task DeleteOrder(int number)
    {
        const string commandText = "DELETE FROM orders WHERE number = (@number)";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("number", number);
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(int number)
    {
        if (Get(number) is BadRequestObjectResult)
        {
            return BadRequest("order not found");
        }

        try
        {
            DeleteOrder(number).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("order deleted successfully");
    }
}