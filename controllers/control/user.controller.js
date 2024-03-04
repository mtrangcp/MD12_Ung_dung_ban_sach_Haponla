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

exports.getListUserThapcao = async (req, res, next) => {

    let dk_loc = null;
    if (typeof (req.query.username) != 'undefined') {
        dk_loc = { username: req.query.username };
    }
    console.log(dk_loc);

    var list = await myModel.userModel.find(dk_loc).sort({ username: 1 });
    var soluong = list.length;

    res.render('users/listUser', { listUsers: list, soluong: soluong });
}

exports.getListUserCaoThap = async (req, res, next) => {

    let dk_loc = null;
    if (typeof (req.query.username) != 'undefined') {
        dk_loc = { username: req.query.username };
    }
    console.log(dk_loc);

    var list = await myModel.userModel.find(dk_loc).sort({ username: -1 });
    var soluong = list.length;

    res.render('users/listUser', { listUsers: list, soluong: soluong });
}

exports.addUser = async (req, res, next) => {

    let msg = "";

    if (req.method == 'POST') {
        let objUser = new myModel.userModel();
        if (req.body.user_name == null) {
            msg = 'Vui lòng nhập username của bạn!';
            return res.render('users/addUser', { msg: msg });
        }
        if (req.body.user_name.length > 10) {
            msg = 'Vui lòng nhập username không quá 10 kí tự!';
            return res.render('users/addUser', { msg: msg });
        }

        var regex2 = /^[a-zA-Z]+$/;
        if (!regex2.test(req.body.user_name)) {
            msg = 'Vui lòng nhập username chỉ chứa kí tự chữ cái!';
            return res.render('users/addUser', { msg: msg });
        }


        if (req.body.Pass != req.body.Pass2) {
            msg = 'Vui lòng Confirm đúng Password!';
            return res.render('users/addUser', { msg: msg });
        }

        if (typeof (req.body.user_name != 'undefined')) {
            objUser.username = req.body.user_name;
        }
        if (typeof (req.body.Pass != 'undefined')) {
            objUser.password = req.body.Pass;
        }
        if (typeof (req.body.Email != 'undefined')) {
            objUser.email = req.body.Email;
        }
        if (typeof (req.body.vai_tro != 'undefined')) {
            objUser.vaitro = req.body.vai_tro;
        }

        try {
            let newUser = await objUser.save();
            console.log(newUser);
            msg = 'Tạo tài khoản mới thành công!'

        } catch (err) {
            msg = 'Lỗi: ' + err;
            console.log(err);
        }

    }

    res.render('users/addUser', { msg: msg });
}

exports.editUser = async (req, res, next) => {

    let msg = "";
    let iduser = req.params.iduser;

    let objUser = await myModel.userModel.findById(iduser);

    if (req.method == 'POST') {
        let objUser = new myModel.userModel();

        if (typeof (req.body.user_name != 'undefined')) {
            objUser.username = req.body.user_name;
        }
        if (typeof (req.body.Password != 'undefined')) {
            objUser.password = req.body.Password;
        }
        if (typeof (req.body.Email != 'undefined')) {
            objUser.email = req.body.Email;
        }
        if (typeof (req.body.vai_tro != 'undefined')) {
            objUser.vaitro = req.body.vai_tro;
        }
        objUser._id = iduser;

        try {
            await myModel.userModel.findByIdAndUpdate({ _id: iduser }, objUser);
            msg = 'Sửa thành công!'

        } catch (err) {
            msg = 'Lỗi: ' + err;
            console.log(err);
        }

    }


    res.render('users/editUser', { msg: msg, objUser: objUser });
}

exports.delUser = async (req, res, next) => {

    let msg = "";
    let iduser = req.params.iduser;
    let objUser = myModel.userModel.findById(iduser);

    if (objUser == null) {
        msg = " User không tồn tại!"
    }

    if (req.method == "POST") {
        try {
            await myModel.userModel.findByIdAndDelete(iduser);
            msg = 'Xóa thành công!'
            res.redirect('/users');

        } catch (error) {
            msg = "lỗi: " + error;
            console.log(error);
        }
    }


    res.render('users/del', { msg: msg, objUser: objUser });
}

exports.chiTietUser = async (req, res, next) => {

    let iduser = req.params.iduser;

    let objUser = await myModel.userModel.findById(iduser);


    res.render('users/chitietUser', { objUser: objUser });
}

exports.login = async (req, res, next) => {

    let msg = "";
    if (req.method == 'POST') {
        try {
            let objUser = await myModel.userModel.findOne({ username: req.body.username });
            console.log(objUser);

            if (objUser != null) {
                if (objUser.password == req.body.Pass) {
                    req.session.userLogin = objUser;

                    return res.redirect('/users');
                } else {
                    msg = 'Sai password';
                }

            } else {
                msg = 'Không tồn tại user ' + req.body.username;

            }

        } catch {
            msg = error.message;
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

        } catch {
            msg = error.message;
        }
    }

    res.render('users/login', { msg: msg })
}


