# Some nice examples with NodeJS

For installing the dependencies run

```language=shell
npm install
```

You can configure your gulp tasks by editing the gulpfile.js

By default running

```language=shell
gulp
```

Will run the default task that consists in downloading and uploading a file corresponding to one day before, sequencialy.

When executed with command line parameter <b>daysBefore</b>, like this

```language=shell
gulp --daysBefore 2
```

it will do it for the file corresponding to the day before yesterday.

To run the examples individually, first pass through the prerequisites and, finally, after setting up credentials and
all the needed authentication steps, do

```language=shell
node file_name.js
```

## Download file from FTP

Just a simple working example showing FTP file download with ftp-client

## Connect to MySQL DB (Amazon RDS) and query it and then do something with the results

Just a simple working example showing MySQL DB query.

I needed to construct a local folder structure to reflect the hierarchy of some entities
(e.g. images of products belonging to restaurants in specific cities in some countries) stored in the DB

## Upload files to GDrive using the Google Drive API (OAuth2 client)

Prerequisites:

https://developers.google.com/drive/v3/web/quickstart/nodejs

The sample is uploding a spreadsheet type doc following the examples from:

https://github.com/google/google-api-nodejs-client/#example-specifying-default-service-client-query-parameters

## Get AWS S3 stored image dimensions and list your buckets

Prerequisites:

Get the secret keys from AMAZON and store it in local ~/.aws/credentials file:
http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html

## Solve Christmas Tree Drawing problem

Given a number n, smaller than a maximum admitted number, draw a Christmas Tree with '#' symbols having the pattern show in the below image


![Alt Christmas Tree Sample For n = 6](img/tree.png?raw=true "Christmas Tree Pattern")

To run it simply put:

```language=shell
gulp drawChristmasTree --maxNumber 150 --n 6
```

