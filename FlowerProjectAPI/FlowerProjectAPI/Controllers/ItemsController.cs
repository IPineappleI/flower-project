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
        const string commandText = "INSERT INTO items (id, name, category_id, price, count, description, image) " +
                                   "VALUES (@id, @name, @categoryId, @price, @count, @description, @image)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", item.Id!);
        cmd.Parameters.AddWithValue("name", item.Name);
        cmd.Parameters.AddWithValue("categoryId", item.CategoryId);
        cmd.Parameters.AddWithValue("price", item.Price);
        cmd.Parameters.AddWithValue("count", item.Count);
        cmd.Parameters.AddWithValue("description", item.Description!);
        cmd.Parameters.AddWithValue("image", item.Image!);

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

        return Ok("item added successfully");
    }

    private static Item ReadItem(IDataRecord reader)
    {
        var id = reader["id"] as int?;
        var name = reader["name"] as string;
        var categoryId = reader["category_id"] as int? ?? 0;
        var price = reader["price"] as decimal? ?? 0;
        var count = reader["count"] as int? ?? 0;
        var description = reader["description"] as string;
        var image = reader["image"] as string;

        return new Item(name!, categoryId, price, count, id, description, image);
    }
    
    private static async Task<List<Item>?> Read()
    {
        var items = new List<Item>();
        
        const string commandText = "SELECT * FROM items";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            items.Add(ReadItem(reader));
        }

        return items;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var result = Read().Result;

        return result == null ? BadRequest("items not found") : Ok(result);
    }

    public static async Task<Item?> ReadById(int id)
    {
        const string commandText = "SELECT * FROM items WHERE id = @id";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var item = ReadItem(reader);
            return item;
        }

        return null;
    }

    [HttpGet("byId")]
    public IActionResult Get(int id)
    {
        var result = ReadById(id).Result;

        return result == null ? BadRequest("item not found") : Ok(result);
    }

    private static async Task Update(int id, Item item)
    {
        const string commandText = @"UPDATE items
                SET id = @id, name = @name, category_id = @categoryId, price = @price, count = @count, 
                    description = @description, image = @image
                WHERE id = @oldId";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldId", id);
        cmd.Parameters.AddWithValue("id", item.Id!);
        cmd.Parameters.AddWithValue("name", item.Name);
        cmd.Parameters.AddWithValue("categoryId", item.CategoryId);
        cmd.Parameters.AddWithValue("price", item.Price);
        cmd.Parameters.AddWithValue("count", item.Count);
        cmd.Parameters.AddWithValue("description", item.Description!);
        cmd.Parameters.AddWithValue("image", item.Image!);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(int id, Item item)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("item not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(id, item).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("item updated successfully");
    }

    [HttpPatch("name")]
    public IActionResult PatchName(int id, string newName)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("item not found");
        }

        result.Name = newName;
        try
        {
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("item name updated successfully");
    }

    [HttpPatch("price")]
    public IActionResult PatchPrice(int id, decimal newPrice)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("item not found");
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

        return Ok("item price updated successfully");
    }

    [HttpPatch("count")]
    public IActionResult PatchCount(int id, int newCount)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("item not found");
        }

        result.Count = newCount;
        try
        {
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("item count updated successfully");
    }

    private static async Task DeleteItem(int id)
    {
        const string commandText = "DELETE FROM items WHERE id = (@id)";
        
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        
        cmd.Parameters.AddWithValue("id", id);
        
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(int id)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("item not found");
        }

        try
        {
            DeleteItem(id).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("item deleted successfully");
    }
}