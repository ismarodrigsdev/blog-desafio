const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send('Formato do email invalido.');
        }

        // Verifica se o usuario existe no banco
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("Usuario não registrado");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).send("Senha incorreta");
        }

        // Cria e salva o token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        await user.save();

        res.status(200).json(token);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
module.exports = { login };