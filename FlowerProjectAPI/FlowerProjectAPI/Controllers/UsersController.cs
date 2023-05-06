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
        const string commandText =
            "INSERT INTO users (first_name, last_name, email, phone_number, password, role, shopping_cart) " +
            "VALUES (@firstName, @lastName, @email, @phoneNumber, @password, @role, @shoppingCart)";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("firstName", user.FirstName);
        cmd.Parameters.AddWithValue("lastName", user.LastName!);
        cmd.Parameters.AddWithValue("email", user.Email);
        cmd.Parameters.AddWithValue("phoneNumber", user.PhoneNumber);
        cmd.Parameters.AddWithValue("password", user.Password);
        cmd.Parameters.AddWithValue("role", user.Role);
        cmd.Parameters.AddWithValue("shoppingCart", user.ShoppingCart);

        await cmd.ExecuteNonQueryAsync();
    }

    private void CreateTokenAndSendEmail(string email)
    {
        var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        TokensController.Create(new EmailToken(email, token)).Wait();

        var link = Url.Action(nameof(ConfirmEmail), "Users",
            new { email, token }, Request.Scheme);
        EmailSender.SendEmailConfirmationLink(email, link);
    }

    [HttpPost]
    public IActionResult Post(User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        User newUser;

        try
        {
            Create(user).Wait();

            newUser = ReadByEmail(user.Email).Result!;

            CreateTokenAndSendEmail(newUser.Email);
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Created("Users", newUser);
    }

    private static User ReadUser(IDataRecord reader)
    {
        var id = reader["id"] as int?;
        var firstName = reader["first_name"] as string;
        var lastName = reader["last_name"] as string;
        var email = reader["email"] as string;
        var phoneNumber = reader["phone_number"] as string;
        var password = reader["password"] as string;
        var role = reader["role"] as string;
        var shoppingCart = JsonConvert.DeserializeObject<Dictionary<int, int>>((reader["shopping_cart"] as string)!);
        var emailConfirmed = reader["email_confirmed"] as bool?;

        var user = new User(firstName!, lastName, email!, phoneNumber!, password!, role!, shoppingCart, id!.Value)
            {
                EmailConfirmed = emailConfirmed!.Value
            };

        return user;
    }

    private static async Task<List<User>?> Read()
    {
        var users = new List<User>();

        const string commandText = "SELECT * FROM users";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            users.Add(ReadUser(reader));
        }

        return users;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var result = Read().Result;

        return result == null ? NotFound("users not found") : Ok(result);
    }

    public static async Task<User?> ReadById(int id)
    {
        const string commandText = "SELECT * FROM users WHERE id = @id";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var client = ReadUser(reader);
            return client;
        }

        return null;
    }

    [HttpGet("byId")]
    public IActionResult Get(int id)
    {
        var result = ReadById(id).Result;

        return result == null ? NotFound("user not found") : Ok(result);
    }

    private static async Task<User?> ReadByEmail(string email)
    {
        const string commandText = "SELECT * FROM users WHERE email = @email";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("email", email);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var client = ReadUser(reader);
            return client;
        }

        return null;
    }
    
    [HttpGet("ConfirmEmail")]
    public IActionResult ConfirmEmail(string email, string token)
    {
        var emailToken = TokensController.ReadByEmail(email).Result;

        if (emailToken == null)
        {
            return NotFound($"confirmation token for email {email} not found");
        }

        return emailToken.Token != token
            ? BadRequest("incorrect confirmation token")
            : PatchEmailConfirmed(email, true);
    }

    [HttpGet("authorizeByEmail")]
    public IActionResult AuthorizeByEmail([EmailAddress] string email,
        [CustomValidation(typeof(Validator), "ValidatePassword")] string password)
    {
        var result = ReadByEmail(email).Result;

        if (result == null)
        {
            return NotFound("user not found");
        }

        if (result.Password != password)
        {
            return BadRequest("incorrect password");
        }

        return result.EmailConfirmed ? Ok(result) : BadRequest($"email {result.Email} is not confirmed");
    }

    private static async Task Update(int id, User user)
    {
        const string commandText = @"UPDATE users
                SET id = @id, first_name = @firstName, last_name = @lastName, email = @email, 
                    phone_number = @phoneNumber, password = @password, role = @role, 
                    shopping_cart = @shoppingCart, email_confirmed = @emailConfirmed
                WHERE id = @oldId";

        await using var cmd = new NpgsqlCommand(commandText, DataBase.Connection);

        cmd.Parameters.AddWithValue("oldId", id);
        cmd.Parameters.AddWithValue("id", user.Id);
        cmd.Parameters.AddWithValue("firstName", user.FirstName);
        cmd.Parameters.AddWithValue("lastName", user.LastName!);
        cmd.Parameters.AddWithValue("email", user.Email);
        cmd.Parameters.AddWithValue("phoneNumber", user.PhoneNumber);
        cmd.Parameters.AddWithValue("password", user.Password);
        cmd.Parameters.AddWithValue("role", user.Role);
        cmd.Parameters.AddWithValue("emailConfirmed", user.EmailConfirmed);
        cmd.Parameters.AddWithValue("shoppingCart", user.ShoppingCart);

        await cmd.ExecuteNonQueryAsync();
    }

    [HttpPut]
    public IActionResult Put(int id, User user)
    {
        var result = ReadById(id).Result;
        
        if (result == null)
        {
            return NotFound("user not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        if (user.Email == result.Email && result.EmailConfirmed)
        {
            user.EmailConfirmed = true;
        }

        try
        {
            Update(id, user).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        if (user.Email != result.Email)
        {
            TokensController.DeleteToken(result.Email).Wait();
            
            CreateTokenAndSendEmail(user.Email);
        }

        return Ok("user updated successfully");
    }
    
    [HttpPatch("email")]
    public IActionResult PatchEmail(int id, string newEmail)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return NotFound("user not found");
        }

        var emailChecker = new EmailAddressAttribute();
        if (!emailChecker.IsValid(newEmail))
        {
            return BadRequest($"{newEmail} is not a valid email address");
        }

        var oldEmail = result.Email;
        
        if (newEmail != oldEmail)
        {
            result.EmailConfirmed = false;
            result.Email = newEmail;
        }

        try
        {
            Update(id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        if (newEmail != oldEmail)
        {
            TokensController.DeleteToken(oldEmail).Wait();
            
            CreateTokenAndSendEmail(newEmail);
        }

        return Ok("user email updated successfully");
    }

    [HttpPatch("phoneNumber")]
    public IActionResult PatchPhoneNumber(int id, string newPhoneNumber)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return NotFound("user not found");
        }

        var phoneChecker = new PhoneAttribute();
        if (!phoneChecker.IsValid(newPhoneNumber))
        {
            return BadRequest($"{newPhoneNumber} is not a valid phone number");
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
            return NotFound("user not found");
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
            return NotFound("user not found");
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

    [HttpPatch("shoppingCart")]
    public IActionResult PatchShoppingCart(int id, Dictionary<int, int>? newShoppingCart)
    {
        var result = ReadById(id).Result;
        if (result == null)
        {
            return NotFound("user not found");
        }

        if (newShoppingCart != null && result.Role != "client")
        {
            return BadRequest("only clients can have a shopping cart");
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

        return Ok("client shopping cart updated successfully");
    }

    [HttpPatch("emailConfirmed")]
    public IActionResult PatchEmailConfirmed(string email, bool emailConfirmed)
    {
        var result = ReadByEmail(email).Result;
        if (result == null)
        {
            return NotFound("user not found");
        }

        result.EmailConfirmed = emailConfirmed;
        try
        {
            Update(result.Id, result).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("email confirmation status updated successfully");
    }

    private static async Task DeleteUser(int id)
    {
        const string commandText = "DELETE FROM users WHERE id = (@id)";
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
            DeleteUser(id).Wait();
        }
        catch (AggregateException e)
        {
            return BadRequest(e.Message);
        }

        return Ok("user deleted successfully");
    }
}