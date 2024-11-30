const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");



// Kullanıcı Şeması
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Kullanıcı isim değerine sahip olmalıdır"],
    minLength: [3, "Kullanıcı ismi en az 3 karakter olmalı"],
    maxLength: [30, "Kullanıcı ismi en fazla 30 karakter olabilir"],
  },

  email: {
    type: String,
    required: [true, "Kullanıcı email değerine sahip olmalıdır"],
    unique: [true, "Bu eposta adresine kayıt kullanıcı zaten var"],
    validate: [validator.isEmail, "Lütfen geçerli bir mail giriniz"],
  },

  photo: {
    type: String,
    default: "defaultpic.webp",
  },

  password: {
    type: String,
    required: [true, "Kullanıcı şifreye sahip olmalıdır"],
    minLength: [8, "Şifre en az 8 karakter olmalı"],
    validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
  },

  passwordConfirm: {
    type: String,
    required: [true, "Lütfen şifrenizi onaylayın"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Onay şifreniz eşleşmiyorr",
    },
  },

  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },

  active: {
    type: Boolean,
    default: true,
  },

 
});


const User = mongoose.model("User", userSchema);

module.exports = User;



