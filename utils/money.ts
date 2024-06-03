export function changeMoney(amount: number): string {
  if (amount < 1000000) {
    return `${amount.toLocaleString()} dong`;
  } else if (amount < 10000000) {
    const kValue = (amount / 1000).toFixed(1);
    return `${kValue}k dong`;
  } else {
    const mValue = (amount / 1000000).toFixed(1);
    return `${mValue}M dong`;
  }
}

export function convertMoneyToVndText(money: number | undefined): string {
  if (!money) return "Miễn phí ";
  if (money < 1000000) {
    return Math.ceil(money).toLocaleString() + " VNĐ";
  } else if (money < 1000000000) {
    const millions = Math.floor(money / 1000000);
    const remainder = money % 1000000;
    if (remainder === 0) {
      return `${millions}tr`;
    } else {
      const thousands = Math.floor(remainder / 1000);
      return `${millions}tr${thousands !== 0 ? `${thousands}` : ""}`;
    }
  } else {
    return `${money}`;
  }
}
