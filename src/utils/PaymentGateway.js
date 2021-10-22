import axios from "axios";

export default async function displayRazorpay(
  dietType,
  packageDetails,
  values
) {
  const res = await axios.post("http://localhost:8000/razorpay", {
    diettype: dietType,
    type: packageDetails.type,
    meal: packageDetails.meal,
    days: packageDetails.days,
  });

  const data = res.data;

  const options = {
    // eslint-disable-next-line no-undef
    key: "rzp_live_51j7GVKuutdtKk",
    currency: data.currency,
    amount: data.amount,
    name: "Learn Code Online",
    description: "Wallet Transaction",
    image: "http://localhost:8000/logo.svg",
    order_id: data.id,
    handler: function (response) {
      alert("PAYMENT ID ::" + response.razorpay_payment_id);
      alert("ORDER ID :: " + response.razorpay_order_id);
    },
    prefill: {
      name: values.name,
      email: values.email,
      contact: values.phone,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
