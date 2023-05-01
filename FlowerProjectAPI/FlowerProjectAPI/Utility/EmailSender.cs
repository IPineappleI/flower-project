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

    public static void SendEmail(string to)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Flower Project", From));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = "Email Verification";
        message.Body = new TextPart("plain")
        {
            Text = "Test"
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