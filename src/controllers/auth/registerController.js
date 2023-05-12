const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Verifica campos obrigatórios
        const requiredFields = ['first_name', 'last_name', 'email', 'password'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length) {
            return res.status(400).send(`Campos obrigatorios faltando: ${missingFields.join(', ')}`);
        }

        if (password.length < 6) {
            return res.status(400).send('Senha deve ter pelo menos 6 caracteres');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send('Formato do email invalido.');
        }

        // Verifica se o usuario ja existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('Usuario ja cadastrado, porfavor faça o login');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: '2h' }
        );

        // Salva o token
        user.token = token;
        await user.save();

        res.status(201).send('Usuario cadastrado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Houve um erro ao cadastrar o usuario');
    }
};

module.exports = { register };