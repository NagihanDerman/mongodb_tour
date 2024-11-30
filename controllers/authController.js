const User = require("../models/userModel");

// ---------- Kaydol ---------------
exports.signUp = async (req, res ) =>{
    try {
        //yeni kullanici olusturma
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password : req.body.password,
            passwordConfirm : req.body.passwordConfirm
        });
        res.status(201).json({
            message :  "hesainiz olusturuldu",
            user : newUser
        })

    } catch (error) {
        res.status(500).json({
            message :  "bir hata olustu",
            error: error.message
        })
        
    }
}
  


 
// ---------- Giriş Yap ---------------
exports.login = async (req, res ) =>{
try {
    res.status(201).json({
        message: "giris yapildiii"
    })
} catch (error) {
    res.status(500).json({
        message: "hata olustu"
    })
    
}
     
}
  

// ---------- Çıkış Yap ---------------
exports.logout = (req, res) => {
  
};


