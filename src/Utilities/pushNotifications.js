const fetch = require("node-fetch");

const pushNotification = (fcm_tokens,mobileNumber, callback) => {
  var notification = {
    title: "test notification",
    text: "test notification text",
  };

  var notification_body = {
    notification: notification,
    registration_ids: fcm_tokens,
  };

  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "BH-JvbzTTaUymkesd9YO-bqjFLjhGrAKNdzq9IZc33hc36kmsSBsq7kafDYoIG-61yofGpN5uhOM4oCf4c0rWB0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification_body),
  })
    .then(() => {
        callback(null, `${mobileNumber} added post just now`);
    })
    .catch((err) => {
        callback(err, null);

    });
};

module.exports = pushNotification;
