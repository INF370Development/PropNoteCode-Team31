using SendGrid.Helpers.Mail;
using SendGrid;

namespace WebApi.Helpers
{
    public class EmailHelper
    {
        private IConfiguration configuration = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json")
           .Build();

        public async void SendEmail(string userName, string userEmailAddress, string userPassword, string name)
        {
            try
            {
                var apiKey = configuration["SendGrid:ApiKey"];
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("propnotea@gmail.com", "PropNote Admin");
                var subject = "PropNote Account";
                var to = new EmailAddress(userEmailAddress, name);
                var plainTextContent = "This is where the body would be.";
                var htmlContent = "Good day " + name + "<br /><br /> This is an auto generated email from the PropNote System"
                       + "<br /><br />" + "Please login to our system with the below details in order to setup your profile" + "<br /><br />" + "UserName:" + userName +
                       "<br /><br />" + "Password:" + userPassword + "<br /><br /> Regards<br />PropNote Team <br /><br />" +
                       " If the issue is not resolved, call our customer care line on (011)869 2980";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);

                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send email. Error: " + ex.Message);
            }
        }
    }
}