using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class TokensController : ControllerBase
{
    public static async Task Create(EmailToken emailToken)
    {
        const string commandText = "INSERT INTO tokens (email, token) " +
                                   "VALUES (@email, @token)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("email", emailToken.Email);
        cmd.Parameters.AddWithValue("token", emailToken.Token);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPost]
    public IActionResult Post(EmailToken emailToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Create(emailToken).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Created("Tokens", ReadByEmail(emailToken.Email).Result);
    }

    private static EmailToken ReadEmailToken(IDataRecord reader)
    {
        var email = reader["email"] as string;
        var token = reader["token"] as string;

        return new EmailToken(email!, token!);
    }
    
    private static async Task<List<EmailToken>?> Read()
    {
        var tokens = new List<EmailToken>();
        
        const string commandText = "SELECT * FROM tokens";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            tokens.Add(ReadEmailToken(reader));
        }

        return tokens;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var result = Read().Result;

        return result == null ? NotFound("tokens not found") : Ok(result);
    }

    public static async Task<EmailToken?> ReadByEmail(string email)
    {
        const string commandText = "SELECT * FROM tokens WHERE email = @email";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("email", email);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var emailToken = ReadEmailToken(reader);
            return emailToken;
        }

        return null;
    }

    [HttpGet("byEmail")]
    public IActionResult Get(string email)
    {
        var result = ReadByEmail(email).Result;

        return result == null ? NotFound("email token not found") : Ok(result);
    }

    public static async Task DeleteToken(string email)
    {
        const string commandText = "DELETE FROM tokens WHERE email = (@email)";
        
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        
        cmd.Parameters.AddWithValue("email", email);
        
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(string email)
    {
        if (Get(email) is NotFoundObjectResult)
        {
            return NoContent();
        }

        try
        {
            DeleteToken(email).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("email token deleted successfully");
    }
}