using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using MimeKit;
using System.Net.Mail;
using System.Net;
using System.Security;
using System.Net.Sockets;

namespace WebApi.Helpers
{
    public class EmailHelper
    {
        public void SendEmail(string userName, string userEmailAddress, string userPassword, string name)
        {
            Test();
            try
            {
                string smtpServer = "smtp.mail.yahoo.com";
                int smtpPort = 587; // Replace with the appropriate port number

                string systemEmail = "propnotea@​yahoo.com";
                SecureString emailPassword = new SecureString();
                foreach (char c in "INF3702023") // Replace with the actual password
                {
                    emailPassword.AppendChar(c);
                }

                using (SmtpClient client = new SmtpClient(smtpServer, smtpPort))
                {
                    client.EnableSsl = true; // Enable SSL/TLS encryption
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(systemEmail, emailPassword);

                    string subject = "PropNote Account";
                    string body = "Good day " + name + "<br /><br /> This is an auto generated email from the PropNote System"
                       + "<br /><br />" + "Please login to our system with the below details in order to setup your profile" + "<br /><br />" + "UserName:" + userName +
                       "<br /><br />" + "Password:" + userPassword + "<br /><br /> Regards<br />PropNote Team <br /><br />" +
                       " If the issue is not resolved, call our customer care line on (011)869 2980";

                    using (MailMessage mailMessage = new MailMessage(systemEmail, userEmailAddress, subject, body))
                    {
                        mailMessage.IsBodyHtml = true; // Set this to true if the body contains HTML content

                        // You can also add attachments if needed
                        // Attachment attachment = new Attachment("attachment_path");
                        // mailMessage.Attachments.Add(attachment);

                        client.Send(mailMessage);
                    }
                }

                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send email. Error: " + ex.Message);
            }
        }

        public void Test()
        {
            string serverAddress = "smtp.mail.yahoo.com";
            int port = 587; // Replace with the port you want to test

            bool isPortReachable = TestServerConnection(serverAddress, port);

            if (isPortReachable)
            {
                Console.WriteLine($"The port {port} on {serverAddress} is reachable.");
            }
            else
            {
                Console.WriteLine($"The port {port} on {serverAddress} is not reachable or blocked.");
            }
        }

        public static bool TestServerConnection(string serverAddress, int port)
        {
            try
            {
                using (TcpClient client = new TcpClient())
                {
                    // Set a short timeout (e.g., 2 seconds) for the connection attempt
                    client.ReceiveTimeout = 2000;
                    client.SendTimeout = 2000;

                    // Connect to the server
                    client.Connect(serverAddress, port);

                    // If the connection is successful, the port is reachable
                    return true;
                }
            }
            catch (Exception)
            {
                // If any exception occurs, the port is not reachable
                return false;
            }
        }
    }
}