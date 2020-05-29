module.exports = (user_id) => {
  var data = [];
  var value1 = 500;
  var value2 = 600;

  for (var i = 0; i < 12; i++) {
    let date = new Date();
    date.setMonth(i, 1);
    value1 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
    value2 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
    data.push({
      user_id: user_id,
      date: date,
      income: value1,
      expense: value2,
    });
  }
  return data;
};
