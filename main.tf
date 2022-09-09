terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}


resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}



resource "aws_s3_bucket" "s3-bucket-lambda" {
  bucket = "library-manga-bucket"

  tags = {
    Name        = "library-manga-bucket"
    Environment = "Dev"
  }
}


resource "aws_lambda_function" "library-manga-lambda" {
  s3_bucket     = "library-manga-bucket"
  s3_key        = "function.zip"
  function_name = "library-manga-lambda"
  handler       = "index.handler"
  runtime       = "nodejs16.x"
  timeout       = 180
  role          = aws_iam_role.iam_for_lambda.arn
  depends_on = [
    "aws_s3_bucket.s3-bucket-lambda",
  ]
}