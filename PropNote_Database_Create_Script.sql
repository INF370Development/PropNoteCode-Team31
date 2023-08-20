USE [master]
GO
-- Check if the database "PropNote" exists
IF DB_ID('PropNote') IS NOT NULL
BEGIN
    -- Drop the database if it exists
    ALTER DATABASE PropNote SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE PropNote;
END
/****** Object:  Database [PropNote]    Script Date: 2023/07/27 11:38:26 ******/
CREATE DATABASE [PropNote]
GO
ALTER DATABASE [PropNote] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PropNote] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PropNote] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PropNote] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PropNote] SET ARITHABORT OFF 
GO
ALTER DATABASE [PropNote] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [PropNote] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PropNote] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PropNote] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PropNote] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PropNote] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PropNote] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PropNote] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PropNote] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PropNote] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PropNote] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PropNote] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PropNote] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PropNote] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PropNote] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PropNote] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PropNote] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PropNote] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [PropNote] SET  MULTI_USER 
GO
ALTER DATABASE [PropNote] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PropNote] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PropNote] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PropNote] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PropNote] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PropNote] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [PropNote] SET QUERY_STORE = OFF
GO
USE [PropNote]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ACCESS](
	[AccessID] [int] IDENTITY(1,1) NOT NULL,
	[AccessName] [varchar](100) NOT NULL,
	[AccessDescription] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN](
	[AdminID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[Name] [varchar](100) NOT NULL,
	[PhoneNumber] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BROKER]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BROKER](
	[BrokerID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Surname] [varchar](100) NOT NULL,
	[PhoneNumber] [varchar](100) NOT NULL,
	[OfficeAddress] [varchar](50) NOT NULL,
	[LicenseNumber] [varchar](100) NOT NULL,
	[CommissionRate] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BrokerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CONTRACTOR]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CONTRACTOR](
	[ContractorID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[ContractorTypeID] [int] NULL,
	[AreaOfBusiness] [varchar](100) NULL,
	[Availability] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ContractorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CONTRACTORTYPE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CONTRACTORTYPE](
	[ContractorTypeID] [int] IDENTITY(1,1) NOT NULL,
	[ContractorTypeName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ContractorTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Correspondance]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CORRESPONDANCE](
	[CorrespondanceID] [int] IDENTITY(1,1) NOT NULL,
	[CorrespondanceName] [varchar](100) NULL,
	[CorrespondanceDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[CorrespondanceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DEPOSIT]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DEPOSIT](
	[DepositID] [int] IDENTITY(1,1) NOT NULL,
	[LeaseID] [int] NOT NULL,
	[Amount] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DepositID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discount]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DISCOUNT](
	[DiscountID] [int] IDENTITY(1,1) NOT NULL,
	[Amount] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[DiscountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Help]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HELP](
	[HelpID] [int] IDENTITY(1,1) NOT NULL,
	[FK_HelpCategoryID] [int] NULL,
	[HelpDescription] [varchar](50) NULL,
	[HelpVideo] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[HelpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HelpCategory]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HELPCATEGORY](
	[HelpCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[HelpCategoryDescription] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[HelpCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LEASE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LEASE](
	[LeaseID] [int] IDENTITY(1,1) NOT NULL,
	[TenantID] [int] NULL,
	[PropertyID] [int] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[MonthlyAmount] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[LeaseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MAINTENANCE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MAINTENANCE](
	[MaintenanceID] [int] IDENTITY(1,1) NOT NULL,
	[PropertyID] [int] NOT NULL,
	[ContractorID] [int] NULL,
	[MaintenanceStatusID] [int] NOT NULL,
	[MaintenanceTypeID] [int] NOT NULL,
	[MaintenanceDate] [date] NOT NULL,
	[MaintenanceTime] [time](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaintenanceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MAINTENANCESTATUS]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MAINTENANCESTATUS](
	[MaintenanceStatusID] [int] IDENTITY(1,1) NOT NULL,
	[MaintenanceStatusName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaintenanceStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MAINTENANCETYPE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MAINTENANCETYPE](
	[MaintenanceTypeID] [int] IDENTITY(1,1) NOT NULL,
	[MaintenanceTypeName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaintenanceTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MAINTENANCENOTE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MAINTENANCENOTE](
	[MaintenanceNoteID] [int] IDENTITY(1,1) NOT NULL,
	[MaintenanceID] [int] NOT NULL,
	[MaintenanceNoteDescription] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaintenanceNoteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MAINTENANCEPROPERTYLINE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MAINTENANCEPROPERTYLINE](
	[PropertyID] [int] NOT NULL,
	[MaintenanceID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PropertyID] ASC,
	[MaintenanceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MEETING]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEETING](
	[MeetingID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[Date] [date] NOT NULL,
	[Time] [time](7) NOT NULL,
	[MeetingType] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MeetingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MEETINGMEMBERLINE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEETINGMEMBERLINE](
	[MeetingMemberID] [int] NOT NULL,
	[MeetingID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MeetingMemberID] ASC,
	[MeetingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MEMBER]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEMBER](
	[MeetingMemberID] [int] IDENTITY(1,1) NOT NULL,
	[MeetingMember] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MeetingMemberID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NOTIFICATION]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOTIFICATION](
	[NotificationID] [int] IDENTITY(1,1) NOT NULL,
	[NotificationTypeID] [int] NOT NULL,
	[ScheduleID] [int] NOT NULL,
	[ReccurenceTypeID] [int] NOT NULL,
	[NotificationName] [varchar](50) NOT NULL,
	[NotificationDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NotificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NOTIFICATIONTYPE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOTIFICATIONTYPE](
	[NotificationTypeID] [int] IDENTITY(1,1) NOT NULL,
	[NotificationTypeDescription] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NotificationTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROBLEM]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROBLEM](
	[ProblemID] [int] IDENTITY(1,1) NOT NULL,
	[PropertyID] [int] NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[TenantID] [int] NOT NULL,
	[CorrespondanceID] [int] NOT NULL,
	[ProblemStatusID] [int] NOT NULL,
	[ProblemSubject] [varchar](100) NULL,
	[ProblemDescription] [varchar](max) NULL,
	[ProblemDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProblemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProblemPhoto]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROBLEMPHOTO](
	[ProblemPhotoID] [int] IDENTITY(1,1) NOT NULL,
	[ProblemPhotoTitle] [varchar](100) NULL,
	[ProblemPhotoURL] [varchar](max) NULL,
	[ProblemPhotoDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProblemPhotoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProblemStatus]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROBLEMSTATUS](
	[ProblemStatusID] [int] NOT NULL,
	[ProblemStatusName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ProblemStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProblemVideo]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROBLEMVIDEO](
	[ProblemVideoID] [int] NOT NULL,
	[ProblemVideoTitle] [varchar](100) NULL,
	[ProblemVideoURL] [varchar](max) NULL,
	[ProblemVideoDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProblemVideoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROBLEMVIDEOLINE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROBLEMVIDEOLINE](
	[ProblemID] [int] NOT NULL,
	[ProblemVideoID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProblemID] ASC,
	[ProblemVideoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROBLEMPHOTOLINE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROBLEMPHOTOLINE](
	[ProblemID] [int] NOT NULL,
	[ProblemPhotoID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProblemID] ASC,
	[ProblemPhotoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROPERTY]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROPERTY](
	[PropertyID] [int] IDENTITY(1,1) NOT NULL,
	[BrokerID] [int] NULL,
	[PropertyStatusID] [int] NULL,
	[Description] [varchar](100) NULL,
	[BuildingNumber] [int] NULL,
	[Street] [varchar](100) NULL,
	[Suburb] [varchar](100) NULL,
	[PurchaseAmount] [int] NULL,
	[PurchaseYear] [date] NULL,
	[Size] [varchar](100) NULL,
	[Yard] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[PropertyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROPERTYIMAGE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROPERTYIMAGE](
	[PropertyImageID] [int] IDENTITY(1,1) NOT NULL,
	[PropertyID] [int] NOT NULL,
	[PropertyImageURL] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[PropertyImageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROPERTYSTATUS]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROPERTYSTATUS](
	[PropertyStatusID] [int] IDENTITY(1,1) NOT NULL,
	[PropertyStatusName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[PropertyStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SNAGLISTITEM]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SNAGLISTITEM](
	[SnagListItemID] [int] IDENTITY(1,1) NOT NULL,
	[SnagListItemDescription] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[SnagListItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SNAGLIST]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SNAGLIST](
	[SnagListID] [int] IDENTITY(1,1) NOT NULL,
	[PropertyID] [int] NOT NULL,
	[SnagListDescription] [varchar](100) NULL,
	[SnagListCreated] [date],
	[SnagListModified] [date],
PRIMARY KEY CLUSTERED 
(
	[SnagListID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SNAGLISTITEMLINE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SNAGLISTITEMLINE](
	[SnagListID] [int] NOT NULL,
	[SnagListItemID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SnagListID] ASC,
	[SnagListItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[[RECCURENCEITEMTYPE]]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RECCURENCEITEMTYPE](
	[ReccurenceTypeID] [int] IDENTITY(1,1) NOT NULL,
	[ReccurenceTypeDescription] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ReccurenceTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ROLE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ROLE](
	[UserRoleID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserRoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCHEDULE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE](
	[ScheduleID]  [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[ScheduleDescription] [varchar](50) NULL,
	[ScheduleDate] [date] NULL,
	[ScheduleTime] [time](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[ScheduleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TENANT]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TENANT](
	[TenantID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[CompanyName] [varchar](100) NULL,
	[CompanyNumber] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TenantID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EMPLOYEE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EMPLOYEE](
	[EmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[JobTitle] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAccess]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERACCESS](
	[UserRoleID] [int] NOT NULL,
	[AccessID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserRoleID] ASC,
	[AccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USERMEETING]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERMEETING](
	[UserID] [int] NOT NULL,
	[MeetingID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[MeetingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USERROLE]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERROLE](
	[UserRoleID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserRoleID] ASC,
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USER]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](255) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[ProfilePhoto] [varchar](max) NULL,
	[Email] [varchar](255) NOT NULL,
	[Name] [varchar](255) NULL,
	[Surname] [varchar](255) NULL,
	[PhoneNumber] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VAT]    Script Date: 2023/07/27 11:38:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VAT](
	[VATID] [int] NOT NULL,
	[Percentage] [varchar](5) NULL,
	[Date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[VATID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ADMIN] WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[USER] ([UserID])
GO
ALTER TABLE [dbo].[CONTRACTOR]  WITH CHECK ADD FOREIGN KEY([ContractorTypeID])
REFERENCES [dbo].[CONTRACTORTYPE] ([ContractorTypeID])
GO
ALTER TABLE [dbo].[CONTRACTOR]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[USER] ([UserID])
GO
ALTER TABLE [dbo].[DEPOSIT]  WITH CHECK ADD FOREIGN KEY([LeaseID])
REFERENCES [dbo].[LEASE] ([LeaseID])
GO
ALTER TABLE [dbo].[HELP]  WITH CHECK ADD FOREIGN KEY([FK_HelpCategoryID])
REFERENCES [dbo].[HELPCATEGORY] ([HelpCategoryID])
GO
ALTER TABLE [dbo].[LEASE]  WITH CHECK ADD FOREIGN KEY([PropertyID])
REFERENCES [dbo].[PROPERTY] ([PropertyID])
GO
ALTER TABLE [dbo].[LEASE]  WITH CHECK ADD FOREIGN KEY([TenantID])
REFERENCES [dbo].[TENANT] ([TenantID])
GO
ALTER TABLE [dbo].[NOTIFICATION] WITH CHECK ADD FOREIGN KEY([ScheduleID])
REFERENCES [dbo].[SCHEDULE] ([ScheduleID])
GO
ALTER TABLE [dbo].[NOTIFICATION]  WITH CHECK ADD FOREIGN KEY([ReccurenceTypeID])
REFERENCES [dbo].[RECCURENCEITEMTYPE] ([ReccurenceTypeID])
GO
ALTER TABLE [dbo].[NOTIFICATION]  WITH CHECK ADD FOREIGN KEY([NotificationTypeID])
REFERENCES [dbo].[NOTIFICATIONTYPE] ([NotificationTypeID])
GO
ALTER TABLE [dbo].[MEETINGMEMBERLINE]  WITH CHECK ADD FOREIGN KEY([MeetingMemberID])
REFERENCES [dbo].[MEMBER] ([MeetingMemberID])
GO
ALTER TABLE [dbo].[MEETINGMEMBERLINE]  WITH CHECK ADD FOREIGN KEY([MeetingID])
REFERENCES [dbo].[MEETING] ([MeetingID])
GO
ALTER TABLE [dbo].[PROPERTY]  WITH CHECK ADD FOREIGN KEY([BrokerID])
REFERENCES [dbo].[BROKER] ([BrokerID])
GO
ALTER TABLE [dbo].[PROPERTY]  WITH CHECK ADD FOREIGN KEY([PropertyStatusID])
REFERENCES [dbo].[PROPERTYSTATUS] ([PropertyStatusID])
GO
ALTER TABLE [dbo].[PROPERTYIMAGE]  WITH CHECK ADD FOREIGN KEY([PropertyID])
REFERENCES [dbo].[PROPERTY] ([PropertyID])
GO
ALTER TABLE [dbo].[TENANT]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[USER] ([UserID])
GO
ALTER TABLE [dbo].[USERACCESS]  WITH CHECK ADD FOREIGN KEY([AccessID])
REFERENCES [dbo].[ACCESS] ([AccessID])
GO
ALTER TABLE [dbo].[USERACCESS]  WITH CHECK ADD FOREIGN KEY([UserRoleID])
REFERENCES [dbo].[ROLE] ([UserRoleID])
GO
ALTER TABLE [dbo].[USERMEETING]  WITH CHECK ADD FOREIGN KEY([MeetingID])
REFERENCES [dbo].[MEETING] ([MeetingID])
GO
ALTER TABLE [dbo].[USERMEETING]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[USER] ([UserID])
GO
ALTER TABLE [dbo].[USERROLE]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[USER] ([UserID])
GO
ALTER TABLE [dbo].[USERROLE]  WITH CHECK ADD FOREIGN KEY([UserRoleID])
REFERENCES [dbo].[ROLE] ([UserRoleID])
GO
ALTER TABLE [dbo].[PROBLEMVIDEOLINE]  WITH CHECK ADD FOREIGN KEY([ProblemID])
REFERENCES [dbo].[PROBLEM] ([ProblemID])
GO
ALTER TABLE [dbo].[PROBLEMVIDEOLINE]  WITH CHECK ADD FOREIGN KEY([ProblemVideoID])
REFERENCES [dbo].[PROBLEMVIDEO] ([ProblemVideoID])
GO
ALTER TABLE [dbo].[PROBLEMPHOTOLINE]  WITH CHECK ADD FOREIGN KEY([ProblemID])
REFERENCES [dbo].[PROBLEM] ([ProblemID])
GO
ALTER TABLE [dbo].[PROBLEMPHOTOLINE]  WITH CHECK ADD FOREIGN KEY([ProblemPhotoID])
REFERENCES [dbo].[PROBLEMPHOTO] ([ProblemPhotoID])
GO
ALTER TABLE [dbo].[PROBLEM]  WITH CHECK ADD FOREIGN KEY([TenantID])
REFERENCES [dbo].[TENANT] ([TenantID])
GO
ALTER TABLE [dbo].[PROBLEM]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[EMPLOYEE] ([EmployeeID])
GO
ALTER TABLE [dbo].[PROBLEM]  WITH CHECK ADD FOREIGN KEY([PropertyID])
REFERENCES [dbo].[PROPERTY] ([PropertyID])
GO
ALTER TABLE [dbo].[PROBLEM]  WITH CHECK ADD FOREIGN KEY([CorrespondanceID])
REFERENCES [dbo].[CORRESPONDANCE] ([CorrespondanceID])
GO
ALTER TABLE [dbo].[PROBLEM]  WITH CHECK ADD FOREIGN KEY([ProblemStatusID])
REFERENCES [dbo].[PROBLEMSTATUS] ([ProblemStatusID])
GO
ALTER TABLE [dbo].[EMPLOYEE]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[USER] ([UserID])
GO
ALTER TABLE [dbo].[MAINTENANCEPROPERTYLINE]  WITH CHECK ADD FOREIGN KEY([MaintenanceID])
REFERENCES [dbo].[MAINTENANCE] ([MaintenanceID])
GO
ALTER TABLE [dbo].[MAINTENANCEPROPERTYLINE]  WITH CHECK ADD FOREIGN KEY([PropertyID])
REFERENCES [dbo].[PROPERTY] ([PropertyID])
GO
ALTER TABLE [dbo].[MAINTENANCE]  WITH CHECK ADD FOREIGN KEY([ContractorID])
REFERENCES [dbo].[CONTRACTOR] ([ContractorID])
GO
ALTER TABLE [dbo].[MAINTENANCE]  WITH CHECK ADD FOREIGN KEY([MaintenanceStatusID])
REFERENCES [dbo].[MAINTENANCESTATUS] ([MaintenanceStatusID])
GO
ALTER TABLE [dbo].[MAINTENANCE]  WITH CHECK ADD FOREIGN KEY([MaintenanceTypeID])
REFERENCES [dbo].[MAINTENANCETYPE] ([MaintenanceTypeID])
GO
ALTER TABLE [dbo].[MAINTENANCENOTE]  WITH CHECK ADD FOREIGN KEY([MaintenanceID])
REFERENCES [dbo].[MAINTENANCE] ([MaintenanceID])
GO
ALTER TABLE [dbo].[SNAGLISTITEMLINE]  WITH CHECK ADD FOREIGN KEY([SnagListItemID])
REFERENCES [dbo].[SNAGLISTITEM] ([SnagListItemID])
GO
ALTER TABLE [dbo].[SNAGLISTITEMLINE]  WITH CHECK ADD FOREIGN KEY([SnagListID])
REFERENCES [dbo].[SNAGLIST] ([SnagListID])
GO
ALTER TABLE [dbo].[SNAGLIST]  WITH CHECK ADD FOREIGN KEY([PropertyID])
REFERENCES [dbo].[PROPERTY] ([PropertyID])
GO
ALTER TABLE [dbo].[SCHEDULE]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[USER] ([UserID])
GO
USE [master]
GO
ALTER DATABASE [PropNote] SET  READ_WRITE 
GO
