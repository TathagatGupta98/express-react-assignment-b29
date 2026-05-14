const getPuzzle = (req, res) => {
    res.status(200).send("Here is your puzzle");
};

const getPuzzleAnswer = (req, res) => {
    res.status(200).send("Here is your puzzle answer");
};

export { getPuzzle, getPuzzleAnswer };