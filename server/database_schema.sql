-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `country` VARCHAR(100),
  `requirement` TEXT,
  `source_page` VARCHAR(255),
  `ip_address` VARCHAR(45),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create buyer_inquiries table
CREATE TABLE IF NOT EXISTS `buyer_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(255) NOT NULL,
  `contact_person` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `country` VARCHAR(100),
  `product_category` VARCHAR(255),
  `quantity` VARCHAR(100),
  `requirements` TEXT,
  `ip_address` VARCHAR(45),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create manufacturer_inquiries table
CREATE TABLE IF NOT EXISTS `manufacturer_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(255) NOT NULL,
  `contact_person` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `country` VARCHAR(100),
  `product_category` VARCHAR(255),
  `production_capacity` VARCHAR(100),
  `requirements` TEXT,
  `ip_address` VARCHAR(45),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;