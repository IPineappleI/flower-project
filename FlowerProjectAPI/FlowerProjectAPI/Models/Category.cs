using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Category
{
    [Required] public int Id { get; set; }

    [Required] public string Name { get; set; }
    
    public string? Image { get; set; }

    public Category(int id, string name, string? image = null)
    {
        Id = id;
        Name = name;
        Image = image;
    }
}