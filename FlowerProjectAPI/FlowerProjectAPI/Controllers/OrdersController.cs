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
        const string commandText = "INSERT INTO orders (id, client_id, shopping_cart, price, status) " +
                                   "VALUES (@id, @clientId, @shoppingCart, @price, @status)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", order.Id);
        cmd.Parameters.AddWithValue("clientId", order.ClientId);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(order.ShoppingCart));
        cmd.Parameters.AddWithValue("price", order.Price);
        cmd.Parameters.AddWithValue("status", order.Status);

        await cmd.ExecuteNonQueryAsync();
    }
    
    private static decimal TakeItems(Dictionary<int, int> shoppingCart)
    {
        decimal sum = 0;
        
        foreach (var itemIdCountPair in shoppingCart)
        {
            var item = ItemsController.ReadById(itemIdCountPair.Key).Result!;

            new ItemsController().PatchCount(itemIdCountPair.Key, item.Count - itemIdCountPair.Value);

            sum += item.Price * itemIdCountPair.Value;
        }

        return sum;
    }

    [HttpPost]
    public IActionResult Post(Order order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (UsersController.ReadById(order.ClientId).Result!.Role != "client")
        {
            return BadRequest("user is not a client");
        }

        order.Price = TakeItems(order.ShoppingCart);

        try
        {
            Create(order).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Created("Orders", ReadById(order.Id).Result);
    }
    
    private static async Task CreateWithDefaultId(Order order)
    {
        const string commandText = "INSERT INTO orders (client_id, shopping_cart, price, status) " +
                                   "VALUES (@clientId, @shoppingCart, @price, @status)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        
        cmd.Parameters.AddWithValue("clientId", order.ClientId);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(order.ShoppingCart));
        cmd.Parameters.AddWithValue("price", order.Price);
        cmd.Parameters.AddWithValue("status", order.Status);

        await cmd.ExecuteNonQueryAsync();
    }
    
    private static async Task<int?> GetCurrentId()
    {
        const string commandText = "SELECT last_value FROM orders_id_seq";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        return cmd.ExecuteNonQueryAsync().Result;
    }

    [HttpPost("shoppingCart")]
    public IActionResult PostShoppingCart(int clientId)
    {
        var user = UsersController.ReadById(clientId).Result;
        if (user == null)
        {
            return NotFound("user not found");
        }
        if (user.Role != "client")
        {
            return BadRequest("user is not a client");
        }

        var validationResult = Validator.ValidateShoppingCart(user.ShoppingCart!);
        if (validationResult != ValidationResult.Success)
        {
            return BadRequest(validationResult!.ErrorMessage);
        }
        
        var shoppingCart = new Order(-1, clientId, user.ShoppingCart!, TakeItems(user.ShoppingCart!));

        try
        {
            CreateWithDefaultId(shoppingCart).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        var newOrder = ReadById(GetCurrentId().Result!.Value).Result;

        new UsersController().PatchShoppingCart(clientId, new Dictionary<int, int>());

        return Created("Orders/shoppingCart", newOrder);
    }

    private static Order ReadOrder(IDataRecord reader)
    {
        var id = reader["id"] as int?;
        var dateAndTime = reader["date_and_time"] as DateTime?;
        var clientId = reader["client_id"] as int? ?? 0;
        var shoppingCart = JsonConvert.DeserializeObject<Dictionary<int, int>>((reader["shopping_cart"] as string)!);
        var price = reader["price"] as decimal? ?? 0;
        var status = reader["status"] as string;

        return new Order(id!.Value, clientId, shoppingCart!, price, status!, dateAndTime);
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

        return result == null ? NotFound("orders not found") : Ok(result);
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

        return result == null ? NotFound("order not found") : Ok(result);
    }

    private static async Task<List<Order>?> ReadByClientId(int clientId)
    {
        var orders = new List<Order>();

        const string commandText = "SELECT * FROM orders WHERE client_id = @clientId";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("clientId", clientId);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            orders.Add(ReadOrder(reader));
        }

        return orders;
    }

    [HttpGet("byClientId")]
    public IActionResult GetByClientId(int clientId)
    {
        var result = ReadByClientId(clientId).Result;

        return result == null ? NotFound("orders not found") : Ok(result);
    }

    private static async Task Update(int id, Order order)
    {
        const string commandText = @"UPDATE orders
                SET id = @id, date_and_time = @dateAndTime, client_id = @clientId, 
                    shopping_cart = @shoppingCart, price = @price, status = @status
                WHERE id = @oldId";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldId", id);
        cmd.Parameters.AddWithValue("id", order.Id);
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
        if (Get(id) is NotFoundObjectResult)
        {
            return NotFound("order not found");
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
            return NotFound("order not found");
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
            return NotFound("order not found");
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
            return NotFound("order not found");
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
        if (Get(id) is NotFoundObjectResult)
        {
            return NoContent();
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