using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriesController : ControllerBase
{
    private static async Task Create(Category category)
    {
        const string commandText = "INSERT INTO categories (id, name) " +
                                   "VALUES (@id, @name)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", category.Id!);
        cmd.Parameters.AddWithValue("name", category.Name);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPost]
    public IActionResult Post(Category category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Create(category).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("category added successfully");
    }

    private static Category ReadCategory(IDataRecord reader)
    {
        var id = reader["id"] as int?;
        var name = reader["name"] as string;

        return new Category(name!, id);
    }
    
    private static async Task<List<Category>?> Read()
    {
        var categories = new List<Category>();
        
        const string commandText = "SELECT * FROM categories";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            categories.Add(ReadCategory(reader));
        }

        return categories;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var result = Read().Result;

        return result == null ? BadRequest("categories not found") : Ok(result);
    }

    public static async Task<Category?> ReadById(int id)
    {
        const string commandText = "SELECT * FROM categories WHERE id = @id";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var category = ReadCategory(reader);
            return category;
        }

        return null;
    }

    [HttpGet("byId")]
    public IActionResult Get(int id)
    {
        var result = ReadById(id).Result;

        return result == null ? BadRequest("category not found") : Ok(result);
    }

    private static async Task Update(int id, Category category)
    {
        const string commandText = @"UPDATE categories
                SET id = @id, name = @name
                WHERE id = @oldId";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldId", id);
        cmd.Parameters.AddWithValue("id", category.Id!);
        cmd.Parameters.AddWithValue("name", category.Name);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(int id, Category category)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("category not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(id, category).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("category updated successfully");
    }

    [HttpPatch("name")]
    public IActionResult PatchName(int id, string newName)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("category not found");
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

        return Ok("category name updated successfully");
    }

    private static async Task DeleteCategory(int id)
    {
        const string commandText = "DELETE FROM categories WHERE id = (@id)";
        
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        
        cmd.Parameters.AddWithValue("id", id);
        
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(int id)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("category not found");
        }

        try
        {
            DeleteCategory(id).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("category deleted successfully");
    }
}