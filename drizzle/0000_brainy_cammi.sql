CREATE TABLE `applications` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`job_id` varchar(36) NOT NULL,
	`applicant_id` varchar(36) NOT NULL,
	`cover_letter` varchar(1000),
	`resume_url` varchar(255),
	`status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employers` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`company_bio` varchar(255),
	`company_website` varchar(255),
	`location` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `employers_id` PRIMARY KEY(`id`),
	CONSTRAINT `employers_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`employer_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`requirements` varchar(1000) NOT NULL,
	`description` varchar(1000) NOT NULL,
	`location` varchar(255),
	`salary_range` varchar(100),
	`job_type` enum('full-time','part-time','contract','internship') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`role` enum('employer','applicant','admin') NOT NULL DEFAULT 'applicant',
	`phone_number` varchar(20),
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
