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
public class UsersController : ControllerBase
{
    private static async Task Create(User user)
    {
        const string commandText = "INSERT INTO users (email, phone_number, password, role, shopping_cart) " +
                                   "VALUES (@email, @phoneNumber, @password, @role, @shoppingCart)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("email", user.Email);
        cmd.Parameters.AddWithValue("phoneNumber", user.PhoneNumber);
        cmd.Parameters.AddWithValue("password", user.Password);
        cmd.Parameters.AddWithValue("role", user.Role);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(user.ShoppingCart));

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPost]
    public IActionResult Post(User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Create(user).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user created successfully");
    }

    private static User ReadClient(IDataRecord reader)
    {
        var email = reader["email"] as string;
        var phoneNumber = reader["phone_number"] as string;
        var password = reader["password"] as string;
        var role = reader["role"] as string;
        var shoppingCart = JsonConvert.DeserializeObject<Dictionary<string, int>>((reader["shopping_cart"] as string)!);

        return new User(email!, phoneNumber!, password!, role!, shoppingCart);
    }

    private static async Task<User?> Read(string email)
    {
        const string commandText = "SELECT * FROM users WHERE email = @email";
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

        return result == null ? BadRequest("user not found") : Ok(result);
    }

    private static async Task Update(string email, User user)
    {
        const string commandText = @"UPDATE users
                SET email = @email, phone_number = @phoneNumber, password = @password, role = @role, 
                    shopping_cart = @shoppingCart
                WHERE email = @oldEmail";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldEmail", email);
        cmd.Parameters.AddWithValue("email", user.Email);
        cmd.Parameters.AddWithValue("phoneNumber", user.PhoneNumber);
        cmd.Parameters.AddWithValue("password", user.Password);
        cmd.Parameters.AddWithValue("role", user.Role);
        cmd.Parameters.AddWithValue("shoppingCart", JsonConvert.SerializeObject(user.ShoppingCart));

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(string email, User user)
    {
        if (Get(email) is BadRequestObjectResult)
        {
            return BadRequest("user not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(email, user).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user updated successfully");
    }

    [HttpPatch("email")]
    public IActionResult PatchEmail(string email, string newEmail)
    {
        var result = Read(email).Result;
        if (result == null)
        {
            return BadRequest("user not found");
        }

        var emailChecker = new EmailAddressAttribute();
        if (!emailChecker.IsValid(newEmail))
        {
            return BadRequest("newEmail is not a valid e-mail address");
        }

        result.Email = newEmail;
        try
        {
            Update(email, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("user email updated successfully");
    }
    
    [HttpPatch("phoneNumber")]
    public IActionResult PatchPhoneNumber(string email, string newPhoneNumber)
    {
        var result = Read(email).Result;
        if (result == null)
        {
            return BadRequest("user not found");
        }

        var emailChecker = new PhoneAttribute();
        if (!emailChecker.IsValid(newPhoneNumber))
        {
            return BadRequest("newPhoneNumber is not a valid phone number");
        }

        result.PhoneNumber = newPhoneNumber;
        try
        {
            Update(email, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("user phone number updated successfully");
    }
    
    [HttpPatch("password")]
    public IActionResult PatchPassword(string email, string newPassword)
    {
        var result = Read(email).Result;
        if (result == null)
        {
            return BadRequest("user not found");
        }

        var passwordValidationResult = Validator.ValidatePassword(newPassword);
        if (passwordValidationResult != ValidationResult.Success)
        {
            return BadRequest(passwordValidationResult!.ErrorMessage);
        }

        result.Password = newPassword;
        try
        {
            Update(email, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("user password updated successfully");
    }
    
    [HttpPatch("role")]
    public IActionResult PatchRole(string email, string newRole)
    {
        var result = Read(email).Result;
        if (result == null)
        {
            return BadRequest("user not found");
        }

        var roleValidationResult = Validator.ValidateRole(newRole);
        if (roleValidationResult != ValidationResult.Success)
        {
            return BadRequest(roleValidationResult!.ErrorMessage);
        }

        result.Role = newRole;
        try
        {
            Update(email, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("user role updated successfully");
    }
    
    [HttpPatch("shoppingCart")]
    public IActionResult PatchShoppingCart(string email, Dictionary<string, int> newShoppingCart)
    {
        var result = Read(email).Result;
        if (result == null)
        {
            return BadRequest("user not found");
        }

        if (result.Role != "client")
        {
            return BadRequest("only clients can have a shopping cart");
        }

        var roleValidationResult = Validator.ValidateShoppingCart(newShoppingCart);
        if (roleValidationResult != ValidationResult.Success)
        {
            return BadRequest(roleValidationResult!.ErrorMessage);
        }

        result.ShoppingCart = newShoppingCart;
        try
        {
            Update(email, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("client shopping cart updated successfully");
    }

    private static async Task DeleteClient(string email)
    {
        const string commandText = "DELETE FROM users WHERE email = (@email)";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("email", email);
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(string email)
    {
        if (Get(email) is BadRequestObjectResult)
        {
            return BadRequest("user not found");
        }

        try
        {
            DeleteClient(email).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user deleted successfully");
    }
}