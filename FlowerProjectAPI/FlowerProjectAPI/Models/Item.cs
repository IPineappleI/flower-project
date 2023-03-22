using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Item
{
    public int? Id { get; set; }

    [Required] public string Name { get; set; }

    [Required] public int CategoryId { get; set; }

    [Required] public decimal Price { get; set; }

    [Required] public int Count { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    public Item(string name, int categoryId, decimal price, int count,
        int? id = null, string? description = null, string? image = null)
    {
        Id = id;
        Name = name;
        CategoryId = categoryId;
        Price = price;
        Count = count;
        Description = description;
        Image = image;
    }
}