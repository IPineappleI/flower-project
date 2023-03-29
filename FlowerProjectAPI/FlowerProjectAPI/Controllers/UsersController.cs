using System.ComponentModel.DataAnnotations;
using System.Data;
using FlowerProjectAPI.Models;
using FlowerProjectAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Validator = FlowerProjectAPI.Utility.Validator;

namespace FlowerProjectAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private static async Task Create(User user)
    {
        const string commandText =
            "INSERT INTO users (id, first_name, last_name, email, phone_number, password, role, shopping_cart_id) " +
            "VALUES (@id, @firstName, @lastName, @email, @phoneNumber, @password, @role, @shoppingCartId)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", user.Id!);
        cmd.Parameters.AddWithValue("firstName", user.FirstName);
        cmd.Parameters.AddWithValue("lastName", user.LastName!);
        cmd.Parameters.AddWithValue("email", user.Email);
        cmd.Parameters.AddWithValue("phoneNumber", user.PhoneNumber);
        cmd.Parameters.AddWithValue("password", user.Password);
        cmd.Parameters.AddWithValue("role", user.Role);
        cmd.Parameters.AddWithValue("shoppingCartId", user.ShoppingCartId!);

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
        var id = reader["id"] as int?;
        var firstName = reader["first_name"] as string;
        var lastName = reader["last_name"] as string;
        var email = reader["email"] as string;
        var phoneNumber = reader["phone_number"] as string;
        var password = reader["password"] as string;
        var role = reader["role"] as string;
        var shoppingCartId = reader["shopping_cart_id"] as int?;

        return new User(email!, phoneNumber!, password!, role!, firstName!, lastName, id, shoppingCartId);
    }
    
    private static async Task<List<User>?> Read()
    {
        var users = new List<User>();
        
        const string commandText = "SELECT * FROM users";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            users.Add(ReadClient(reader));
        }

        return users;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var result = Read().Result;

        return result == null ? BadRequest("users not found") : Ok(result);
    }

    private static async Task<User?> ReadById(int id)
    {
        const string commandText = "SELECT * FROM users WHERE id = @id";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var client = ReadClient(reader);
            return client;
        }

        return null;
    }

    [HttpGet("byId")]
    public IActionResult Get(int id)
    {
        var result = ReadById(id).Result;

        return result == null ? BadRequest("user not found") : Ok(result);
    }

    private static async Task<User?> ReadByEmail(string email)
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

    [HttpGet("authorizeByEmail")]
    public IActionResult AuthorizeByEmail([EmailAddress] string email,
        [CustomValidation(typeof(Validator), "ValidatePassword")]
        string password)
    {
        var result = ReadByEmail(email).Result;

        if (result == null)
        {
            return BadRequest("user not found");
        }

        if (result.Password != password)
        {
            return BadRequest("incorrect password");
        }

        return Ok(result);
    }

    private static async Task<User?> ReadByPhoneNumber(string phoneNumber)
    {
        const string commandText = "SELECT * FROM users WHERE phone_number = @phoneNumber";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("phoneNumber", phoneNumber);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var client = ReadClient(reader);
            return client;
        }

        return null;
    }

    [HttpGet("authorizeByPhoneNumber")]
    public IActionResult AuthorizeByPhoneNumber([Phone] string phoneNumber,
        [CustomValidation(typeof(Validator), "ValidatePassword")]
        string password)
    {
        var result = ReadByPhoneNumber(phoneNumber).Result;

        if (result == null)
        {
            return BadRequest("user not found");
        }

        if (result.Password != password)
        {
            return BadRequest("incorrect password");
        }

        return Ok(result);
    }

    private static async Task Update(int id, User user)
    {
        const string commandText = @"UPDATE users
                SET id = @id, first_name = @firstName, last_name = @lastName, email = @email, 
                    phone_number = @phoneNumber, password = @password, role = @role, shopping_cart_id = @shoppingCartId
                WHERE email = @oldId";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldId", id);
        cmd.Parameters.AddWithValue("id", user.Id!);
        cmd.Parameters.AddWithValue("firstName", user.FirstName);
        cmd.Parameters.AddWithValue("lastName", user.LastName!);
        cmd.Parameters.AddWithValue("email", user.Email);
        cmd.Parameters.AddWithValue("phoneNumber", user.PhoneNumber);
        cmd.Parameters.AddWithValue("password", user.Password);
        cmd.Parameters.AddWithValue("role", user.Role);
        cmd.Parameters.AddWithValue("shoppingCartId", user.ShoppingCartId!);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(int id, User user)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("user not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Update(id, user).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user updated successfully");
    }

    [HttpPatch("email")]
    public IActionResult PatchEmail(int id, string newEmail)
    {
        var result = ReadById(id).Result;
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
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user email updated successfully");
    }

    [HttpPatch("phoneNumber")]
    public IActionResult PatchPhoneNumber(int id, string newPhoneNumber)
    {
        var result = ReadById(id).Result;
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
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user phone number updated successfully");
    }

    [HttpPatch("password")]
    public IActionResult PatchPassword(int id, string newPassword)
    {
        var result = ReadById(id).Result;
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
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user password updated successfully");
    }

    [HttpPatch("role")]
    public IActionResult PatchRole(int id, string newRole)
    {
        var result = ReadById(id).Result;
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
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user role updated successfully");
    }

    [HttpPatch("shoppingCartId")]
    public IActionResult PatchShoppingCartId(int id, int newShoppingCartId)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return BadRequest("user not found");
        }

        if (result.Role != "client")
        {
            return BadRequest("only clients can have a shopping cart");
        }

        result.ShoppingCartId = newShoppingCartId;
        try
        {
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("client shopping cart updated successfully");
    }

    private static async Task DeleteClient(int id)
    {
        const string commandText = "DELETE FROM users WHERE id = (@id)";
        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);
        cmd.Parameters.AddWithValue("id", id);
        await cmd.ExecuteNonQueryAsync();
    }

    [HttpDelete]
    public IActionResult Delete(int id)
    {
        if (Get(id) is BadRequestObjectResult)
        {
            return BadRequest("user not found");
        }

        try
        {
            DeleteClient(id).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user deleted successfully");
    }
}