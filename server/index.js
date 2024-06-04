//Expressフレームワークを利用できるようにしている
// このライブラリを使うことで、ウェブサーバーを作れる
const express = require("express");
//　mongooseライブラリをインポート
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("./src/v1/models/user");
// express()を使って新しいアプリケーションを作成、appという変数に代入
const app = express();
//ローカルサーバーを起動するポート番号として5000を設定
const PORT = 5000;
// .env
require("dotenv").config();

//DB接続
try{
    // MONGODBをenvファイルから呼び出し
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DBに接続中・・・");
} catch (error) {
    console.log(error);
}

// ユーザー新規登録API
app.post("/register", async (req, res) => {
    // パスワードの受け取り
    const password = req.body.password;

    try {
        // パスワードの暗号化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);

        // ユーザーの新規作成
        const user = await User.create(req.body);

        // JWTの発行
        const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });
        return res.status(200).json({user, token});

    } catch(err) {
        return res.status(500).json(err);
    }
});

// ユーザーログイン用API

app.listen(PORT, () => {
    console.log("ローカルサーバー起動中・・・");
});