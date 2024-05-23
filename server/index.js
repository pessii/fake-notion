//Expressフレームワークを利用できるようにしている
// このライブラリを使うことで、ウェブサーバーを作れる
const express = require("express");
//　mongooseライブラリをインポート
const mongoose = require("mongoose");
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

// ユーザーログイン用API

app.listen(PORT, () => {
    console.log("ローカルサーバー起動中・・・");
});