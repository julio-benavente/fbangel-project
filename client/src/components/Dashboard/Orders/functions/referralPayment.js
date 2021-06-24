const referralPayment = (users, products, order, setPayments, setOrder) => {
  const thisMonthReferrals = users.filter((user, index) => {
    const hasReferral = Boolean(user.referral);
    const isActive = user.status === "active";
    const isRentalUserType = user.userType === "rental";

    const date = new Date();
    const firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);

    const itsFromLastMonth =
      firstDayLastMonth <= new Date(user.creationDate) && new Date(user.creationDate) <= lastDayLastMonth;
    const referralHasNotBeenPaid = user.referralHasBeenPaid === false;

    return hasReferral && isActive && isRentalUserType && itsFromLastMonth && referralHasNotBeenPaid;
  });

  const product = products.find((product) => product.abrv === "referral");

  const concept = (firstName, lastName) => {
    const concept = `${product.name} : ${firstName} ${lastName[0].toUpperCase()}****`;
    return concept;
  };

  const amount = (userTier) => {
    const tier = product.prices.find((prodcut) => prodcut.tierName === userTier);

    return tier.price;
  };

  const referralPaymentInformation = thisMonthReferrals.map((referral) => {
    const user = users.filter((user) => user.referralCode === referral.referral)[0];

    return {
      id: user ? user._id : 0,
      referenceReferral: referral.referral,
      referenceId: referral._id,
      firstName: user ? user.firstName : "not-found",
      lastName: user ? user.lastName : "not-found",
      email: user ? user.email : "not-found",
      paymentMethod: user ? user.paymentMethod : "not-found",
      concept: concept(referral.firstName, referral.lastName),
      amount: user ? amount(user.payments && user.payments.tier) : 0,
    };
  });

  setPayments(referralPaymentInformation);

  setOrder({
    ...order,
    product: product._id,
    concept: product.name,
    payees: referralPaymentInformation,
  });

  return referralPaymentInformation;
};

export default referralPayment;
