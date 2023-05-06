using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class EmailToken
{
    [Required]
    [RegularExpression(@"^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$")]
    public string Email { get; set; }
    
    [Required]
    public string Token { get; set; }

    public EmailToken(string email, string token)
    {
        Email = email;
        Token = token;
    }
}