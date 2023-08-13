using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using MimeKit;
using System.Net.Mail;
using System.Net;
using System.Security;
using System.Net.Sockets;
using Google.Apis.Util.Store;
using SendGrid.Helpers.Mail;
using static System.Net.Mime.MediaTypeNames;

namespace WebApi.Helpers
{
    public class EmailHelper
    {
        public void SendEmail(string userName, string userEmailAddress, string userPassword, string name)
        {
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
    }
}