exports.yeu_cau_login = (req, res, next) => {
    // nếu đã đăng nhập rồi, thì cho phép thực hiện công việc tiếp
    if (req.session.userLogin) {
        next();
    } else {
        // chưa login 
        res.redirect('/users/login');
    }

}

exports.ktra_login = (req, res, next) => {
    // nếu đã đăng nhập rồi, thì cho phép thực hiện công việc tiếp
    if (req.session.userLogin) {
        res.redirect('/users/login');
    } else {
        next();
    }

}
