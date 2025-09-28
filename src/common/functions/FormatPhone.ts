export const formatPhoneBR = (value: string) => {
  let phone = value.replace(/\D/g, "");

  phone = phone.substring(0, 11);

  if (phone.length > 6) {
    return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, "($1) $2$3-$4");
  } else if (phone.length > 2) {
    return phone.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  } else {
    return phone.replace(/(\d*)/, "($1");
  }
};