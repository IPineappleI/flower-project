using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemsController : ControllerBase
{
    private static async Task Create(Item item)
    {
        const string commandText = "INSERT INTO items (name, price, count) " +
                                   "VALUES (@name, @price, @count)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("name", item.Name);
        cmd.Parameters.AddWithValue("price", item.Price);
        cmd.Parameters.AddWithValue("count", item.Count);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPost]
    public IActionResult Post(Item item)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Create(item).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("item created successfully");
    }

    private static Item ReadItem(IDataRecord reader)
    {
        var name = reader["name"] as string;
        var price = reader["price"] as decimal? ?? 0;
        var count = reader["count"] as int? ?? 0;

        return new Item(name!, price, count);
    }

    public static async Task<Item?> Read(string name)
    {
        const string commandText = "SELECT * FROM items WHERE name = @name";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("name", name);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var item = ReadItem(reader);
            return item;
        }

        return null;
    }

    [HttpGet]
    public IActionResult Get(string name)
    {
        var result = Read(name).Result;

        return result == null ? BadRequest("item not found") : Ok(result);
    }

    private static async Task Update(string name, Item item)
    {
        const string commandText = @"UPDATE items
                SET name = @name, price = @price, count = @count
                WHERE name = @oldName";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldName", name);
        cmd.Parameters.AddWithValue("name", item.Name);
        cmd.Parameters.AddWithValue("price", item.Price);
        cmd.Parameters.AddWithValue("count", item.Count);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(string name, Item item)
    {
        if (Get(name) is BadRequestObjectResult)
        {
            return BadRequest("item not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(name, item).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("item updated successfully");
    }
    
    [HttpPatch("name")]
    public IActionResult PatchName(string name, string newName)
    {
        var result = Read(name).Result;
        if (result == null)
        {
            return BadRequest("item not found");
        }

        result.Name = newName;
        try
        {
            Update(name, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("item name updated successfully");
    }
    
    [HttpPatch("price")]
    public IActionResult PatchPrice(string name, decimal newPrice)
    {
        var result = Read(name).Result;
        if (result == null)
        {
            return BadRequest("item not found");
        }

        result.Price = newPrice;
        try
        {
            Update(name, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("item price updated successfully");
    }
    
    [HttpPatch("count")]
    public IActionResult PatchCount(string name, int newCount)
    {
        var result = Read(name).Result;
        if (result == null)
        {
            return BadRequest("item not found");
        }

        result.Count = newCount;
        try
        {
            Update(name, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("item count updated successfully");
    }

    private static async Task DeleteItem(string name)
    {
        const string commandText = "DELETE FROM items WHERE name = (@name)";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("name", name);
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(string name)
    {
        if (Get(name) is BadRequestObjectResult)
        {
            return BadRequest("item not found");
        }

        try
        {
            DeleteItem(name).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("item deleted successfully");
    }
}