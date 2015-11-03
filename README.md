# Wistia Uploader

## Use

`npm start` or `npm run start`or `node server/index.js`


## TODO

Created a directive called `fileUpload (fileUpload.directive.js)`, which has a controller for controlling the state of the video. When user upload a video file, it is in `queue` state, so it can not reproduce until their status is `ready`. 

**Wistia** has an [API](http://wistia.com/doc/player-api) for this, but as the file upload is done by `blueimp-file-upload`, polling has been made, asking Wistia API, until the state ready. The `GET` request to get the status of the video is done in the `UploadService (fileUpload.service.js)`, and the polling is done in the controller that directive.

For vendors, NPM has been used, although it could have been used with bower without any problem.

The scaffolding of the application is specific to this exercise, although it could have used another component-based, or models.
