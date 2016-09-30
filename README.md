# Some nice examples with NodeJS

For installing the dependencies run

npm install

You can configure your gulp tasks by editing the gulpfile.js

By default running

gulp

Will run the default task that consists in downloading and uploading a file, sequencialy.

To tun the examples individually, first pass through the prerequisites and, finally, after setting up credentials and
all the needed authentication steps, do

node file_name.js

## Download file from FTP

Just a simple working example showing FTP file download with ftp-client

## Upload files to GDrive using the Google Drive API (OAuth2 client)

Prerequisites:

https://developers.google.com/drive/v3/web/quickstart/nodejs

The sample is uploding a spreadsheet type doc following the examples from:

https://github.com/google/google-api-nodejs-client/#example-specifying-default-service-client-query-parameters

## Get AWS S3 stored image dimensions and list your buckets

Prerequisites:

Get the secret keys from AMAZON and store it in local ~/.aws/credentials file:
http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html


