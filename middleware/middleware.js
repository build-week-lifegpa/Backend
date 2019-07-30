module.exports = {
    validateCategory: function (req, res, next) {
        const categoryInfo = req.body;
        if (
            categoryInfo.category_name === undefined ||
            categoryInfo.user_id === undefined
        ) {
            return res.status(400).json({ errorMessage: "Please provide category name and user id." });
        } else {
            next();
        }
    }

    
}
