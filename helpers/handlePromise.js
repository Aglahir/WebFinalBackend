module.exports = (req, res, promise) => {
  promise
    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      } else {
        res.statusMessage = "No results";
        return res.status(204).end();
      }
    })
    .catch((err) => {
      res.statusMessage = err.message;
      return res.status(400).end();
    });
};
