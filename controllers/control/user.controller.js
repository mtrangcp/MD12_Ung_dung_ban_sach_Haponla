var myModel = require('../../models/bookStore.model');

exports.getListUser = async (req, res, next) => {

    let dk_loc = null;
    if (typeof (req.query.username) != 'undefined') {
        dk_loc = { username: req.query.username };
    }
    console.log(dk_loc);

    var list = await myModel.userModel.find(dk_loc);
    var soluong = list.length;

    res.render('users/listUser', { listUsers: list, soluong: soluong });
}

exports.banUser = async (req, res, next) => {

    let msg = "";
    let iduser = req.params.iduser;
    let objUser = await myModel.userModel.findById(iduser);

    if (req.method == "POST") {
        if (objUser != null) {
            objUser.active = false;
            await objUser.save();

            msg = 'Đã ban người dùng thành công!';
        } else {
            msg = " User không tồn tại!"
        }
    }

    res.render('users/banUser', { msg: msg, objUser: objUser });
}

exports.unbanUser = async (req, res, next) => {

    let msg = "";
    let iduser = req.params.iduser;
    let objUser = await myModel.userModel.findById(iduser);

    if (req.method == "POST") {
        if (objUser != null) {
            objUser.active = true;
            await objUser.save();

            msg = 'Đã unban người dùng thành công!';
        } else {
            msg = " User không tồn tại!"
        }
    }

    res.render('users/unbanUser', { msg: msg, objUser: objUser });
}

exports.login = async (req, res, next) => {

    let msg = "";
    if (req.method == 'POST') {
        try {
            let objUser = await myModel.userModel.findOne({ username: req.body.username });
            console.log(objUser);

            if (objUser != null) {
                if (objUser.passwork == req.body.Pass) {
                    if (objUser.role == "ADMIN") {
                        msg = 'Đăng nhập thành công!';
                        req.session.userLogin = objUser;
                        return res.redirect('/users');
                    } else {
                        msg = 'Bạn không có quyền đăng nhập!';
                    }

                } else {
                    msg = 'Sai password!';
                }

            } else {
                msg = 'Không tồn tại user ' + req.body.username;
            }

        } catch (error) {
            msg = error.message;
            console.log(error);
        }
    }
    res.render('users/login', { msg: msg })
}

exports.logout = async (req, res, next) => {
    let msg = "";
    if (req.method == 'POST') {
        try {
            let objUser = await myModel.userModel.findOne({ username: req.body.username });
            console.log(objUser);

            if (objUser != null) {
                if (objUser.password == req.body.Pass) {
                    // req.session.userLogin = objUser; 
                    sessionStorage.removeItem(objUser.username);
                    console.log("da logout");

                    return res.redirect('/users');
                } else {
                    msg = 'Sai password';
                }

            } else {
                msg = 'Không tồn tại user ' + req.body.username;

            }

        } catch (error) {
            msg = error.message;
        }
    }

    res.render('users/login', { msg: msg })
}


