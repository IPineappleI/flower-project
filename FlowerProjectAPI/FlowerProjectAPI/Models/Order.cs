using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Order
{
    public int? Number { get; }

    public DateTime? DateAndTime { get; }

    [Required] [EmailAddress] public string ClientEmail { get; }

    [Required] public Dictionary<string, int> ShoppingCart { get; }

    [Required] public decimal Price { get; }

    [Required] public string Status { get; }

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