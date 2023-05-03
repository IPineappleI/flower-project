using MailKit.Net.Smtp;
using MimeKit;

namespace FlowerProjectAPI.Utility;

public abstract class EmailSender
{
    private static readonly SmtpClient Client = new();
    private const string From = "flower.project.notifier@gmail.com";
    private const string SmtpServer = "smtp.gmail.com";
    private const int Port = 465;
    private const string Username = From;
    private const string Password = "vyrptpdgojgnafci";

    ~EmailSender()
    {
        Client.Dispose();
    }

    public static void SendEmailConfirmationLink(string to, string? link)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Flower Project", From));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = "Email Confirmation";
        message.Body = new TextPart("plain")
        {
            Text = "Use this link to confirm your email address:\n" + link
        };

        try
        {
            Client.Connect(SmtpServer, Port, true);
            Client.Authenticate(Username, Password);
            Client.Send(message);
        }
        finally
        {
            Client.Disconnect(true);
        }
    }
}