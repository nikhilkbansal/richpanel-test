const moment = require('moment-timezone');
const { Transaction } = require('../transaction/transaction.model');

function numToOrdinal(n) {
  switch (n) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    case 3:
      return '3rd';
    case 4:
      return '4th';
    case 5:
      return '5th';
    default: return '';
  }
}

exports.list = async (req, res, next) => {
  try {
    const transactions = await Transaction.list({ ...req.query });
    console.log('transd', transactions);
    const weeklyData = {};
    transactions.forEach((element) => {
      weeklyData[`${moment(element.createdAt).year()}${moment(element.createdAt).week()}`] = weeklyData[`${moment(element.createdAt).year()}${moment(element.createdAt).week()}`]
        ? [element, ...weeklyData[`${moment(element.createdAt).year()}${moment(element.createdAt).week()}`]] : [element];
    });

    const data = [];
    let monthlyTotal = 0;
    Object.keys(weeklyData).reverse().forEach((element) => {
      const weeklyTotal = weeklyData[element].reduce((x, y) => +x + y.amount, 0);
      const totalWeeks = Math.ceil(moment(element[0].createdAt).endOf('month').date() / 7);
      const currentWeek = Math.ceil(moment(element[0].createdAt).date() / 7);

      if (currentWeek === 1) {
        monthlyTotal = weeklyTotal;
      } else {
        monthlyTotal += weeklyTotal;
      }
      let monthlyMessage = '';
      if (totalWeeks === currentWeek) {
        monthlyMessage = `and this month: ₹${monthlyTotal}`;
      }
      data.push({
        data: weeklyData[element],
        weekDesc: `This week: ₹${weeklyTotal} ${monthlyMessage}`,
      });
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};
