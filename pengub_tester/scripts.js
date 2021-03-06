var environments = []

function createUID() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
}

function generatePaymentData() {
  var lang = $( "#languageSelect").val();
  var action_url = "https://betala.ub.gu.se/Koha/Payment?language=";
  var action_url = action_url + lang;
  var UID = createUID();
  var env = $( "#environmentSelect" ).val();
  var return_url = environments[env].return_url + "?language=" + (lang === "sv-SE" ? "sv-SE" : "en");
  var callback_url = environments[env].callback_url
  var paymentsArray  = JSON.parse($( "#paymentsArray" ).val());

  var paymentData = {
    uid: UID,
    language: lang,
    return_url: return_url,
    callback_url: callback_url,
    payments: paymentsArray
  };

  $( "#paymentData" ).val(JSON.stringify(paymentData));
  $( "#paymentDataForm" ).attr("action", action_url);

}


$( document ).ready(function() {

  var paymentsArrayTemplate = [
    {
      account_id: 99999,
      amount: 200.00,
      library_group: "Gpek",
      text: "",
      title: "Forskningsmetodikens grunder",
      debit_type: "media",
      debit_title: "Förseningsavgift"
    }
  ];

  $( "#paymentsArray" ).val(JSON.stringify(paymentsArrayTemplate));

  environments.push(
    {
      return_url: "https://koha-lab.ub.gu.se",
      callback_url: "https://koha-lab.ub.gu.se/cgi-bin/koha/svc/onlinepayment"
    },
    {
      return_url: "https://minalan.ub.gu.se",
      callback_url: "https://koha-intra.ub.gu.se/cgi-bin/koha/svc/onlinepayment"
    }
  );
});
