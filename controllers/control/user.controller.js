var myModel = require('../../models/bookStore.model');

exports.getListUser = async (req, res, next) => {

    let dk_loc = { role: "USER" };
    if (typeof (req.query.username) != 'undefined') {
        dk_loc = { username: req.query.username };
    }
    console.log(dk_loc);

    var list = await myModel.userModel.find(dk_loc);
    var soluong = list.length;

    res.render('users/listUser', { listUsers: list, soluong: soluong });
}

// loc theo username
exports.getListUserThapcao = async (req, res, next) => {

    let dk_loc = { role: "USER" };
    if (typeof (req.query.username) != 'undefined') {
        dk_loc = { username: req.query.username, role: "USER" };
    }
    console.log(dk_loc);

    var list = await myModel.userModel.find(dk_loc).sort({ username: 1 });
    var soluong = list.length;

    res.render('users/listUser', { listUsers: list, soluong: soluong });
}

exports.getListUserCaoThap = async (req, res, next) => {

    let dk_loc = { role: "USER" };
    if (typeof (req.query.username) != 'undefined') {
        dk_loc = { username: req.query.username, role: "USER" };
    }
    console.log(dk_loc);

    var list = await myModel.userModel.find(dk_loc).sort({ username: -1 });
    var soluong = list.length;

    res.render('users/listUser', { listUsers: list, soluong: soluong });
}

exports.getAdmin = async (req, res, next) => {

    let dk_loc = { role: "ADMIN" };
    console.log(dk_loc);
    var objAdmin = await myModel.userModel.findOne(dk_loc);

    res.render('users/admin', { objAdmin: objAdmin });
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

exports.chiTietUser = async (req, res, next) => {

    let iduser = req.params.iduser;

    let objUser = await myModel.userModel.findById(iduser);


    res.render('users/chitietUser', { objUser: objUser });
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

exports.editAdmin = async (req, res, next) => {

    let msg = "";
    let idadmin = req.params.idadmin;

    let objAdmin = await myModel.userModel.findById(idadmin);

    if (req.method == 'POST') {
        let objAdmin = new myModel.userModel();

        if (typeof (req.body.user_name != 'undefined')) {
            objAdmin.username = req.body.user_name;
        }
        if (typeof (req.body.sdt != 'undefined')) {
            objAdmin.phone = req.body.sdt;
        }
        if (typeof (req.body.email != 'undefined')) {
            objAdmin.email = req.body.email;
        }
        if (typeof (req.body.gender != 'undefined')) {
            objAdmin.gender = req.body.gender;
        }
        if (typeof (req.body.fullname != 'undefined')) {
            objAdmin.fullname = req.body.fullname;
        }
        objAdmin._id = idadmin;

        try {
            await myModel.userModel.findByIdAndUpdate({ _id: idadmin }, objAdmin);
            msg = 'Sửa thành công!'
            return res.redirect('/users/admin');

        } catch (err) {
            msg = 'Lỗi: ' + err;
            console.log(err);
        }
    }
    res.render('users/editAdmin', { msg: msg, objAdmin: objAdmin });
}

exports.dmkAdmin = async (req, res, next) => {
    let msg = "";
    let idadmin = req.params.idadmin;
    let objAdmin = await myModel.userModel.findById(idadmin);

    if (req.method == 'POST') {
        if (typeof req.body.oldPass !== 'undefined' && typeof (req.body.newPass != 'undefined') && typeof (req.body.reNewPass != 'undefined')) {
            if (req.body.oldPass == objAdmin.passwork) {
                if (req.body.newPass == req.body.reNewPass) {
                    let objAdminNew = new myModel.userModel();
                    objAdminNew.passwork = req.body.newPass;
                    objAdminNew._id = idadmin;

                    try {
                        await myModel.userModel.findByIdAndUpdate({ _id: idadmin }, objAdminNew);
                        msg = 'Đổi mật khẩu thành công!'
                        return res.redirect('/users/admin');

                    } catch (err) {
                        msg = 'Lỗi: ' + err;
                        console.log(err);
                    }

                } else {
                    msg = 'Xác nhận lại mật khẩu mới!'
                }
            } else {
                msg = 'Sai mật khẩu cũ!'
            }
        }

    }
    res.render('users/dmkAdmin', { msg: msg, objAdmin: objAdmin });
}


