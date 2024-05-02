var myModel = require("../../models/bill.model");
var user = require("../../models/bookStore.model");
var books = require("../../models/book");

exports.getThongKe = async (req, res, next) => {
    var listBill = await myModel.BillModel.find();

    let tongDT = 0; // Tổng tiền của hóa đơn ở trạng thái 2, 3, 4

    listBill.forEach(bill => {
        if (bill.status === 2 || bill.status === 3 || bill.status === 4 || bill.status === 1) {
            tongDT += bill.real_price || 0;
        } 
    });
    
    res.render("bills/thongKe", { listBill: listBill, tongDT: tongDT });
};

exports.getBillStatistics = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        // Lấy tất cả hóa đơn trong khoảng thời gian
        const bills = await myModel.BillModel.find({
            create_at: { $gte: startDate, $lte: endDate }
        });

        // Đếm số lượng hóa đơn theo từng trạng thái
        const statusCounts = [0, 0, 0, 0, 0];
        bills.forEach(bill => {
            statusCounts[bill.status]++;
        });

        // Tính tổng tiền hóa đơn theo từng trạng thái
        let revenue = 0; // Tổng tiền của hóa đơn ở trạng thái 2, 3, 4
        let pendingValue = 0; // Tổng giá trị của hóa đơn ở trạng thái 1

        bills.forEach(bill => {
            if (bill.status === 2 || bill.status === 3 || bill.status === 4) {
                revenue += bill.real_price || 0;
            } else if (bill.status === 1) {
                pendingValue += bill.real_price || 0;
            }
        });

        // Tính toán số lượng sách bán của mỗi cuốn sách từ hóa đơn
        const bookSalesMap = new Map();
        for (const bill of bills) {
            for (const detail of bill.detail) {
                const billItem = await myModel.BillItemModel.findById(detail);
                if (billItem) {
                    const bookId = billItem.id_book;
                    const quantity = billItem.quantity;
                    if (bookSalesMap.has(bookId)) {
                        bookSalesMap.set(bookId, bookSalesMap.get(bookId) + quantity);
                    } else {
                        bookSalesMap.set(bookId, quantity);
                    }
                }
            }
        }

        // Sắp xếp và lấy top 5 sách bán chạy nhất
        const sortedBooks = Array.from(bookSalesMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const topBooks = await Promise.all(sortedBooks.map(async ([bookId, soldQuantity]) => {
            const book = await books.BookModel.findById(bookId);
            return {
                name: book.name,
                image: book.image,
                soldQuantity
            };
        }));

        console.log("statusCounts: " + statusCounts);
        console.log("topBooks: " + topBooks);
        const topList = JSON.stringify(topBooks);

        res.json({
            revenue,
            pendingValue,
            statusCounts,
            topBooks
        });

        res.render("bills/thongKe", { topBooks: topBooks, statusCounts: statusCounts, topList: topList });
    } catch (err) {
        console.error(err);
        console.log("loi: "+err);
        res.status(500).json({ message: 'Lỗi khi thực hiện thống kê.' });
    }
};


exports.getThongKeUser = async (req, res, next) => {
    let dk_loc = { role: "USER" };
    var listUser = await user.userModel.find(dk_loc);

    res.render("users/tkUser", {  listUser: listUser });
};












