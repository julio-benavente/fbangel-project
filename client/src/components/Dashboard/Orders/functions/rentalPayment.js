const rentalPayment = (fortnightPeriod, users, products, order, setPayments, setOrder) => {
  const fortnightUsers = users.filter((user, index) => {
    const userType = user.userType === "rental";
    const status = user.status === "active";
    const period = user.fortnight === fortnightPeriod;

    return userType && status && period;
  });

  const product = products.find((product) => product.abrv === "rental");

  const concept = () => {
    const months = {
      1: "JAN",
      2: "FEB",
      3: "MAR",
      4: "APR",
      5: "MAY",
      6: "JUN",
      7: "JULY",
      8: "AUG",
      9: "SET",
      10: "OCT",
      11: "NOV",
      12: "DEC",
    };
    const [month, year] = [new Date().getMonth(), new Date().getFullYear()];
    const concept = `${product.name} : ${months[month + 1]}-${year} (${fortnightPeriod}) `;
    return concept;
  };

  const amount = (userTier) => {
    const tier = product.prices.find((prodcut) => prodcut.tierName === userTier);
    return tier.price;
  };

  const paymentsInfo = fortnightUsers.map((user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    paymentMethod: user.paymentMethod,
    concept: concept(),
    amount: amount(user.payments.tier),
  }));

  setPayments(paymentsInfo);
  setOrder({
    ...order,
    product: product._id,
    concept: concept(),
    payees: paymentsInfo,
  });
  return paymentsInfo;
};

export default rentalPayment;
