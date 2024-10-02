const backendDomin = "http://localhost:8080"            // Định nghĩa URL của backend, thường là địa chỉ của server backend

const SummaryApi = {                                    // Định nghĩa các API endpoints cho ứng dụng
    signUP : {                                              // Endpoint để đăng ký người dùng mới
        url : `${backendDomin}/api/signup`,                         // Đường dẫn API cho đăng ký
        method : "post"                                                     // Phương thức HTTP sử dụng
    },
    signIn : {                                   // Endpoint để đăng nhập người dùng
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {                                     // Endpoint để lấy thông tin người dùng hiện tại
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user : {                                 // Endpoint để đăng xuất người dùng
        url: `${backendDomin}/api/userLogout`,
        method : "get"

    },
    allUser : {                                                  // Endpoint để lấy danh sách tất cả người dùng
        url : `${backendDomin}/api/all-user`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : { // En
        url : `${backendDomin}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : "get"
    },
}
export default SummaryApi                                   // Xuất đối tượng SummaryApi để có thể sử dụng ở các tệp khác