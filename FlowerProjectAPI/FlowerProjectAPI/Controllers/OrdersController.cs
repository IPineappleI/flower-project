using System.ComponentModel.DataAnnotations;
using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using Validator = FlowerProjectAPI.Utility.Validator;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private static async Task Create(Order order)
    {
        const string commandText = "INSERT INTO orders (client_id, shopping_cart, price, status) " +
                                   "VALUES (@clientEmail, @shoppingCart, @price, @status)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("clientEmail", order.ClientId);
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
        var id = reader["id"] as int?;
        var dateAndTime = reader["date_and_time"] as DateTime?;
        var clientId = reader["client_id"] as int? ?? 0;
        var shoppingCart = JsonConvert.DeserializeObject<Dictionary<int, int>>((reader["shopping_cart"] as string)!);
        var price = reader["price"] as decimal? ?? 0;
        var status = reader["status"] as string;

        return new Order(clientId, shoppingCart!, price, status!, id, dateAndTime);
    }
    
    private static async Task<List<Order>?> Read()
    {
        var orders = new List<Order>();
        
        const string commandText = "SELECT * FROM orders";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            orders.Add(ReadOrder(reader));
        }

        return orders;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var result = Read().Result;

        return result == null ? BadRequest("orders not found") : Ok(result);
    }

    private static async Task<Order?> ReadById(int id)
    {
        const string commandText = "SELECT * FROM orders WHERE id = @id";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var order = ReadOrder(reader);
            return order;
        }

        return null;
    }

    [HttpGet("byId")]
    public IActionResult Get(int id)
    {
        var result = ReadById(id).Result;

        return result == null ? BadRequest("order not found") : Ok(result);
    }

    private static async Task Update(int id, Order order)
    {
        const string commandText = @"UPDATE orders
                SET id = @id, date_and_time = @dateAndTime, client_id = @clientId, 
                    shopping_cart = @shoppingCart, price = @price, status = @status
                WHERE id = @oldNumber";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldNumber", id);
        cmd.Parameters.AddWithValue("id", order.Id!);
        cmd.Parameters.AddWithValue("dateAndTime", order.DateAndTime!);
        cmd.Parameters.AddWithValue("clientId", order.ClientId);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(order.ShoppingCart));
        cmd.Parameters.AddWithValue("price", order.Price);
        cmd.Parameters.AddWithValue("status", order.Status);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(int id, Order order)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("order not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(id, order).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("order updated successfully");
    }
    
    [HttpPatch("shoppingCart")]
    public IActionResult PatchShoppingCart(int id, Dictionary<int, int> newShoppingCart)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("order not found");
        }

        var roleValidationResult = Validator.ValidateShoppingCart(newShoppingCart);
        if (roleValidationResult != ValidationResult.Success)
        {
            return BadRequest(roleValidationResult!.ErrorMessage);
        }

        result.ShoppingCart = newShoppingCart;
        try
        {
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("order shopping cart updated successfully");
    }
    
    [HttpPatch("price")]
    public IActionResult PatchPrice(int id, decimal newPrice)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("order not found");
        }

        result.Price = newPrice;
        try
        {
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("order price updated successfully");
    }
    
    [HttpPatch("status")]
    public IActionResult PatchStatus(int id, string newStatus)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("order not found");
        }

        result.Status = newStatus;
        try
        {
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("order status updated successfully");
    }

    private static async Task DeleteOrder(int id)
    {
        const string commandText = "DELETE FROM orders WHERE id = (@id)";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("id", id);
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(int id)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("order not found");
        }

        try
        {
            DeleteOrder(id).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("order deleted successfully");
    }
}