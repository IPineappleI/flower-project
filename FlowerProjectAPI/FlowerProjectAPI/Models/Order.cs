using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Order
{
    public int? Number { get; }

    public DateTime? DateAndTime { get; }

    [Required] [EmailAddress] public string ClientEmail { get; }

    [Required] public Dictionary<string, int> ShoppingCart { get; set; }

    [Required] public decimal Price { get; set; }

    [Required] public string Status { get; set; }

    public Order(string clientEmail, Dictionary<string, int> shoppingCart, decimal price, string status,
        int? number = null, DateTime? dateAndTime = null)
    {
        Number = number;
        DateAndTime = dateAndTime;
        ClientEmail = clientEmail;
        ShoppingCart = shoppingCart;
        Price = price;
        Status = status;
    }
}