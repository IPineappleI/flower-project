using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Order
{
    public int? Id { get; }

    public DateTime? DateAndTime { get; }

    [Required] public int ClientId { get; }

    [Required] public Dictionary<int, int> ShoppingCart { get; set; }

    [Required] public decimal Price { get; set; }

    [Required] public string Status { get; set; }

    public Order(int clientId, Dictionary<int, int> shoppingCart, decimal price, string status,
        int? id = null, DateTime? dateAndTime = null)
    {
        Id = id;
        DateAndTime = dateAndTime;
        ClientId = clientId;
        ShoppingCart = shoppingCart;
        Price = price;
        Status = status;
    }
}